use {
    renec_cli_config::{Config, CONFIG_FILE},
    solana_client::rpc_client::RpcClient,
    solana_tokens::{arg_parser::parse_args, args::Command, commands, spl_token},
    std::{
        env,
        error::Error,
        path::Path,
        process,
        sync::{
            atomic::{AtomicBool, Ordering},
            Arc,
        },
    },
};

fn main() -> Result<(), Box<dyn Error>> {
    let command_args = parse_args(env::args_os())?;
    let config = if Path::new(&command_args.config_file).exists() {
        Config::load(&command_args.config_file)?
    } else {
        let default_config_file = CONFIG_FILE.as_ref().unwrap();
        if command_args.config_file != *default_config_file {
            eprintln!("Error: config file not found");
            process::exit(1);
        }
        Config::default()
    };
    let json_rpc_url = command_args.url.unwrap_or(config.json_rpc_url);
    let client = RpcClient::new(json_rpc_url);

    let exit = Arc::new(AtomicBool::default());
    let _exit = exit.clone();
    // Initialize CTRL-C handler to ensure db changes are written before exit.
    ctrlc::set_handler(move || {
        _exit.store(true, Ordering::SeqCst);
    })
    .expect("Error setting Ctrl-C handler");

    match command_args.command {
        Command::DistributeTokens(mut args) => {
            spl_token::update_token_args(&client, &mut args.spl_token_args)?;
            commands::process_allocations(&client, &args, exit)?;
        }
        Command::Balances(mut args) => {
            spl_token::update_decimals(&client, &mut args.spl_token_args)?;
            commands::process_balances(&client, &args)?;
        }
        Command::TransactionLog(args) => {
            commands::process_transaction_log(&args)?;
        }
    }
    Ok(())
}
