---
title: Renec Clusters
---

Renec maintains several different clusters with different purposes.

Before you begin make sure you have first
[installed the Renec command line tools](cli/install-renec-cli-tools.md)

Explorers:

- [http://explorer.renec.foundation/](https://explorer.renec.foundation/).

## Mainnet Beta

- Tokens that are issued on Mainnet Beta are real RENEC
- Gossip entrypoint for Mainnet Beta: `52.21.244.146:8001`
- RPC URL for Mainnet Beta: `https://api-mainnet-beta.renec.foundation:8899`

##### Example `renec` command-line configuration

```bash
renec config set --url https://api-mainnet-beta.renec.foundation:8899
```

##### Example `renec-validator` command-line

```bash
$ renec-validator \
    --identity validator-keypair.json \
    --vote-account vote-account-keypair.json \
    --ledger ledger \
    --rpc-port 8899 \
    --dynamic-port-range 8000-8020 \
    --entrypoint 52.21.244.146:8001 \
    --expected-genesis-hash 7PNFRHLxT9FcAxSUcg3P8BraJnnUBnjuy8LwRbRJvVkX \
    --wal-recovery-mode skip_any_corrupted_record \
    --limit-ledger-size
```

## Testnet

- Testnet is where the Solana core contributors stress test recent release features on a live
  cluster, particularly focused on network performance, stability and validator
  behavior.
- Testnet tokens are **not real**
- Testnet may be subject to ledger resets.
- Testnet includes a token faucet for airdrops for application testing
- Testnet typically runs a newer software release than both Devnet and
  Mainnet Beta
- Gossip entrypoint for Testnet: `54.208.172.26:8001`
- RPC URL for Testnet: `https://api-testnet.renec.foundation:8899`

##### Example `renec` command-line configuration

```bash
renec config set --url https://api-testnet.renec.foundation:8899
```

##### Example `renec-validator` command-line

```bash
$ renec-validator \
    --identity validator-keypair.json \
    --vote-account vote-account-keypair.json \
    --known-validator FwhcMdpwaeKPaHEn42q2UkeiFrSuMBWHWbimD4aFRF54 \
    --known-validator 46ZiwX4UKJqcR2EKMipkMgAjHNmKVc9KMhVdGSMz8LGr \
    --only-known-rpc \
    --ledger ledger \
    --rpc-port 8899 \
    --dynamic-port-range 8000-8020 \
    --entrypoint 54.208.172.26:8001 \
    --entrypoint 52.4.67.95:8001 \
    --expected-genesis-hash 2ipyhz9E19koN6Ejh1ERRgQS3wqD6ZV1FFk4pnXBbCrx \
    --wal-recovery-mode skip_any_corrupted_record \
    --limit-ledger-size
```

The identities of the
[`--known-validator`s](running-validator/validator-start#known-validators) are:

- `FwhcMdpwaeKPaHEn42q2UkeiFrSuMBWHWbimD4aFRF54` - Renec Labs (testnet)
- `46ZiwX4UKJqcR2EKMipkMgAjHNmKVc9KMhVdGSMz8LGr` - Renec Labs (testnet)


All 2 [`--known-validator`s](running-validator/validator-start#known-validators)
are operated by Renec Labs
