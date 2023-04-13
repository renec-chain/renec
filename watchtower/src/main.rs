//! A command-line executable for monitoring the health of a cluster
#![allow(clippy::integer_arithmetic)]

use {
    clap::{crate_description, crate_name, value_t, value_t_or_exit, App, Arg},
    log::*,
    solana_clap_utils::{
        input_parsers::pubkeys_of,
        input_validators::{is_parsable, is_pubkey_or_keypair, is_url},
    },
    solana_cli_output::display::format_labeled_address,
    solana_client::{client_error, rpc_client::RpcClient, rpc_response::RpcVoteAccountStatus},
    solana_metrics::{datapoint_error, datapoint_info},
    solana_notifier::Notifier,
    solana_sdk::{
        hash::Hash,
        native_token::{sol_to_lamports, Sol},
        pubkey::Pubkey,
    },
    std::{
        collections::HashMap,
        error,
        thread::sleep,
        time::{Duration, Instant},
    },
};

struct Config {
    address_labels: HashMap<String, String>,
    ignore_http_bad_gateway: bool,
    interval: Duration,
    json_rpc_url: String,
    minimum_validator_identity_balance: u64,
    monitor_active_stake: bool,
    unhealthy_threshold: usize,
    validator_identity_pubkeys: Vec<Pubkey>,
}

fn get_config() -> Config {
    let matches = App::new(crate_name!())
        .about(crate_description!())
        .version(solana_version::version!())
        .after_help("ADDITIONAL HELP:
        To receive a Slack, Discord and/or Telegram notification on sanity failure,
        define environment variables before running `solana-watchtower`:

        export SLACK_WEBHOOK=...
        export DISCORD_WEBHOOK=...

        Telegram requires the following two variables:

        export TELEGRAM_BOT_TOKEN=...
        export TELEGRAM_CHAT_ID=...

        To receive a Twilio SMS notification on failure, having a Twilio account,
        and a sending number owned by that account,
        define environment variable before running `solana-watchtower`:

        export TWILIO_CONFIG='ACCOUNT=<account>,TOKEN=<securityToken>,TO=<receivingNumber>,FROM=<sendingNumber>'")
        .arg({
            let arg = Arg::with_name("config_file")
                .short("C")
                .long("config")
                .value_name("PATH")
                .takes_value(true)
                .global(true)
                .help("Configuration file to use");
            if let Some(ref config_file) = *renec_cli_config::CONFIG_FILE {
                arg.default_value(config_file)
            } else {
                arg
            }
        })
        .arg(
            Arg::with_name("json_rpc_url")
                .long("url")
                .value_name("URL")
                .takes_value(true)
                .validator(is_url)
                .help("JSON RPC URL for the cluster"),
        )
        .arg(
            Arg::with_name("interval")
                .long("interval")
                .value_name("SECONDS")
                .takes_value(true)
                .default_value("60")
                .help("Wait interval seconds between checking the cluster"),
        )
        .arg(
            Arg::with_name("unhealthy_threshold")
                .long("unhealthy-threshold")
                .value_name("COUNT")
                .takes_value(true)
                .default_value("1")
                .help("How many consecutive failures must occur to trigger a notification")
        )
        .arg(
            Arg::with_name("validator_identities")
                .long("validator-identity")
                .value_name("VALIDATOR IDENTITY PUBKEY")
                .takes_value(true)
                .validator(is_pubkey_or_keypair)
                .multiple(true)
                .help("Validator identities to monitor for delinquency")
        )
        .arg(
            Arg::with_name("minimum_validator_identity_balance")
                .long("minimum-validator-identity-balance")
                .value_name("SOL")
                .takes_value(true)
                .default_value("10")
                .validator(is_parsable::<f64>)
                .help("Alert when the validator identity balance is less than this amount of SOL")
        )
        .arg(
            // Deprecated parameter, now always enabled
            Arg::with_name("no_duplicate_notifications")
                .long("no-duplicate-notifications")
                .hidden(true)
        )
        .arg(
            Arg::with_name("monitor_active_stake")
                .long("monitor-active-stake")
                .takes_value(false)
                .help("Alert when the current stake for the cluster drops below 80%"),
        )
        .arg(
            Arg::with_name("ignore_http_bad_gateway")
                .long("ignore-http-bad-gateway")
                .takes_value(false)
                .help("Ignore HTTP 502 Bad Gateway errors from the JSON RPC URL. \
                    This flag can help reduce false positives, at the expense of \
                    no alerting should a Bad Gateway error be a side effect of \
                    the real problem")
        )
        .get_matches();

    let config = if let Some(config_file) = matches.value_of("config_file") {
        renec_cli_config::Config::load(config_file).unwrap_or_default()
    } else {
        renec_cli_config::Config::default()
    };

    let interval = Duration::from_secs(value_t_or_exit!(matches, "interval", u64));
    let unhealthy_threshold = value_t_or_exit!(matches, "unhealthy_threshold", usize);
    let minimum_validator_identity_balance = sol_to_lamports(value_t_or_exit!(
        matches,
        "minimum_validator_identity_balance",
        f64
    ));
    let json_rpc_url =
        value_t!(matches, "json_rpc_url", String).unwrap_or_else(|_| config.json_rpc_url.clone());
    let validator_identity_pubkeys: Vec<_> = pubkeys_of(&matches, "validator_identities")
        .unwrap_or_default()
        .into_iter()
        .collect();

    let monitor_active_stake = matches.is_present("monitor_active_stake");
    let ignore_http_bad_gateway = matches.is_present("ignore_http_bad_gateway");

    let config = Config {
        address_labels: config.address_labels,
        ignore_http_bad_gateway,
        interval,
        json_rpc_url,
        minimum_validator_identity_balance,
        monitor_active_stake,
        unhealthy_threshold,
        validator_identity_pubkeys,
    };

    info!("RPC URL: {}", config.json_rpc_url);
    info!(
        "Monitored validators: {:?}",
        config.validator_identity_pubkeys
    );
    config
}

fn get_cluster_info(
    config: &Config,
    rpc_client: &RpcClient,
) -> client_error::Result<(u64, Hash, RpcVoteAccountStatus, HashMap<Pubkey, u64>)> {
    let transaction_count = rpc_client.get_transaction_count()?;
    let recent_blockhash = rpc_client.get_latest_blockhash()?;
    let vote_accounts = rpc_client.get_vote_accounts()?;

    let mut validator_balances = HashMap::new();
    for validator_identity in &config.validator_identity_pubkeys {
        validator_balances.insert(
            *validator_identity,
            rpc_client.get_balance(validator_identity)?,
        );
    }

    Ok((
        transaction_count,
        recent_blockhash,
        vote_accounts,
        validator_balances,
    ))
}

fn main() -> Result<(), Box<dyn error::Error>> {
    solana_logger::setup_with_default("solana=info");
    solana_metrics::set_panic_hook("watchtower", /*version:*/ None);

    let config = get_config();

    let rpc_client = RpcClient::new(config.json_rpc_url.clone());
    let notifier = Notifier::default();
    let mut last_transaction_count = 0;
    let mut last_recent_blockhash = Hash::default();
    let mut last_notification_msg = "".into();
    let mut num_consecutive_failures = 0;
    let mut last_success = Instant::now();

    loop {
        let failure = match get_cluster_info(&config, &rpc_client) {
            Ok((transaction_count, recent_blockhash, vote_accounts, validator_balances)) => {
                info!("Current transaction count: {}", transaction_count);
                info!("Recent blockhash: {}", recent_blockhash);
                info!("Current validator count: {}", vote_accounts.current.len());
                info!(
                    "Delinquent validator count: {}",
                    vote_accounts.delinquent.len()
                );

                let mut failures = vec![];

                let total_current_stake = vote_accounts
                    .current
                    .iter()
                    .map(|vote_account| vote_account.activated_stake)
                    .sum();
                let total_delinquent_stake = vote_accounts
                    .delinquent
                    .iter()
                    .map(|vote_account| vote_account.activated_stake)
                    .sum();

                let total_stake = total_current_stake + total_delinquent_stake;
                let current_stake_percent = total_current_stake as f64 * 100. / total_stake as f64;
                info!(
                    "Current stake: {:.2}% | Total stake: {}, current stake: {}, delinquent: {}",
                    current_stake_percent,
                    Sol(total_stake),
                    Sol(total_current_stake),
                    Sol(total_delinquent_stake)
                );

                if transaction_count > last_transaction_count {
                    last_transaction_count = transaction_count;
                } else {
                    failures.push((
                        "transaction-count",
                        format!(
                            "Transaction count is not advancing: {} <= {}",
                            transaction_count, last_transaction_count
                        ),
                    ));
                }

                if recent_blockhash != last_recent_blockhash {
                    last_recent_blockhash = recent_blockhash;
                } else {
                    failures.push((
                        "recent-blockhash",
                        format!("Unable to get new blockhash: {}", recent_blockhash),
                    ));
                }

                if config.monitor_active_stake && current_stake_percent < 80. {
                    failures.push((
                        "current-stake",
                        format!("Current stake is {:.2}%", current_stake_percent),
                    ));
                }

                let mut validator_errors = vec![];
                for validator_identity in config.validator_identity_pubkeys.iter() {
                    let formatted_validator_identity = format_labeled_address(
                        &validator_identity.to_string(),
                        &config.address_labels,
                    );
                    if vote_accounts
                        .delinquent
                        .iter()
                        .any(|vai| vai.node_pubkey == *validator_identity.to_string())
                    {
                        validator_errors
                            .push(format!("{} delinquent", formatted_validator_identity));
                    } else if !vote_accounts
                        .current
                        .iter()
                        .any(|vai| vai.node_pubkey == *validator_identity.to_string())
                    {
                        validator_errors.push(format!("{} missing", formatted_validator_identity));
                    }

                    if let Some(balance) = validator_balances.get(validator_identity) {
                        if *balance < config.minimum_validator_identity_balance {
                            failures.push((
                                "balance",
                                format!("{} has {}", formatted_validator_identity, Sol(*balance)),
                            ));
                        }
                    }
                }

                if !validator_errors.is_empty() {
                    failures.push(("delinquent", validator_errors.join(",")));
                }

                for failure in failures.iter() {
                    error!("{} sanity failure: {}", failure.0, failure.1);
                }
                failures.into_iter().next() // Only report the first failure if any
            }
            Err(err) => {
                let mut failure = Some(("rpc-error", err.to_string()));

                if let client_error::ClientErrorKind::Reqwest(reqwest_err) = err.kind() {
                    if let Some(client_error::reqwest::StatusCode::BAD_GATEWAY) =
                        reqwest_err.status()
                    {
                        if config.ignore_http_bad_gateway {
                            warn!("Error suppressed: {}", err);
                            failure = None;
                        }
                    }
                }
                failure
            }
        };

        if let Some((failure_test_name, failure_error_message)) = &failure {
            let notification_msg = format!(
                "solana-watchtower: Error: {}: {}",
                failure_test_name, failure_error_message
            );
            num_consecutive_failures += 1;
            if num_consecutive_failures > config.unhealthy_threshold {
                datapoint_info!("watchtower-sanity", ("ok", false, bool));
                if last_notification_msg != notification_msg {
                    notifier.send(&notification_msg);
                }
                datapoint_error!(
                    "watchtower-sanity-failure",
                    ("test", failure_test_name, String),
                    ("err", failure_error_message, String)
                );
                last_notification_msg = notification_msg;
            } else {
                info!(
                    "Failure {} of {}: {}",
                    num_consecutive_failures, config.unhealthy_threshold, notification_msg
                );
            }
        } else {
            datapoint_info!("watchtower-sanity", ("ok", true, bool));
            if !last_notification_msg.is_empty() {
                let alarm_duration = Instant::now().duration_since(last_success);
                let alarm_duration = alarm_duration - config.interval; // Subtract the period before the first error
                let alarm_duration = Duration::from_secs(alarm_duration.as_secs()); // Drop milliseconds in message

                let all_clear_msg = format!(
                    "All clear after {}",
                    humantime::format_duration(alarm_duration)
                );
                info!("{}", all_clear_msg);
                notifier.send(&format!("solana-watchtower: {}", all_clear_msg));
            }
            last_notification_msg = "".into();
            last_success = Instant::now();
            num_consecutive_failures = 0;
        }
        sleep(config.interval);
    }
}
