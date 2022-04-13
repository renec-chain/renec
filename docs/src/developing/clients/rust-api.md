---
title: Rust API
---

Renec's Rust crates are [published to crates.io][crates.io] and can be found
[on docs.rs with the "solana-" prefix][docs.rs].

[crates.io]: https://crates.io/search?q=solana-
[docs.rs]: https://docs.rs/releases/search?query=solana-

Some important crates:

- [`solana-program`] &mdash; Imported by programs running on Renec, compiled
  to BPF. This crate contains many fundamental data types and is re-exported from
  [`solana-sdk`], which cannot be imported from a Renec program.

- [`solana-sdk`] &mdash; The basic off-chain SDK, it re-exports
  [`solana-program`] and adds more APIs on top of that. Most Renec programs
  that do not run on-chain will import this.

- [`solana-client`] &mdash; For interacting with a Renec node via the
  [JSON RPC API](jsonrpc-api).

- [`renec-cli-config`] &mdash; Loading and saving the Renec CLI configuration
  file.

- [`solana-clap-utils`] &mdash; Routines for setting up a CLI, using [`clap`],
  as used by the main Renec CLI.

[`solana-program`]: https://docs.rs/solana-program
[`solana-sdk`]: https://docs.rs/solana-sdk
[`solana-client`]: https://docs.rs/solana-client
[`renec-cli-config`]: https://docs.rs/renec-cli-config
[`solana-clap-utils`]: https://docs.rs/solana-clap-utils
[`clap`]: https://docs.rs/clap
