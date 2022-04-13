---
title: CLI Usage Reference
---

The [renec-cli crate](https://crates.io/crates/renec-cli) provides a command-line interface tool for Renec

## Examples

### Get Pubkey

```bash
// Command
$ renec-keygen pubkey

// Return
<PUBKEY>
```

### Airdrop RENEC/Lamports

```bash
// Command
$ renec airdrop 1

// Return
"1 RENEC"
```

### Get Balance

```bash
// Command
$ renec balance

// Return
"3.00050001 RENEC"
```

### Confirm Transaction

```bash
// Command
$ renec confirm <TX_SIGNATURE>

// Return
"Confirmed" / "Not found" / "Transaction failed with error <ERR>"
```

### Deploy program

```bash
// Command
$ renec program deploy <PATH>

// Return
<PROGRAM_ID>
```

## Usage
### renec-cli
```text
renec-cli 1.8.14 (src:devbuild; feat:1006352700)
Blockchain, Rebuilt for Scale

USAGE:
    renec [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

SUBCOMMANDS:
    account                              Show the contents of an account
    address                              Get your public key
    airdrop                              Request RENEC from a faucet
    authorize-nonce-account              Assign account authority to a new entity
    balance                              Get your balance
    block                                Get a confirmed block
    block-height                         Get current block height
    block-production                     Show information about block production
    block-time                           Get estimated production time of a block
    catchup                              Wait for a validator to catch up to the cluster
    cluster-date                         Get current cluster date, computed from genesis creation time and network
                                         time
    cluster-version                      Get the version of the cluster entrypoint
    completion                           Generate completion scripts for various shells
    config                               Solana command-line tool configuration settings
    confirm                              Confirm transaction by signature
    create-address-with-seed             Generate a derived account address with a seed
    create-nonce-account                 Create a nonce account
    create-stake-account                 Create a stake account
    create-stake-account-checked         Create a stake account, checking the withdraw authority as a signer
    create-vote-account                  Create a vote account
    deactivate-stake                     Deactivate the delegated stake from the stake account
    decode-transaction                   Decode a serialized transaction
    delegate-stake                       Delegate stake to a vote account
    epoch                                Get current epoch
    epoch-info                           Get information about the current epoch
    feature                              Runtime feature management
    fees                                 Display current cluster fees
    first-available-block                Get the first available block in the storage
    genesis-hash                         Get the genesis hash
    gossip                               Show the current gossip network nodes
    help                                 Prints this message or the help of the given subcommand(s)
    inflation                            Show inflation information
    largest-accounts                     Get addresses of largest cluster accounts
    leader-schedule                      Display leader schedule
    live-slots                           Show information about the current slot progression
    logs                                 Stream transaction logs
    merge-stake                          Merges one stake account into another
    new-nonce                            Generate a new nonce, rendering the existing nonce useless
    nonce                                Get the current nonce value
    nonce-account                        Show the contents of a nonce account
    ping                                 Submit transactions sequentially
    program                              Program management
    rent                                 Calculate per-epoch and rent-exempt-minimum values for a given account data
                                         length.
    resolve-signer                       Checks that a signer is valid, and returns its specific path; useful for
                                         signers that may be specified generally, eg. usb://ledger
    slot                                 Get current slot
    split-stake                          Duplicate a stake account, splitting the tokens between the two
    stake-account                        Show the contents of a stake account
    stake-authorize                      Authorize a new signing keypair for the given stake account
    stake-authorize-checked              Authorize a new signing keypair for the given stake account, checking the
                                         authority as a signer
    stake-history                        Show the stake history
    stake-set-lockup                     Set Lockup for the stake account
    stake-set-lockup-checked             Set Lockup for the stake account, checking the new authority as a signer
    stakes                               Show stake account information
    supply                               Get information about the cluster supply of RENEC
    transaction-count                    Get current transaction count
    transaction-history                  Show historical transactions affecting the given address from newest to
                                         oldest
    transfer                             Transfer funds between system accounts
    validator-info                       Publish/get Validator info on Solana
    validators                           Show summary information about the current validators
    vote-account                         Show the contents of a vote account
    vote-authorize-voter                 Authorize a new vote signing keypair for the given vote account
    vote-authorize-voter-checked         Authorize a new vote signing keypair for the given vote account, checking
                                         the new authority as a signer
    vote-authorize-withdrawer            Authorize a new withdraw signing keypair for the given vote account
    vote-authorize-withdrawer-checked    Authorize a new withdraw signing keypair for the given vote account,
                                         checking the new authority as a signer
    vote-update-commission               Update the vote account's commission
    vote-update-validator                Update the vote account's validator identity
    wait-for-max-stake                   Wait for the max stake of any one node to drop below a percentage of total.
    withdraw-from-nonce-account          Withdraw RENEC from the nonce account
    withdraw-from-vote-account           Withdraw lamports from a vote account into a specified account
    withdraw-stake                       Withdraw the unstaked RENEC from the stake account
```

#### renec-account
```text
renec-account 
Show the contents of an account

USAGE:
    renec account [FLAGS] [OPTIONS] <ACCOUNT_ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
    -o, --output-file <FILEPATH>           Write the account data to this file
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <ACCOUNT_ADDRESS>    Account key URI. , one of:
                           * a base58-encoded public key
                           * a path to a keypair file
                           * a hyphen; signals a JSON-encoded keypair on stdin
                           * the 'ASK' keyword; to recover a keypair via its seed phrase
                           * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-address
```text
renec-address 
Get your public key

USAGE:
    renec address [FLAGS] [OPTIONS]

FLAGS:
        --confirm-key                    Confirm key on device; only relevant if using remote wallet
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-airdrop
```text
renec-airdrop 
Request RENEC from a faucet

USAGE:
    renec airdrop [FLAGS] [OPTIONS] <AMOUNT> [RECIPIENT_ADDRESS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <AMOUNT>               The airdrop amount to request, in RENEC
    <RECIPIENT_ADDRESS>    The account address of airdrop recipient. , one of:
                             * a base58-encoded public key
                             * a path to a keypair file
                             * a hyphen; signals a JSON-encoded keypair on stdin
                             * the 'ASK' keyword; to recover a keypair via its seed phrase
                             * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-authorize-nonce-account
```text
renec-authorize-nonce-account 
Assign account authority to a new entity

USAGE:
    renec authorize-nonce-account [FLAGS] [OPTIONS] <NONCE_ACCOUNT_ADDRESS> <AUTHORITY_PUBKEY>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <NONCE_ACCOUNT_ADDRESS>    Address of the nonce account. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <AUTHORITY_PUBKEY>         Account to be granted authority of the nonce account. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-balance
```text
renec-balance 
Get your balance

USAGE:
    renec balance [FLAGS] [OPTIONS] [ACCOUNT_ADDRESS]

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <ACCOUNT_ADDRESS>    The account address of the balance to check. , one of:
                           * a base58-encoded public key
                           * a path to a keypair file
                           * a hyphen; signals a JSON-encoded keypair on stdin
                           * the 'ASK' keyword; to recover a keypair via its seed phrase
                           * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-block
```text
renec-block 
Get a confirmed block

USAGE:
    renec block [FLAGS] [OPTIONS] [SLOT]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <SLOT>    
```

#### renec-block-height
```text
renec-block-height 
Get current block height

USAGE:
    renec block-height [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-block-production
```text
renec-block-production 
Show information about block production

USAGE:
    renec block-production [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --epoch <epoch>                    Epoch to show block production for [default: current epoch]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --slot-limit <slot_limit>          Limit results to this many slots from the end of the epoch [default: full
                                           epoch]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-block-time
```text
renec-block-time 
Get estimated production time of a block

USAGE:
    renec block-time [FLAGS] [OPTIONS] [SLOT]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <SLOT>    Slot number of the block to query
```

#### renec-catchup
```text
renec-catchup 
Wait for a validator to catch up to the cluster

USAGE:
    renec catchup [FLAGS] [OPTIONS] [ARGS]

FLAGS:
        --follow                         Continue reporting progress even after the validator has caught up
    -h, --help                           Prints help information
        --log                            Don't update the progress inplace; instead show updates with its own new lines
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --our-localhost <PORT>             Guess Identity pubkey and validator rpc node assuming local (possibly
                                           private) validator [default: 8899]
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <OUR_VALIDATOR_PUBKEY>    Identity pubkey of the validator, one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
    <OUR_URL>                 JSON RPC URL for validator, which is useful for validators with a private RPC service
```

#### renec-cluster-date
```text
renec-cluster-date 
Get current cluster date, computed from genesis creation time and network time

USAGE:
    renec cluster-date [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-cluster-version
```text
renec-cluster-version 
Get the version of the cluster entrypoint

USAGE:
    renec cluster-version [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-completion
```text
renec-completion 
Generate completion scripts for various shells

USAGE:
    renec completion [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
    -s, --shell <shell>                     [default: bash]  [possible values: bash, fish, zsh, powershell, elvish]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-config
```text
renec-config 
Solana command-line tool configuration settings

USAGE:
    renec config [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

SUBCOMMANDS:
    export-address-labels    Export the current address labels
    get                      Get current config settings
    help                     Prints this message or the help of the given subcommand(s)
    import-address-labels    Import a list of address labels
    set                      Set a config setting
```

#### renec-confirm
```text
renec-confirm 
Confirm transaction by signature

USAGE:
    renec confirm [FLAGS] [OPTIONS] <TRANSACTION_SIGNATURE>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <TRANSACTION_SIGNATURE>    The transaction signature to confirm

Note: This will show more detailed information for finalized transactions with verbose mode (-v/--verbose).

Account modes:
  |srwx|
    s: signed
    r: readable (always true)
    w: writable
    x: program account (inner instructions excluded)
```

#### renec-create-address-with-seed
```text
renec-create-address-with-seed 
Generate a derived account address with a seed

USAGE:
    renec create-address-with-seed [FLAGS] [OPTIONS] <SEED_STRING> <PROGRAM_ID>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --from <FROM_PUBKEY>               From (base) key, [default: cli config keypair]. , one of:
                                             * a base58-encoded public key
                                             * a path to a keypair file
                                             * a hyphen; signals a JSON-encoded keypair on stdin
                                             * the 'ASK' keyword; to recover a keypair via its seed phrase
                                             * a hardware wallet keypair URL (i.e. usb://ledger)
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <SEED_STRING>    The seed.  Must not take more than 32 bytes to encode as utf-8
    <PROGRAM_ID>     The program_id that the address will ultimately be used for, 
                     or one of NONCE, STAKE, and VOTE keywords
```

#### renec-create-nonce-account
```text
renec-create-nonce-account 
Create a nonce account

USAGE:
    renec create-nonce-account [FLAGS] [OPTIONS] <ACCOUNT_KEYPAIR> <AMOUNT>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce-authority <PUBKEY>         Assign noncing authority to another entity. , one of:
                                             * a base58-encoded public key
                                             * a path to a keypair file
                                             * a hyphen; signals a JSON-encoded keypair on stdin
                                             * the 'ASK' keyword; to recover a keypair via its seed phrase
                                             * a hardware wallet keypair URL (i.e. usb://ledger)
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --seed <STRING>                    Seed for address generation; if specified, the resulting account will be at a
                                           derived address of the NONCE_ACCOUNT pubkey
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <ACCOUNT_KEYPAIR>    Keypair of the nonce account to fund
    <AMOUNT>             The amount to load the nonce account with, in RENEC; accepts keyword ALL
```

#### renec-create-stake-account
```text
renec-create-stake-account 
Create a stake account

USAGE:
    renec create-stake-account [FLAGS] [OPTIONS] <STAKE_ACCOUNT_KEYPAIR> <AMOUNT>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>             Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>     Return information at the selected commitment level [possible values:
                                            processed, confirmed, finalized]
    -C, --config <FILEPATH>                 Configuration file to use [default:
                                            ~/.config/renec/cli/config.yml]
        --custodian <PUBKEY>                Authority to modify lockups. , one of:
                                              * a base58-encoded public key
                                              * a path to a keypair file
                                              * a hyphen; signals a JSON-encoded keypair on stdin
                                              * the 'ASK' keyword; to recover a keypair via its seed phrase
                                              * a hardware wallet keypair URL (i.e. usb://ledger)
        --fee-payer <KEYPAIR>               Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                            or the pubkey of an offline signer, provided an appropriate --signer
                                            argument 
                                            is also passed. Defaults to the client keypair.
        --from <KEYPAIR>                    Source account of funds [default: cli config keypair]
    -u, --url <URL_OR_MONIKER>              URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                            testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                 Filepath or URL to a keypair
        --lockup-date <RFC3339 DATETIME>    The date and time at which this account will be available for withdrawal
        --lockup-epoch <NUMBER>             The epoch height at which this account will be available for withdrawal
        --with-memo <MEMO>                  Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                    Provide the nonce account to use when creating a nonced 
                                            transaction. Nonced transactions are useful when a transaction 
                                            requires a lengthy signing process. Learn more about nonced 
                                            transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>         Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                   Return information in specified output format [possible values: json, json-
                                            compact]
        --seed <STRING>                     Seed for address generation; if specified, the resulting account will be at
                                            a derived address of the STAKE_ACCOUNT_KEYPAIR pubkey
        --signer <PUBKEY=SIGNATURE>...      Provide a public-key/signature pair for the transaction
        --stake-authority <PUBKEY>          Authorized staker [default: cli config keypair]
        --ws <URL>                          WebSocket URL for the solana cluster
        --withdraw-authority <PUBKEY>       Authorized withdrawer [default: cli config keypair]

ARGS:
    <STAKE_ACCOUNT_KEYPAIR>    Stake account to create (or base of derived address if --seed is used)
    <AMOUNT>                   The amount to send to the stake account, in RENEC; accepts keyword ALL
```

#### renec-create-stake-account-checked
```text
renec-create-stake-account-checked 
Create a stake account, checking the withdraw authority as a signer

USAGE:
    renec create-stake-account-checked [FLAGS] [OPTIONS] <STAKE_ACCOUNT_KEYPAIR> <AMOUNT>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
        --from <KEYPAIR>                   Source account of funds [default: cli config keypair]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --seed <STRING>                    Seed for address generation; if specified, the resulting account will be at a
                                           derived address of the STAKE_ACCOUNT_KEYPAIR pubkey
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --stake-authority <PUBKEY>         Authorized staker [default: cli config keypair]
        --ws <URL>                         WebSocket URL for the solana cluster
        --withdraw-authority <KEYPAIR>     Authorized withdrawer [default: cli config keypair]

ARGS:
    <STAKE_ACCOUNT_KEYPAIR>    Stake account to create (or base of derived address if --seed is used)
    <AMOUNT>                   The amount to send to the stake account, in RENEC; accepts keyword ALL
```

#### renec-create-vote-account
```text
renec-create-vote-account 
Create a vote account

USAGE:
    renec create-vote-account [FLAGS] [OPTIONS] <ACCOUNT_KEYPAIR> <IDENTITY_KEYPAIR> <WITHDRAWER_PUBKEY>

FLAGS:
        --allow-unsafe-authorized-withdrawer    Allow an authorized withdrawer pubkey to be identical to the validator
                                                identity account pubkey or vote account pubkey, which is normally an
                                                unsafe configuration and should be avoided.
        --dump-transaction-message              Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                                  Prints help information
        --no-address-labels                     Do not use address labels in the output
        --sign-only                             Sign the transaction offline
        --skip-seed-phrase-validation           Skip validation of seed phrases. Use this if your phrase does not use
                                                the BIP39 official English word list
    -V, --version                               Prints version information
    -v, --verbose                               Show additional information

OPTIONS:
        --authorized-voter <VOTER_PUBKEY>    Public key of the authorized voter [default: validator identity pubkey]. ,
                                             one of:
                                               * a base58-encoded public key
                                               * a path to a keypair file
                                               * a hyphen; signals a JSON-encoded keypair on stdin
                                               * the 'ASK' keyword; to recover a keypair via its seed phrase
                                               * a hardware wallet keypair URL (i.e. usb://ledger)
        --blockhash <BLOCKHASH>              Use the supplied blockhash
        --commission <PERCENTAGE>            The commission taken on reward redemption (0-100) [default: 100]
        --commitment <COMMITMENT_LEVEL>      Return information at the selected commitment level [possible values:
                                             processed, confirmed, finalized]
    -C, --config <FILEPATH>                  Configuration file to use [default:
                                             ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>                Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                             or the pubkey of an offline signer, provided an appropriate --signer
                                             argument 
                                             is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>               URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-
                                             beta, testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                  Filepath or URL to a keypair
        --with-memo <MEMO>                   Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                     Provide the nonce account to use when creating a nonced 
                                             transaction. Nonced transactions are useful when a transaction 
                                             requires a lengthy signing process. Learn more about nonced 
                                             transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>          Provide the nonce authority keypair to use when signing a nonced
                                             transaction
        --output <FORMAT>                    Return information in specified output format [possible values: json, json-
                                             compact]
        --seed <STRING>                      Seed for address generation; if specified, the resulting account will be at
                                             a derived address of the VOTE ACCOUNT pubkey
        --signer <PUBKEY=SIGNATURE>...       Provide a public-key/signature pair for the transaction
        --ws <URL>                           WebSocket URL for the solana cluster

ARGS:
    <ACCOUNT_KEYPAIR>      Vote account keypair to create
    <IDENTITY_KEYPAIR>     Keypair of validator that will vote with this account
    <WITHDRAWER_PUBKEY>    Public key of the authorized withdrawer, one of:
                             * a base58-encoded public key
                             * a path to a keypair file
                             * a hyphen; signals a JSON-encoded keypair on stdin
                             * the 'ASK' keyword; to recover a keypair via its seed phrase
                             * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-deactivate-stake
```text
renec-deactivate-stake 
Deactivate the delegated stake from the stake account

USAGE:
    renec deactivate-stake [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --seed <STRING>                    Seed for address generation; if specified, the resulting account will be at a
                                           derived address of STAKE_ACCOUNT_ADDRESS
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --stake-authority <KEYPAIR>        Authorized staker [default: cli config keypair]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account to be deactivated (or base of derived address if --seed is used). , one
                               of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-decode-transaction
```text
renec-decode-transaction 
Decode a serialized transaction

USAGE:
    renec decode-transaction [FLAGS] [OPTIONS] <TRANSACTION> <ENCODING>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <TRANSACTION>    transaction to decode
    <ENCODING>       transaction encoding [default: base58]  [possible values: base58, base64]
```

#### renec-delegate-stake
```text
renec-delegate-stake 
Delegate stake to a vote account

USAGE:
    renec delegate-stake [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> <VOTE_ACCOUNT_ADDRESS>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --stake-authority <KEYPAIR>        Authorized staker [default: cli config keypair]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account to delegate, one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <VOTE_ACCOUNT_ADDRESS>     The vote account to which the stake will be delegated, one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-epoch
```text
renec-epoch 
Get current epoch

USAGE:
    renec epoch [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-epoch-info
```text
renec-epoch-info 
Get information about the current epoch

USAGE:
    renec epoch-info [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-feature
```text
renec-feature 
Runtime feature management

USAGE:
    renec feature [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

SUBCOMMANDS:
    activate    Activate a runtime feature
    help        Prints this message or the help of the given subcommand(s)
    status      Query runtime feature status
```

#### renec-fees
```text
renec-fees 
Display current cluster fees

USAGE:
    renec fees [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Query fees for BLOCKHASH instead of the the most recent blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-first-available-block
```text
renec-first-available-block 
Get the first available block in the storage

USAGE:
    renec first-available-block [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-genesis-hash
```text
renec-genesis-hash 
Get the genesis hash

USAGE:
    renec genesis-hash [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-gossip
```text
renec-gossip 
Show the current gossip network nodes

USAGE:
    renec gossip [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-help
```text
renec-help 
Prints this message or the help of the given subcommand(s)

USAGE:
    renec help [subcommand]...

ARGS:
    <subcommand>...    The subcommand whose help message to display
```

#### renec-inflation
```text
renec-inflation 
Show inflation information

USAGE:
    renec inflation [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

SUBCOMMANDS:
    help       Prints this message or the help of the given subcommand(s)
    rewards    Show inflation rewards for a set of addresses
```

#### renec-largest-accounts
```text
renec-largest-accounts 
Get addresses of largest cluster accounts

USAGE:
    renec largest-accounts [FLAGS] [OPTIONS]

FLAGS:
        --circulating                    Filter address list to only circulating accounts
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --non-circulating                Filter address list to only non-circulating accounts
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-leader-schedule
```text
renec-leader-schedule 
Display leader schedule

USAGE:
    renec leader-schedule [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --epoch <EPOCH>                    Epoch to show leader schedule for. [default: current]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-live-slots
```text
renec-live-slots 
Show information about the current slot progression

USAGE:
    renec live-slots [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-logs
```text
renec-logs 
Stream transaction logs

USAGE:
    renec logs [FLAGS] [OPTIONS] [ADDRESS]

FLAGS:
    -h, --help                           Prints help information
        --include-votes                  Include vote transactions when monitoring all transactions
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <ADDRESS>    Account address to monitor [default: monitor all transactions except for votes] , one of:
                   * a base58-encoded public key
                   * a path to a keypair file
                   * a hyphen; signals a JSON-encoded keypair on stdin
                   * the 'ASK' keyword; to recover a keypair via its seed phrase
                   * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-merge-stake
```text
renec-merge-stake 
Merges one stake account into another

USAGE:
    renec merge-stake [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> <SOURCE_STAKE_ACCOUNT_ADDRESS>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --stake-authority <KEYPAIR>        Authorized staker [default: cli config keypair]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>           Stake account to merge into, one of:
                                        * a base58-encoded public key
                                        * a path to a keypair file
                                        * a hyphen; signals a JSON-encoded keypair on stdin
                                        * the 'ASK' keyword; to recover a keypair via its seed phrase
                                        * a hardware wallet keypair URL (i.e. usb://ledger)
    <SOURCE_STAKE_ACCOUNT_ADDRESS>    Source stake account for the merge.  If successful, this stake account will no
                                      longer exist after the merge, one of:
                                        * a base58-encoded public key
                                        * a path to a keypair file
                                        * a hyphen; signals a JSON-encoded keypair on stdin
                                        * the 'ASK' keyword; to recover a keypair via its seed phrase
                                        * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-new-nonce
```text
renec-new-nonce 
Generate a new nonce, rendering the existing nonce useless

USAGE:
    renec new-nonce [FLAGS] [OPTIONS] <NONCE_ACCOUNT_ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <NONCE_ACCOUNT_ADDRESS>    Address of the nonce account. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-nonce
```text
renec-nonce 
Get the current nonce value

USAGE:
    renec nonce [FLAGS] [OPTIONS] <NONCE_ACCOUNT_ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <NONCE_ACCOUNT_ADDRESS>    Address of the nonce account to display. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-nonce-account
```text
renec-nonce-account 
Show the contents of a nonce account

USAGE:
    renec nonce-account [FLAGS] [OPTIONS] <NONCE_ACCOUNT_ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <NONCE_ACCOUNT_ADDRESS>    Address of the nonce account to display. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-ping
```text
renec-ping 
Submit transactions sequentially

USAGE:
    renec ping [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
    -D, --print-timestamp                Print timestamp (unix time + microseconds as in gettimeofday) before each line
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -c, --count <NUMBER>                   Stop after submitting count transactions
    -i, --interval <SECONDS>               Wait interval seconds between submitting the next transaction [default: 2]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --lamports <NUMBER>                Number of lamports to transfer for each transaction [default: 1]
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
    -t, --timeout <SECONDS>                Wait up to timeout seconds for transaction confirmation [default: 15]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-program
```text
renec-program 
Program management

USAGE:
    renec program [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

SUBCOMMANDS:
    close                    Close a program or buffer account and withdraw all lamports
    deploy                   Deploy a program
    dump                     Write the program data to a file
    help                     Prints this message or the help of the given subcommand(s)
    set-buffer-authority     Set a new buffer authority
    set-upgrade-authority    Set a new program authority
    show                     Display information about a buffer or program
    write-buffer             Writes a program into a buffer account
```

#### renec-rent
```text
renec-rent 
Calculate per-epoch and rent-exempt-minimum values for a given account data length.

USAGE:
    renec rent [FLAGS] [OPTIONS] <DATA_LENGTH_OR_MONIKER>

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display rent in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <DATA_LENGTH_OR_MONIKER>    Length of data in the account to calculate rent for, or moniker: [nonce, stake,
                                system, vote]
```

#### renec-resolve-signer
```text
renec-resolve-signer 
Checks that a signer is valid, and returns its specific path; useful for signers that may be specified generally, eg.
usb://ledger

USAGE:
    renec resolve-signer [FLAGS] [OPTIONS] <SIGNER_KEYPAIR>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <SIGNER_KEYPAIR>    The signer path to resolve
```

#### renec-slot
```text
renec-slot 
Get current slot

USAGE:
    renec slot [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-split-stake
```text
renec-split-stake 
Duplicate a stake account, splitting the tokens between the two

USAGE:
    renec split-stake [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> <SPLIT_STAKE_ACCOUNT> <AMOUNT>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --seed <STRING>                    Seed for address generation; if specified, the resulting account will be at a
                                           derived address of SPLIT_STAKE_ACCOUNT
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --stake-authority <KEYPAIR>        Authorized staker [default: cli config keypair]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account to split (or base of derived address if --seed is used). , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <SPLIT_STAKE_ACCOUNT>      Keypair of the new stake account
    <AMOUNT>                   The amount to move into the new stake account, in RENEC
```

#### renec-stake-account
```text
renec-stake-account 
Show the contents of a stake account

USAGE:
    renec stake-account [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information
        --with-rewards                   Display inflation rewards

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --num-rewards-epochs <NUM>         Display rewards for NUM recent epochs, max 10 [default: latest epoch only]
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    The stake account to display. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-stake-authorize
```text
renec-stake-authorize 
Authorize a new signing keypair for the given stake account

USAGE:
    renec stake-authorize [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> --new-stake-authority <PUBKEY> --new-withdraw-authority <PUBKEY>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --no-wait                        Return signature immediately after submitting the transaction, instead of
                                         waiting for confirmations
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>              Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>      Return information at the selected commitment level [possible values:
                                             processed, confirmed, finalized]
    -C, --config <FILEPATH>                  Configuration file to use [default:
                                             ~/.config/renec/cli/config.yml]
        --custodian <KEYPAIR>                Authority to override account lockup
        --fee-payer <KEYPAIR>                Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                             or the pubkey of an offline signer, provided an appropriate --signer
                                             argument 
                                             is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>               URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-
                                             beta, testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                  Filepath or URL to a keypair
        --with-memo <MEMO>                   Specify a memo string to include in the transaction.
        --new-stake-authority <PUBKEY>       New authorized staker, one of:
                                               * a base58-encoded public key
                                               * a path to a keypair file
                                               * a hyphen; signals a JSON-encoded keypair on stdin
                                               * the 'ASK' keyword; to recover a keypair via its seed phrase
                                               * a hardware wallet keypair URL (i.e. usb://ledger)
        --new-withdraw-authority <PUBKEY>    New authorized withdrawer. , one of:
                                               * a base58-encoded public key
                                               * a path to a keypair file
                                               * a hyphen; signals a JSON-encoded keypair on stdin
                                               * the 'ASK' keyword; to recover a keypair via its seed phrase
                                               * a hardware wallet keypair URL (i.e. usb://ledger)
        --nonce <PUBKEY>                     Provide the nonce account to use when creating a nonced 
                                             transaction. Nonced transactions are useful when a transaction 
                                             requires a lengthy signing process. Learn more about nonced 
                                             transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>          Provide the nonce authority keypair to use when signing a nonced
                                             transaction
        --output <FORMAT>                    Return information in specified output format [possible values: json, json-
                                             compact]
        --signer <PUBKEY=SIGNATURE>...       Provide a public-key/signature pair for the transaction
        --stake-authority <KEYPAIR>          Authorized staker [default: cli config keypair]
        --ws <URL>                           WebSocket URL for the solana cluster
        --withdraw-authority <KEYPAIR>       Authorized withdrawer [default: cli config keypair]

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account in which to set a new authority. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-stake-authorize-checked
```text
renec-stake-authorize-checked 
Authorize a new signing keypair for the given stake account, checking the authority as a signer

USAGE:
    renec stake-authorize-checked [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --no-wait                        Return signature immediately after submitting the transaction, instead of
                                         waiting for confirmations
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>               Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>       Return information at the selected commitment level [possible values:
                                              processed, confirmed, finalized]
    -C, --config <FILEPATH>                   Configuration file to use [default:
                                              ~/.config/renec/cli/config.yml]
        --custodian <KEYPAIR>                 Authority to override account lockup
        --fee-payer <KEYPAIR>                 Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                              or the pubkey of an offline signer, provided an appropriate --signer
                                              argument 
                                              is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>                URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-
                                              beta, testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                   Filepath or URL to a keypair
        --with-memo <MEMO>                    Specify a memo string to include in the transaction.
        --new-stake-authority <KEYPAIR>       New authorized staker
        --new-withdraw-authority <KEYPAIR>    New authorized withdrawer
        --nonce <PUBKEY>                      Provide the nonce account to use when creating a nonced 
                                              transaction. Nonced transactions are useful when a transaction 
                                              requires a lengthy signing process. Learn more about nonced 
                                              transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>           Provide the nonce authority keypair to use when signing a nonced
                                              transaction
        --output <FORMAT>                     Return information in specified output format [possible values: json,
                                              json-compact]
        --signer <PUBKEY=SIGNATURE>...        Provide a public-key/signature pair for the transaction
        --stake-authority <KEYPAIR>           Authorized staker [default: cli config keypair]
        --ws <URL>                            WebSocket URL for the solana cluster
        --withdraw-authority <KEYPAIR>        Authorized withdrawer [default: cli config keypair]

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account in which to set a new authority. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-stake-history
```text
renec-stake-history 
Show the stake history

USAGE:
    renec stake-history [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --limit <NUM>                      Display NUM recent epochs worth of stake history in text mode. 0 for all
                                           [default: 10]
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-stake-set-lockup
```text
renec-stake-set-lockup 
Set Lockup for the stake account

USAGE:
    renec stake-set-lockup [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> <--lockup-epoch <NUMBER>|--lockup-date <RFC3339 DATETIME>|--new-custodian <PUBKEY>>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>             Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>     Return information at the selected commitment level [possible values:
                                            processed, confirmed, finalized]
    -C, --config <FILEPATH>                 Configuration file to use [default:
                                            ~/.config/renec/cli/config.yml]
        --custodian <KEYPAIR>               Keypair of the existing custodian [default: cli config pubkey]
        --fee-payer <KEYPAIR>               Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                            or the pubkey of an offline signer, provided an appropriate --signer
                                            argument 
                                            is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>              URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                            testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                 Filepath or URL to a keypair
        --lockup-date <RFC3339 DATETIME>    The date and time at which this account will be available for withdrawal
        --lockup-epoch <NUMBER>             The epoch height at which this account will be available for withdrawal
        --with-memo <MEMO>                  Specify a memo string to include in the transaction.
        --new-custodian <PUBKEY>            Identity of a new lockup custodian. , one of:
                                              * a base58-encoded public key
                                              * a path to a keypair file
                                              * a hyphen; signals a JSON-encoded keypair on stdin
                                              * the 'ASK' keyword; to recover a keypair via its seed phrase
                                              * a hardware wallet keypair URL (i.e. usb://ledger)
        --nonce <PUBKEY>                    Provide the nonce account to use when creating a nonced 
                                            transaction. Nonced transactions are useful when a transaction 
                                            requires a lengthy signing process. Learn more about nonced 
                                            transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>         Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                   Return information in specified output format [possible values: json, json-
                                            compact]
        --signer <PUBKEY=SIGNATURE>...      Provide a public-key/signature pair for the transaction
        --ws <URL>                          WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account for which to set lockup parameters. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-stake-set-lockup-checked
```text
renec-stake-set-lockup-checked 
Set Lockup for the stake account, checking the new authority as a signer

USAGE:
    renec stake-set-lockup-checked [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> <--lockup-epoch <NUMBER>|--lockup-date <RFC3339 DATETIME>|--new-custodian <KEYPAIR>>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>             Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>     Return information at the selected commitment level [possible values:
                                            processed, confirmed, finalized]
    -C, --config <FILEPATH>                 Configuration file to use [default:
                                            ~/.config/renec/cli/config.yml]
        --custodian <KEYPAIR>               Keypair of the existing custodian [default: cli config pubkey]
        --fee-payer <KEYPAIR>               Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                            or the pubkey of an offline signer, provided an appropriate --signer
                                            argument 
                                            is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>              URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                            testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                 Filepath or URL to a keypair
        --lockup-date <RFC3339 DATETIME>    The date and time at which this account will be available for withdrawal
        --lockup-epoch <NUMBER>             The epoch height at which this account will be available for withdrawal
        --with-memo <MEMO>                  Specify a memo string to include in the transaction.
        --new-custodian <KEYPAIR>           Keypair of a new lockup custodian
        --nonce <PUBKEY>                    Provide the nonce account to use when creating a nonced 
                                            transaction. Nonced transactions are useful when a transaction 
                                            requires a lengthy signing process. Learn more about nonced 
                                            transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>         Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                   Return information in specified output format [possible values: json, json-
                                            compact]
        --signer <PUBKEY=SIGNATURE>...      Provide a public-key/signature pair for the transaction
        --ws <URL>                          WebSocket URL for the solana cluster

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account for which to set lockup parameters. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-stakes
```text
renec-stakes 
Show stake account information

USAGE:
    renec stakes [FLAGS] [OPTIONS] [VOTE_ACCOUNT_PUBKEYS]...

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_PUBKEYS>...    Only show stake accounts delegated to the provided vote accounts. , one of:
                                   * a base58-encoded public key
                                   * a path to a keypair file
                                   * a hyphen; signals a JSON-encoded keypair on stdin
                                   * the 'ASK' keyword; to recover a keypair via its seed phrase
                                   * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-supply
```text
renec-supply 
Get information about the cluster supply of RENEC

USAGE:
    renec supply [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --print-accounts                 Print list of non-circualting account addresses
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-transaction-count
```text
renec-transaction-count 
Get current transaction count

USAGE:
    renec transaction-count [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster
```

#### renec-transaction-history
```text
renec-transaction-history 
Show historical transactions affecting the given address from newest to oldest

USAGE:
    renec transaction-history [FLAGS] [OPTIONS] <ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --show-transactions              Display the full transactions
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --before <TRANSACTION_SIGNATURE>    Start with the first signature older than this one
        --commitment <COMMITMENT_LEVEL>     Return information at the selected commitment level [possible values:
                                            processed, confirmed, finalized]
    -C, --config <FILEPATH>                 Configuration file to use [default:
                                            ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>              URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                            testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                 Filepath or URL to a keypair
        --limit <LIMIT>                     Maximum number of transaction signatures to return [default: 1000]
        --output <FORMAT>                   Return information in specified output format [possible values: json, json-
                                            compact]
        --ws <URL>                          WebSocket URL for the solana cluster

ARGS:
    <ADDRESS>    Account address, one of:
                   * a base58-encoded public key
                   * a path to a keypair file
                   * a hyphen; signals a JSON-encoded keypair on stdin
                   * the 'ASK' keyword; to recover a keypair via its seed phrase
                   * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-transfer
```text
renec-transfer 
Transfer funds between system accounts

USAGE:
    renec transfer [FLAGS] [OPTIONS] <RECIPIENT_ADDRESS> <AMOUNT>

FLAGS:
        --allow-unfunded-recipient       Complete the transfer even if the recipient address is not funded
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --no-wait                        Return signature immediately after submitting the transaction, instead of
                                         waiting for confirmations
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
        --from <FROM_ADDRESS>              Source account of funds (if different from client local account). , one of:
                                             * a base58-encoded public key
                                             * a path to a keypair file
                                             * a hyphen; signals a JSON-encoded keypair on stdin
                                             * the 'ASK' keyword; to recover a keypair via its seed phrase
                                             * a hardware wallet keypair URL (i.e. usb://ledger)
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <RECIPIENT_ADDRESS>    The account address of recipient. , one of:
                             * a base58-encoded public key
                             * a path to a keypair file
                             * a hyphen; signals a JSON-encoded keypair on stdin
                             * the 'ASK' keyword; to recover a keypair via its seed phrase
                             * a hardware wallet keypair URL (i.e. usb://ledger)
    <AMOUNT>               The amount to send, in RENEC; accepts keyword ALL
```

#### renec-validator-info
```text
renec-validator-info 
Publish/get Validator info on Solana

USAGE:
    renec validator-info [FLAGS] [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

SUBCOMMANDS:
    get        Get and parse Solana Validator info
    help       Prints this message or the help of the given subcommand(s)
    publish    Publish Validator info on Solana
```

#### renec-validators
```text
renec-validators 
Show summary information about the current validators

USAGE:
    renec validators [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                           Prints help information
        --keep-unstaked-delinquents      Don't discard unstaked, delinquent validators
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
    -n, --number                         Number the validators
    -r, --reverse                        Reverse order while sorting
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>
            Return information at the selected commitment level [possible values: processed, confirmed, finalized]

    -C, --config <FILEPATH>
            Configuration file to use [default: ~/.config/renec/cli/config.yml]

        --delinquent-slot-distance <SLOT_DISTANCE>
            Minimum slot distance from the tip to consider a validator delinquent. [default: 128]

    -u, --url <URL_OR_MONIKER>
            URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta, testnet, devnet, localhost]

    -k, --keypair <KEYPAIR>                           Filepath or URL to a keypair
        --output <FORMAT>
            Return information in specified output format [possible values: json, json-compact]

        --sort <sort>
            Sort order (does not affect JSON output) [default: stake]  [possible values: delinquent, commission,
            credits, identity, last-vote, root, skip-rate, stake, vote-account]
        --ws <URL>                                    WebSocket URL for the solana cluster
```

#### renec-vote-account
```text
renec-vote-account 
Show the contents of a vote account

USAGE:
    renec vote-account [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS>

FLAGS:
    -h, --help                           Prints help information
        --lamports                       Display balance in lamports instead of RENEC
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information
        --with-rewards                   Display inflation rewards

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --num-rewards-epochs <NUM>         Display rewards for NUM recent epochs, max 10 [default: latest epoch only]
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>    Vote account pubkey. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-vote-authorize-voter
```text
renec-vote-authorize-voter 
Authorize a new vote signing keypair for the given vote account

USAGE:
    renec vote-authorize-voter [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <AUTHORIZED_KEYPAIR> <NEW_AUTHORIZED_PUBKEY>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>     Vote account in which to set the authorized voter. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <AUTHORIZED_KEYPAIR>       Current authorized vote signer.
    <NEW_AUTHORIZED_PUBKEY>    New authorized vote signer. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-vote-authorize-voter-checked
```text
renec-vote-authorize-voter-checked 
Authorize a new vote signing keypair for the given vote account, checking the new authority as a signer

USAGE:
    renec vote-authorize-voter-checked [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <AUTHORIZED_KEYPAIR> <NEW_AUTHORIZED_KEYPAIR>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>      Vote account in which to set the authorized voter. , one of:
                                  * a base58-encoded public key
                                  * a path to a keypair file
                                  * a hyphen; signals a JSON-encoded keypair on stdin
                                  * the 'ASK' keyword; to recover a keypair via its seed phrase
                                  * a hardware wallet keypair URL (i.e. usb://ledger)
    <AUTHORIZED_KEYPAIR>        Current authorized vote signer.
    <NEW_AUTHORIZED_KEYPAIR>    New authorized vote signer.
```

#### renec-vote-authorize-withdrawer
```text
renec-vote-authorize-withdrawer 
Authorize a new withdraw signing keypair for the given vote account

USAGE:
    renec vote-authorize-withdrawer [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <AUTHORIZED_KEYPAIR> <AUTHORIZED_PUBKEY>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>    Vote account in which to set the authorized withdrawer. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
    <AUTHORIZED_KEYPAIR>      Current authorized withdrawer.
    <AUTHORIZED_PUBKEY>       New authorized withdrawer. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
```

#### renec-vote-authorize-withdrawer-checked
```text
renec-vote-authorize-withdrawer-checked 
Authorize a new withdraw signing keypair for the given vote account, checking the new authority as a signer

USAGE:
    renec vote-authorize-withdrawer-checked [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <AUTHORIZED_KEYPAIR> <NEW_AUTHORIZED_KEYPAIR>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>      Vote account in which to set the authorized withdrawer. , one of:
                                  * a base58-encoded public key
                                  * a path to a keypair file
                                  * a hyphen; signals a JSON-encoded keypair on stdin
                                  * the 'ASK' keyword; to recover a keypair via its seed phrase
                                  * a hardware wallet keypair URL (i.e. usb://ledger)
    <AUTHORIZED_KEYPAIR>        Current authorized withdrawer.
    <NEW_AUTHORIZED_KEYPAIR>    New authorized withdrawer.
```

#### renec-vote-update-commission
```text
renec-vote-update-commission 
Update the vote account's commission

USAGE:
    renec vote-update-commission [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <PERCENTAGE> <AUTHORIZED_KEYPAIR>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>    Vote account to update. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
    <PERCENTAGE>              The new commission
    <AUTHORIZED_KEYPAIR>      Authorized withdrawer keypair
```

#### renec-vote-update-validator
```text
renec-vote-update-validator 
Update the vote account's validator identity

USAGE:
    renec vote-update-validator [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <IDENTITY_KEYPAIR> <AUTHORIZED_KEYPAIR>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>    Vote account to update. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
    <IDENTITY_KEYPAIR>        Keypair of new validator that will vote with this account
    <AUTHORIZED_KEYPAIR>      Authorized withdrawer keypair
```

#### renec-wait-for-max-stake
```text
renec-wait-for-max-stake 
Wait for the max stake of any one node to drop below a percentage of total.

USAGE:
    renec wait-for-max-stake [FLAGS] [OPTIONS] [PERCENT]

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <PERCENT>    
```

#### renec-withdraw-from-nonce-account
```text
renec-withdraw-from-nonce-account 
Withdraw RENEC from the nonce account

USAGE:
    renec withdraw-from-nonce-account [FLAGS] [OPTIONS] <NONCE_ACCOUNT_ADDRESS> <RECIPIENT_ADDRESS> <AMOUNT>

FLAGS:
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --ws <URL>                         WebSocket URL for the solana cluster

ARGS:
    <NONCE_ACCOUNT_ADDRESS>    Nonce account to withdraw from. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <RECIPIENT_ADDRESS>        The account to which the RENEC should be transferred. , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <AMOUNT>                   The amount to withdraw from the nonce account, in RENEC
```

#### renec-withdraw-from-vote-account
```text
renec-withdraw-from-vote-account 
Withdraw lamports from a vote account into a specified account

USAGE:
    renec withdraw-from-vote-account [FLAGS] [OPTIONS] <VOTE_ACCOUNT_ADDRESS> <RECIPIENT_ADDRESS> <AMOUNT>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --authorized-withdrawer <AUTHORIZED_KEYPAIR>    Authorized withdrawer [default: cli config keypair]
        --blockhash <BLOCKHASH>                         Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>
            Return information at the selected commitment level [possible values: processed, confirmed, finalized]

    -C, --config <FILEPATH>
            Configuration file to use [default: ~/.config/renec/cli/config.yml]

        --fee-payer <KEYPAIR>
            Specify the fee-payer account. This may be a keypair file, the ASK keyword 
            or the pubkey of an offline signer, provided an appropriate --signer argument 
            is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>
            URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta, testnet, devnet, localhost]

    -k, --keypair <KEYPAIR>                             Filepath or URL to a keypair
        --with-memo <MEMO>                              Specify a memo string to include in the transaction.
        --nonce <PUBKEY>
            Provide the nonce account to use when creating a nonced 
            transaction. Nonced transactions are useful when a transaction 
            requires a lengthy signing process. Learn more about nonced 
            transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>
            Provide the nonce authority keypair to use when signing a nonced transaction

        --output <FORMAT>
            Return information in specified output format [possible values: json, json-compact]

        --signer <PUBKEY=SIGNATURE>...                  Provide a public-key/signature pair for the transaction
        --ws <URL>                                      WebSocket URL for the solana cluster

ARGS:
    <VOTE_ACCOUNT_ADDRESS>    Vote account from which to withdraw. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
    <RECIPIENT_ADDRESS>       The recipient of withdrawn RENEC. , one of:
                                * a base58-encoded public key
                                * a path to a keypair file
                                * a hyphen; signals a JSON-encoded keypair on stdin
                                * the 'ASK' keyword; to recover a keypair via its seed phrase
                                * a hardware wallet keypair URL (i.e. usb://ledger)
    <AMOUNT>                  The amount to withdraw, in RENEC; accepts keyword ALL, which for this command means
                              account balance minus rent-exempt minimum
```

#### renec-withdraw-stake
```text
renec-withdraw-stake 
Withdraw the unstaked RENEC from the stake account

USAGE:
    renec withdraw-stake [FLAGS] [OPTIONS] <STAKE_ACCOUNT_ADDRESS> <RECIPIENT_ADDRESS> <AMOUNT>

FLAGS:
        --dump-transaction-message       Display the base64 encoded binary transaction message in sign-only mode
    -h, --help                           Prints help information
        --no-address-labels              Do not use address labels in the output
        --sign-only                      Sign the transaction offline
        --skip-seed-phrase-validation    Skip validation of seed phrases. Use this if your phrase does not use the BIP39
                                         official English word list
    -V, --version                        Prints version information
    -v, --verbose                        Show additional information

OPTIONS:
        --blockhash <BLOCKHASH>            Use the supplied blockhash
        --commitment <COMMITMENT_LEVEL>    Return information at the selected commitment level [possible values:
                                           processed, confirmed, finalized]
    -C, --config <FILEPATH>                Configuration file to use [default:
                                           ~/.config/renec/cli/config.yml]
        --custodian <KEYPAIR>              Authority to override account lockup
        --fee-payer <KEYPAIR>              Specify the fee-payer account. This may be a keypair file, the ASK keyword 
                                           or the pubkey of an offline signer, provided an appropriate --signer argument 
                                           is also passed. Defaults to the client keypair.
    -u, --url <URL_OR_MONIKER>             URL for Solana's JSON RPC or moniker (or their first letter): [mainnet-beta,
                                           testnet, devnet, localhost]
    -k, --keypair <KEYPAIR>                Filepath or URL to a keypair
        --with-memo <MEMO>                 Specify a memo string to include in the transaction.
        --nonce <PUBKEY>                   Provide the nonce account to use when creating a nonced 
                                           transaction. Nonced transactions are useful when a transaction 
                                           requires a lengthy signing process. Learn more about nonced 
                                           transactions at https://docs.solana.com/offline-signing/durable-nonce
        --nonce-authority <KEYPAIR>        Provide the nonce authority keypair to use when signing a nonced transaction
        --output <FORMAT>                  Return information in specified output format [possible values: json, json-
                                           compact]
        --seed <STRING>                    Seed for address generation; if specified, the resulting account will be at a
                                           derived address of STAKE_ACCOUNT_ADDRESS
        --signer <PUBKEY=SIGNATURE>...     Provide a public-key/signature pair for the transaction
        --ws <URL>                         WebSocket URL for the solana cluster
        --withdraw-authority <KEYPAIR>     Authorized withdrawer [default: cli config keypair]

ARGS:
    <STAKE_ACCOUNT_ADDRESS>    Stake account from which to withdraw (or base of derived address if --seed is used).
                               , one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <RECIPIENT_ADDRESS>        Recipient of withdrawn RENEC, one of:
                                 * a base58-encoded public key
                                 * a path to a keypair file
                                 * a hyphen; signals a JSON-encoded keypair on stdin
                                 * the 'ASK' keyword; to recover a keypair via its seed phrase
                                 * a hardware wallet keypair URL (i.e. usb://ledger)
    <AMOUNT>                   The amount to withdraw from the stake account, in RENEC; accepts keyword ALL
```

