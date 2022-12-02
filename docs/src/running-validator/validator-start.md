---
title: Starting Validator
---

## Configure Renec CLI

The renec cli includes `get` and `set` configuration commands to automatically
set the `--url` argument for cli commands. For example:

```bash
renec config set --url https://api-mainnet-beta.renec.foundation:8899
```

## Confirm The Cluster Is Reachable

Before attaching a validator node, sanity check that the cluster is accessible
to your machine by fetching the transaction count:

```bash
renec transaction-count
```

<!-- View the [metrics dashboard](https://metrics.renec.com:3000/d/monitor/cluster-telemetry) for more
detail on cluster activity. -->

## Generate identity

Create an identity keypair for your validator by running:

```bash
renec-keygen new -o ~/validator-keypair.json
```

The identity public key can now be viewed by running:

```bash
renec-keygen pubkey ~/validator-keypair.json
```

> Note: The "validator-keypair.json” file is also your \(ed25519\) private key.

See [Paper Wallet Usage](../wallet-guide/paper-wallet.md) for more info.

Your validator identity keypair uniquely identifies your validator within the
network. **It is crucial to back-up this information.**

If you don’t back up this information, you WILL NOT BE ABLE TO RECOVER YOUR
VALIDATOR if you lose access to it. If this happens, YOU WILL LOSE YOUR
ALLOCATION OF RENEC TOO.

To back-up your validator identify keypair, **back-up your
"validator-keypair.json” file or your seed phrase to a secure location.**

## More Renec CLI Configuration

Now that you have a keypair, set the renec configuration to use your validator
keypair for all following commands:

```bash
renec config set --keypair ~/validator-keypair.json
```

You should see the following output:

```text
Config File: /home/renec/.config/renec/cli/config.yml
RPC URL: http://api-mainnet-beta.renec.foundation:8899
WebSocket URL: ws://api-mainnet-beta.renec.foundation:8899/ (computed)
Keypair Path: /home/renec/validator-keypair.json
Commitment: confirmed
```

<!-- ## Airdrop & Check Validator Balance

Airdrop yourself some RENEC to get started:

```bash
renec airdrop 1
```

Note that airdrops are only available on Testnet. Limited
to 1 RENEC per request.

To view your current balance:

```text
renec balance
```

Or to see in finer detail:

```text
renec balance --lamports
```

Read more about the [difference between RENEC and lamports here](../introduction.md#what-are-sols). -->

## Create Authorized Withdrawer Account

If you haven't already done so, create an authorized-withdrawer keypair to be used
as the ultimate authority over your validator.  This keypair will have the
authority to withdraw from your vote account, and will have the additional
authority to change all other aspects of your vote account.  Needless to say,
this is a very important keypair as anyone who possesses it can make any
changes to your vote account, including taking ownership of it permanently.
So it is very important to keep your authorized-withdrawer keypair in a safe
location.  It does not need to be stored on your validator, and should not be
stored anywhere from where it could be accessed by unauthorized parties.  To
create your authorized-withdrawer keypair:

```bash
renec-keygen new -o ~/authorized-withdrawer-keypair.json
```

## Create Vote Account

If you haven’t already done so, create a vote-account keypair and create the
vote account on the network. If you have completed this step, you should see the
“vote-account-keypair.json” in your Renec runtime directory:

```bash
renec-keygen new -o ~/vote-account-keypair.json
```

The following command can be used to create your vote account on the blockchain
with all the default options:

```bash
renec create-vote-account ~/vote-account-keypair.json ~/validator-keypair.json ~/authorized-withdrawer-keypair.json
```

Remember to move your authorized withdrawer keypair into a very secure location after running the above command.

Read more about [creating and managing a vote account](vote-accounts.md).

## Connect Your Validator

Connect to the cluster by running (this configuration is for testnet):

```bash
~/.local/share/renec/install/active_release/bin/renec-validator \
  --identity ~/validator-identity.json \
  --vote-account ~/validator-vote-account.json \
  --enable-rpc-transaction-history \
  --enable-cpi-and-log-storage \
  --require-tower \
  --dynamic-port-range 8000-8020 \
  --entrypoint 52.21.244.146:8001 \
  --expected-genesis-hash 7PNFRHLxT9FcAxSUcg3P8BraJnnUBnjuy8LwRbRJvVkX \
  --full-rpc-api \
  --log -
```

To force validator logging to the console add a `--log -` argument, otherwise
the validator will automatically log to a file.

The ledger will be placed in the `ledger/` directory by default, use the
`--ledger` argument to specify a different location.

Confirm your validator is connected to the network by opening a new terminal and
running:

```bash
renec gossip
```

If your validator is connected, its public key and IP address will appear in the list.

### Controlling local network port allocation

By default the validator will dynamically select available network ports in the
8000-10000 range, and may be overridden with `--dynamic-port-range`. For
example, `renec-validator --dynamic-port-range 11000-11020 ...` will restrict
the validator to ports 11000-11020.

### Limiting ledger size to conserve disk space

The `--limit-ledger-size` parameter allows you to specify how many ledger
[shreds](../terminology.md#shred) your node retains on disk. If you do not
include this parameter, the validator will keep the entire ledger until it runs
out of disk space.

The default value attempts to keep the ledger disk usage under 500GB. More or
less disk usage may be requested by adding an argument to `--limit-ledger-size`
if desired. Check `renec-validator --help` for the default limit value used by
`--limit-ledger-size`. More information about
selecting a custom limit value is [available
here](https://github.com/renec-labs/renec/blob/583cec922b6107e0f85c7e14cb5e642bc7dfb340/core/src/ledger_cleanup_service.rs#L15-L26).

### Systemd Unit

Running the validator as a systemd unit is one easy way to manage running in the
background.

Assuming you have a user called `renec` on your machine (remember replace all `/home/renec` to `/home/{your_os_user}`), create the file `/etc/systemd/system/renec.service` with
the following:

```
[Unit]
Description=RENEC Daemon
After=network.target

[Service]
User=renec
Group=renec
Environment=SOLANA_METRICS_CONFIG=host=http://metrics.renec.foundation:8086,db=mainnet-beta,u=write,p=39018931781680558
Environment=RUST_LOG=info
ExecStart=/home/renec/.local/share/renec/install/active_release/bin/renec-validator   --identity /home/renec/validator-identity.json   --vote-account /home/renec/validator-vote-account.json --enable-rpc-transaction-history   --enable-cpi-and-log-storage   --require-tower   --dynamic-port-range 8000-8020   --entrypoint 52.21.244.146:8001   --expected-genesis-hash 7PNFRHLxT9FcAxSUcg3P8BraJnnUBnjuy8LwRbRJvVkX --full-rpc-api
StandardOutput=append:/home/renec/renec-validator.log
StandardError=append:/home/renec/renec-validator-error.log
Restart=on-failure

# Specifies which signal to use when killing a service. Defaults to SIGTERM.
KillMode=process
KillSignal=SIGINT
TimeoutStopSec=300
RestartSec=10s

[Install]
WantedBy=default.target
```

Start the service with:

```bash
$ sudo systemctl enable renec.service
$ sudo systemctl start renec.service
```

# Advance configurations

## Enabling CUDA

If your machine has a GPU with CUDA installed \(Linux-only currently\), include
the `--cuda` argument to `renec-validator`.

When your validator is started look for the following log message to indicate
that CUDA is enabled: `"[<timestamp> renec::validator] CUDA is enabled"`

## System Tuning

### Linux

#### Automatic

The renec repo includes a daemon to adjust system settings to optimize performance
(namely by increasing the OS UDP buffer and file mapping limits).

The daemon (`renec-sys-tuner`) is included in the renec binary release. Restart
it, _before_ restarting your validator, after each software upgrade to ensure that
the latest recommended settings are applied.

To run it:

```bash
sudo $(command -v renec-sys-tuner) --user $(whoami) > sys-tuner.log 2>&1 &
```

## Known validators

If you know and respect other validator operators, you can specify this on the command line with the `--known-validator <PUBKEY>`
argument to `renec-validator`. You can specify multiple ones by repeating the argument `--known-validator <PUBKEY1> --known-validator <PUBKEY2>`.
This has two effects, one is when the validator is booting with `--only-known-rpc`, it will only ask that set of
known nodes for downloading genesis and snapshot data. Another is that in combination with the `--halt-on-known-validators-accounts-hash-mismatch` option,
it will monitor the merkle root hash of the entire accounts state of other known nodes on gossip and if the hashes produce any mismatch,
the validator will halt the node to prevent the validator from voting or processing potentially incorrect state values. At the moment, the slot that
the validator publishes the hash on is tied to the snapshot interval. For the feature to be effective, all validators in the known
set should be set to the same snapshot interval value or multiples of the same.

It is highly recommended you use these options to prevent malicious snapshot state download or
account state divergence.
### Logging

#### Log output tuning

The messages that a validator emits to the log can be controlled by the `RUST_LOG`
environment variable. Details can by found in the [documentation](https://docs.rs/env_logger/latest/env_logger/#enabling-logging)
for the `env_logger` Rust crate.

Note that if logging output is reduced, this may make it difficult to debug issues
encountered later. Should support be sought from the team, any changes will need
to be reverted and the issue reproduced before help can be provided.

#### Log rotation

The validator log file, as specified by `--log /home/renec/renec-validator.log`, can get
very large over time and it's recommended that log rotation be configured.

The validator will re-open its when it receives the `USR1` signal, which is the
basic primitive that enables log rotation.

If the validator is being started by a wrapper shell script, it is important to
launch the process with `exec` (`exec renec-validator ...`) when using logrotate.
This will prevent the `USR1` signal from being sent to the script's process
instead of the validator's, which will kill them both.

#### Using logrotate

An example setup for the `logrotate`, which assumes that the validator is
running as a systemd service called `renec.service` and writes a log file at
/home/renec/renec-validator.log:

```bash
# Setup log rotation

cat > logrotate.renec <<EOF
/home/renec/renec-validator.log {
  rotate 7
  daily
  missingok
  postrotate
    systemctl kill -s USR1 renec.service
  endscript
}
EOF
sudo cp logrotate.renec /etc/logrotate.d/renec
systemctl restart logrotate.service
```

As mentioned earlier, be sure that if you use logrotate, any script you create
which starts the renec validator process uses "exec" to do so (example: "exec
renec-validator ..."); otherwise, when logrotate sends its signal to the
validator, the enclosing script will die and take the validator process with
it.

### Disable port checks to speed up restarts

Once your validator is operating normally, you can reduce the time it takes to
restart your validator by adding the `--no-port-check` flag to your
`renec-validator` command-line.

### Using a ramdisk with spill-over into swap for the accounts database to reduce SSD wear

If your machine has plenty of RAM, a tmpfs ramdisk
([tmpfs](https://man7.org/linux/man-pages/man5/tmpfs.5.html)) may be used to hold
the accounts database

When using tmpfs it's essential to also configure swap on your machine as well to
avoid running out of tmpfs space periodically.

A 300GB tmpfs partition is recommended, with an accompanying 250GB swap
partition.

Example configuration:

1. `sudo mkdir /mnt/renec-accounts`
2. Add a 300GB tmpfs parition by adding a new line containing `tmpfs /mnt/renec-accounts tmpfs rw,size=300G,user=renec 0 0` to `/etc/fstab`
   (assuming your validator is running under the user "renec"). **CAREFUL: If you
   incorrectly edit /etc/fstab your machine may no longer boot**
3. Create at least 250GB of swap space

- Choose a device to use in place of `SWAPDEV` for the remainder of these instructions.
  Ideally select a free disk partition of 250GB or greater on a fast disk. If one is not
  available, create a swap file with `sudo dd if=/dev/zero of=/swapfile bs=1MiB count=250KiB`,
  set its permissions with `sudo chmod 0600 /swapfile` and use `/swapfile` as `SWAPDEV` for
  the remainder of these instructions
- Format the device for usage as swap with `sudo mkswap SWAPDEV`

4. Add the swap file to `/etc/fstab` with a new line containing `SWAPDEV swap swap defaults 0 0`
5. Enable swap with `sudo swapon -a` and mount the tmpfs with `sudo mount /mnt/renec-accounts/`
6. Confirm swap is active with `free -g` and the tmpfs is mounted with `mount`

Now add the `--accounts /mnt/renec-accounts` argument to your `renec-validator`
command-line arguments and restart the validator.

### Account indexing

As the number of populated accounts on the cluster grows, account-data RPC
requests that scan the entire account set -- like
[`getProgramAccounts`](developing/clients/jsonrpc-api.md#getprogramaccounts) and
[SPL-token-specific requests](developing/clients/jsonrpc-api.md#gettokenaccountsbydelegate) --
may perform poorly. If your validator needs to support any of these requests,
you can use the `--account-index` parameter to activate one or more in-memory
account indexes that significantly improve RPC performance by indexing accounts
by the key field. Currently supports the following parameter values:

- `program-id`: each account indexed by its owning program; used by [`getProgramAccounts`](developing/clients/jsonrpc-api.md#getprogramaccounts)
- `spl-token-mint`: each SPL token account indexed by its token Mint; used by [getTokenAccountsByDelegate](developing/clients/jsonrpc-api.md#gettokenaccountsbydelegate), and [getTokenLargestAccounts](developing/clients/jsonrpc-api.md#gettokenlargestaccounts)
- `spl-token-owner`: each SPL token account indexed by the token-owner address; used by [getTokenAccountsByOwner](developing/clients/jsonrpc-api.md#gettokenaccountsbyowner), and [`getProgramAccounts`](developing/clients/jsonrpc-api.md#getprogramaccounts) requests that include an spl-token-owner filter.
