---
title: Renec Clusters
---

Renec maintains several different clusters with different purposes.

Before you begin make sure you have first
[installed the Renec command line tools](cli/install-renec-cli-tools.md)

Explorers:

- [http://explorer.renec.foundation/](https://explorer.renec.foundation/).
- [http://solanabeach.io/](http://solanabeach.io/).

## Testnet

- Testnet is where we stress test recent release features on a live
  cluster, particularly focused on network performance, stability and validator
  behavior.
- Testnet tokens are **not real**
- Testnet may be subject to ledger resets.
- Testnet includes a token faucet for airdrops for application testing
- Testnet typically runs a newer software release than both Devnet and
  Mainnet Beta
- Gossip entrypoint for Testnet: `54.208.172.26:8001`
- Metrics environment variable for Testnet:

<!-- ```bash
export SOLANA_METRICS_CONFIG="host=https://metrics.solana.com:8086,db=tds,u=testnet_write,p=c4fa841aa918bf8274e3e2a44d77568d9861b3ea"
``` -->

- RPC URL for Testnet: `https://api-testnet.renec.foundation:8899`

##### Example `solana` command-line configuration

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
