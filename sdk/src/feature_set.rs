//! Collection of all runtime features.
//!
//! Steps to add a new feature are outlined below. Note that these steps only cover
//! the process of getting a feature into the core Solana code.
//! - For features that are unambiguously good (ie bug fixes), these steps are sufficient.
//! - For features that should go up for community vote (ie fee structure changes), more
//!   information on the additional steps to follow can be found at:
//!   <https://spl.solana.com/feature-proposal#feature-proposal-life-cycle>
//!
//! 1. Generate a new keypair with `renec-keygen new --outfile feature.json --no-passphrase`
//!    - Keypairs should be held by core contributors only. If you're a non-core contributor going
//!      through these steps, the PR process will facilitate a keypair holder being picked. That
//!      person will generate the keypair, provide pubkey for PR, and ultimately enable the feature.
//! 2. Add a public module for the feature, specifying keypair pubkey as the id with
//!    `solana_sdk::declare_id!()` within the module.
//!    Additionally, add an entry to `FEATURE_NAMES` map.
//! 3. Add desired logic to check for and switch on feature availability.
//!
//! For more information on how features are picked up, see comments for `Feature`.

use {
    lazy_static::lazy_static,
    solana_sdk::{
        clock::Slot,
        hash::{Hash, Hasher},
        pubkey::Pubkey,
    },
    std::collections::{HashMap, HashSet},
};

pub mod deprecate_rewards_sysvar {
    solana_sdk::declare_id!("3GDdVRCiYGwnLqR2EJ8XzisHT7kP41nN4ZVoLtwNQ6uL");
}

pub mod pico_inflation {
    solana_sdk::declare_id!("78jCfVHLrfnSvY8xPTawKKQnSXsGq9WZjQCqud2NWngF");
}

pub mod full_inflation {
    pub mod devnet_and_testnet {
        solana_sdk::declare_id!("CzDvQF6zxiUKXcCXPDffHgd2edXbzR7PkR1vAd7jUYwu");
    }

    pub mod mainnet {
        pub mod certusone {
            pub mod vote {
                solana_sdk::declare_id!("9nEbnhhaEbGQuaMkWPxVyfotTMyk26Pj5zDH1tqoSMUD");
            }
            pub mod enable {
                solana_sdk::declare_id!("Drot3VLU6abB9ej86AxRYWnfQezp9YviVxso9pQ5Ws5t");
            }
        }
    }
}

pub mod secp256k1_program_enabled {
    solana_sdk::declare_id!("4s5DE4kowQMzgt1CqoeJUSBgYneyDYudZ6Qya7DKPi6H");
}

pub mod spl_token_v2_multisig_fix {
    solana_sdk::declare_id!("8g7mVqCe5k8a4xr8uAsSm2G4xr5RMpgkxZ9PAzUUqHTn");
}

pub mod no_overflow_rent_distribution {
    solana_sdk::declare_id!("iFdX2faagqrsoDrQm9AMdSNBSfRr388ofBBV8ztdLiQ");
}

pub mod filter_stake_delegation_accounts {
    solana_sdk::declare_id!("Hn8Ad22oNrz6fdRQ73xYQHmonrQ38GPo1NWM9sqp8GUi");
}

pub mod require_custodian_for_locked_stake_authorize {
    solana_sdk::declare_id!("AU5Emz45r1ZsKazwSd84EPUDXUmuCHAWVj18JGpWyr4w");
}

pub mod spl_token_v2_self_transfer_fix {
    solana_sdk::declare_id!("J6pvKeCdsFEt5uriXGHRwswmHoyTgA4BHPRL4KxY2ghy");
}

pub mod warp_timestamp_again {
    solana_sdk::declare_id!("6QNDK3foFi3nfaGmEkYgCkvsd2zoiWFC83vbF6MMHCYw");
}

pub mod check_init_vote_data {
    solana_sdk::declare_id!("GsGrMNxSFEC8EiKmVn5e87kTfnQrEMFmu1rXEqhL35pp");
}

pub mod secp256k1_recover_syscall_enabled {
    solana_sdk::declare_id!("6BM7ebq6hyqg2hCtTYmAp76NEb9Cntaxs7DsuavLmYAF");
}

pub mod system_transfer_zero_check {
    solana_sdk::declare_id!("5pvceZohr6NCLRf8mkJ5wDFBezh6MCmU8kjynicMZmUV");
}

pub mod blake3_syscall_enabled {
    solana_sdk::declare_id!("hcTDHX7Nivf7ZM979nZKuwqwM2bP5xijJ1eFoQe2h5B");
}

pub mod dedupe_config_program_signers {
    solana_sdk::declare_id!("AVCB68VsAR2Z5ZUhBb3fg3xu936qGSiXerfL67zrgFnk");
}

pub mod verify_tx_signatures_len {
    solana_sdk::declare_id!("H7ZDVqMq8cv6mYrZGShELZapWkPhE9os7WazuePs5xsN");
}

pub mod vote_stake_checked_instructions {
    solana_sdk::declare_id!("9fGxb6hmhPNNLeEEYv7VNZRAxms5JmvLU2XA4rUJtbRr");
}

pub mod neon_evm_compute_budget {
    solana_sdk::declare_id!("Gw4RDE8szEoHm4sHP3fEiubFsRcz6H8b97sAyhbhVYSi");
}

pub mod rent_for_sysvars {
    solana_sdk::declare_id!("EUEg1EUPEgMjQnPhHDfTnBzqAEbKpBVZpSX9rsZupcNa");
}

pub mod libsecp256k1_0_5_upgrade_enabled {
    solana_sdk::declare_id!("6MJutYmRrD4nPxkpDJwPym4w31GWZhuJV3mg5iVDYKiw");
}

pub mod tx_wide_compute_cap {
    solana_sdk::declare_id!("8VTuJHN8ajPzrYHpnrEoErj3o1bvyt4Suj2tmpgn6Uod");
}

pub mod spl_token_v2_set_authority_fix {
    solana_sdk::declare_id!("FoacArKgquZhLKL1vxxDhwP1zqAWRh3mWdqaZ8fsvpyN");
}

pub mod merge_nonce_error_into_system_error {
    solana_sdk::declare_id!("8UPzGMdrTehvaUvMXTbLfW89RuN6RoK5B4nZjZezogQY");
}

pub mod disable_fees_sysvar {
    solana_sdk::declare_id!("7N9DcvayChPooD5m61nHzWGLiiR4FsR5o7p8E9e2Nj39");
}

pub mod stake_merge_with_unmatched_credits_observed {
    solana_sdk::declare_id!("FRDLZKTvW1Laena9PeDWbBXTomcdoVBpnnSJWhs9GS8S");
}

pub mod gate_large_block {
    solana_sdk::declare_id!("4yrKLqDAm1TeP4U6taZGwadG5BRqDhziFso1WXA3XAty");
}

pub mod zk_token_sdk_enabled {
    solana_sdk::declare_id!("DJEYDGDRjzkwdn6tLBq8qsVnW58zptRTk9hB6peGvTfa");
}

pub mod curve25519_syscall_enabled {
    solana_sdk::declare_id!("8iqvGd7XwHam5DMguRjjDjf2P7xDPCYT9j96zeKzkzGS");
}

pub mod versioned_tx_message_enabled {
    solana_sdk::declare_id!("99SVuacpq1ruVrDBLh66YeUgjV2ZFKiNqS7roAmNZq26");
}

pub mod libsecp256k1_fail_on_bad_count {
    solana_sdk::declare_id!("9J5mZeWfDWTeqQMPbTGgrjTLXL8B9THGDMEySsGjJp1b");
}

pub mod libsecp256k1_fail_on_bad_count2 {
    solana_sdk::declare_id!("DZj98pDcHnGUmwBfGiw6CV9WC2yHogk7Yj4bS1M9nd1Z");
}

pub mod instructions_sysvar_owned_by_sysvar {
    solana_sdk::declare_id!("3947KD8xRZLJcgCDunR1CghhKfH3iPCnViGsYbLt6tWX");
}

pub mod stake_program_advance_activating_credits_observed {
    solana_sdk::declare_id!("6jm21H3vLkJw1WjTMu793zhwMF2ugqbkfxhUmbuKxyCv");
}

pub mod credits_auto_rewind {
    solana_sdk::declare_id!("BUS12ciZ5gCoFafUHWW8qaFMMtwFQGVxjsDheWLdqBE2");
}

pub mod demote_program_write_locks {
    solana_sdk::declare_id!("6pxLtjvzrrHoffDpG4D6GPjsouXgqJBjbE1j4kSkeHpm");
}

pub mod ed25519_program_enabled {
    solana_sdk::declare_id!("5Q5MHVjacSfJpNjUikzJdv8VTykP1huRihwk2LCVPgWz");
}

pub mod return_data_syscall_enabled {
    solana_sdk::declare_id!("9NfczuG87FwJ37UVeWdkarJ3EHmq3JYTctjNcmRvqg61");
}

pub mod reduce_required_deploy_balance {
    solana_sdk::declare_id!("CEeUc7UfoMUYrNgZEjwfvRmkXmwjxeLzttmaqhKXRpQD");
}

pub mod sol_log_data_syscall_enabled {
    solana_sdk::declare_id!("C9oNZrgUy18nLXfTgb2wUAjS21ApM6hY4iywAKeRaGdj");
}

pub mod stakes_remove_delegation_if_inactive {
    solana_sdk::declare_id!("3FX7x9Es3F67tcKY9TfpbQpK5NgMHMKRzL4vhRgLjrj9");
}

pub mod do_support_realloc {
    solana_sdk::declare_id!("6DL2teoENQ6xDpf8HfLfH3EdGsLQXrpL26Byj3QnKBWg");
}

// Note: when this feature is cleaned up, also remove the secp256k1 program from
// the list of builtins and remove its files from /programs
pub mod prevent_calling_precompiles_as_programs {
    solana_sdk::declare_id!("DXHPTtsjzBjbv8iPrGS49PSLsJ1u8g4ae6AZsULmJBEo");
}

pub mod optimize_epoch_boundary_updates {
    solana_sdk::declare_id!("B9aSQXd1SvjffwwqBDLQ63W7SGn4G2k4URbirWsZFeJs");
}

pub mod remove_native_loader {
    solana_sdk::declare_id!("8QoefjGbihNzB3NQrtFzBq6aATt4FsZwwegzk5cA4Xev");
}

pub mod send_to_tpu_vote_port {
    solana_sdk::declare_id!("CNhmiaAx4Mo21vd8XJ5g9XrSScLQBf7LjuUQ5KRb42UQ");
}

pub mod requestable_heap_size {
    solana_sdk::declare_id!("HkR1oXkKM54zc8R54YmLCenX718CgwnBoSTfc6ZA9m4e");
}

pub mod disable_fee_calculator {
    solana_sdk::declare_id!("9ujFdSfLrjwxkgCDHzjJZGcpNcCCC3kq8N3dqrDnL8C4");
}

pub mod add_compute_budget_program {
    solana_sdk::declare_id!("D1psb9LsHNkX3BeGjkxXuWxvoJkbuSgQb5ubSZ3NDwxM");
}

pub mod nonce_must_be_writable {
    solana_sdk::declare_id!("DZTzuGrhxu7VRBdVmwo7nkgCcFRVuQnHWEJQE239JUeP");
}

pub mod spl_token_v3_3_0_release {
    solana_sdk::declare_id!("DUw6SKZeybwLRsrTqFC62dWCZiUWB97t4EXaCkCGnBba");
}

pub mod leave_nonce_on_success {
    solana_sdk::declare_id!("Aat3q7hCToLuPs1rFm47K4xfbcVdxAXBzyiSgTsy4d6B");
}

pub mod reject_empty_instruction_without_program {
    solana_sdk::declare_id!("CzPLMUuonvx1Py8RHmmCfuSs8QWqf9gthyURLHS7abvx");
}

pub mod fixed_memcpy_nonoverlapping_check {
    solana_sdk::declare_id!("5VwwTc8sxfCxUAPgdbKVamq6VuiSMV1NfvzGEcuhz7TA");
}

pub mod reject_non_rent_exempt_vote_withdraws {
    solana_sdk::declare_id!("Abed3ZCxU5qNywhQYW8of1R3BqFxywUkMVeQtpXTzdog");
}

pub mod evict_invalid_stakes_cache_entries {
    solana_sdk::declare_id!("94PyFC57NVZpvmHtTRUtfFmpSYKAiKy9PEhgjiW9XPZs");
}

pub mod allow_votes_to_directly_update_vote_state {
    solana_sdk::declare_id!("7UrDd9e2Uhs1KDmBXfbcg2Y8wFZHxfXYCWafLjiTc6x");
}

pub mod cap_accounts_data_len {
    solana_sdk::declare_id!("DFfSTz6vCz5uApknD3jhsZqwBxbXvSrR9HXQH8Q7JUiw");
}

pub mod max_tx_account_locks {
    solana_sdk::declare_id!("9GYts7knzCXiihcRPdPPJAZ8YYrn4bbYaF15LBSQpbb1");
}

pub mod require_rent_exempt_accounts {
    solana_sdk::declare_id!("12rGaLvNmq511Pjv8FeR9KFE3suMP38g8uRwr3ssEc4g");
}

pub mod filter_votes_outside_slot_hashes {
    solana_sdk::declare_id!("7AY5EnhPzhQvds2jHzNxEzNdWwxKmJ2UksDrbnGSJHYp");
}

pub mod update_syscall_base_costs {
    solana_sdk::declare_id!("7EBmcxG1cbbGovgVggbApiL5svHmDAmHm2XzgezoWWoF");
}

pub mod stake_deactivate_delinquent_instruction {
    solana_sdk::declare_id!("437r62HoAdUb63amq3D7ENnBLDhHT2xY8eFkLJYVKK4x");
}

pub mod stake_redelegate_instruction {
    solana_sdk::declare_id!("3EPmAX94PvVJCjMeFfRFvj4avqCPL8vv3TGsZQg7ydMx");
}

pub mod vote_withdraw_authority_may_change_authorized_voter {
    solana_sdk::declare_id!("F5vxKthcJc9wbfehPq2s5muxuYV5PSjno3qTXCX8ribV");
}

pub mod spl_associated_token_account_v1_0_4 {
    solana_sdk::declare_id!("2TyaRQUxJFXS6RSTCHzp9ZksEmaogXv7zhL9gmRkheSv");
}

pub mod reject_vote_account_close_unless_zero_credit_epoch {
    solana_sdk::declare_id!("CZhb67Yp51xFHzzP4aoaX648mT13onoYX4Pjuvqqc3u2");
}

pub mod add_get_processed_sibling_instruction_syscall {
    solana_sdk::declare_id!("Gmkp3ZLLK4iP5bWZtS3od65u1vFn8F59ahmh2Vprnmt1");
}

pub mod bank_tranaction_count_fix {
    solana_sdk::declare_id!("DzBRbav7X9hHXWg745Fi4qzic6MYXxeu5WTrFvJAWXyC");
}

pub mod disable_bpf_deprecated_load_instructions {
    solana_sdk::declare_id!("DF2zVXQ5XwP44dUdP9hzvA8KCs8juLaG2rzJdLLBBEMG");
}

pub mod disable_bpf_unresolved_symbols_at_runtime {
    solana_sdk::declare_id!("gtvAkkpEXyMLAFhYCfdHPGyTKdkN3Wexp4n9GrkxVGV");
}

pub mod record_instruction_in_transaction_context_push {
    solana_sdk::declare_id!("AfBmQr62B5xWsPEuHWUxd4chr9MyG8GYhh4dJmKfZ8fa");
}

pub mod syscall_saturated_math {
    solana_sdk::declare_id!("96F5fnRVfMWJ75uZgKn4P738ciYRGXPuN7oVBzhqbZDN");
}

pub mod check_physical_overlapping {
    solana_sdk::declare_id!("B8cG7dV8tw95GN8B8KetUAFLfydiX8cHaaw3joxBd9uh");
}

pub mod limit_secp256k1_recovery_id {
    solana_sdk::declare_id!("4DvgaSeNnrmHLQMLiP3h1b847u9tcXQqQYea8mczwuXt");
}

pub mod disable_deprecated_loader {
    solana_sdk::declare_id!("5msnbbAkuWmdZRF189BCB4qrDWMoXan5u6tfomjHX5XK");
}

pub mod check_slice_translation_size {
    solana_sdk::declare_id!("GmC19j9qLn2RFk5NduX6QXaDhVpGncVVBzyM8e9WMz2F");
}

pub mod stake_split_uses_rent_sysvar {
    solana_sdk::declare_id!("FQnc7U4koHqWgRvFaBJjZnV8VPg6L6wWK33yJeDp4yvV");
}

pub mod add_get_minimum_delegation_instruction_to_stake_program {
    solana_sdk::declare_id!("St8k9dVXP97xT6faW24YmRSYConLbhsMJA4TJTBLmMT");
}

pub mod error_on_syscall_bpf_function_hash_collisions {
    solana_sdk::declare_id!("8199Q2gMD2kwgfopK5qqVWuDbegLgpuFUFHCcUJQDN8b");
}

pub mod reject_callx_r10 {
    solana_sdk::declare_id!("3NKRSwpySNwD3TvP5pHnRmkAQRsdkXWRr1WaQh8p4PWX");
}

pub mod drop_redundant_turbine_path {
    solana_sdk::declare_id!("75sGdS3d5gNGFBjTQQ2QN8EymkZmveF55j3uDKh2rvmk");
}

pub mod executables_incur_cpi_data_cost {
    solana_sdk::declare_id!("7GUcYgq4tVtaqNCKT3dho9r4665Qp5TxCZ27Qgjx3829");
}

pub mod fix_recent_blockhashes {
    solana_sdk::declare_id!("6iyggb5MTcsvdcugX7bEKbHV8c6jdLbpHwkncrgLMhfo");
}

pub mod update_rewards_from_cached_accounts {
    solana_sdk::declare_id!("28s7i3htzhahXQKqmS2ExzbEoUypg9krwvtK2M9UWXh9");
}

pub mod spl_token_v3_4_0 {
    solana_sdk::declare_id!("Cx9VnNci9N77erfw9NAuKj1Pz6o5UYzbVDjJgoFiTwzA");
}

pub mod spl_associated_token_account_v1_1_0 {
    solana_sdk::declare_id!("32nPQwC5pUgikReHM1xb94shzLJe6pfpxCb7tbU7ECEc");
}

pub mod default_units_per_instruction {
    solana_sdk::declare_id!("751c991npTMY5yA1CjjY13tzxVAT6waMuQa4mwEVe9mE");
}

pub mod stake_allow_zero_undelegated_amount {
    solana_sdk::declare_id!("Bbq2jCCbJQ3C2nhuXu8SX2YPUZVbbvJ86DhFD8wXP931");
}

pub mod require_static_program_ids_in_transaction {
    solana_sdk::declare_id!("3UbL8kjAfBgzSbSMgD9PsgDeK64TEy6hzwDxSauXGcbx");
}

pub mod stake_raise_minimum_delegation_to_1_sol {
    // This is a feature-proposal *feature id*.  The feature keypair address is `3YHAo6wWw5rDbQxb59BmJkQ3XwVhX3m8tdBVbtxnJmma`.
    solana_sdk::declare_id!("4xmyBuR2VCXzy9H6qYpH9ckfgnTuMDQFPFBfTs4eBCY1");
}

pub mod stake_minimum_delegation_for_rewards {
    solana_sdk::declare_id!("ELjxSXwNsyXGfAh8TqX8ih22xeT8huF6UngQirbLKYKH");
}

pub mod add_set_compute_unit_price_ix {
    solana_sdk::declare_id!("HaCFzkLUJUSQisH7q594sLJTARnM7y4hFvb6Bvbyz1wC");
}

pub mod disable_deploy_of_alloc_free_syscall {
    solana_sdk::declare_id!("79HWsX9rpnnJBPcdNURVqygpMAfxdrAirzAGAVmf92im");
}

pub mod include_account_index_in_rent_error {
    solana_sdk::declare_id!("3z72fSMRMEtESz3VdDtWaV5WNwu7PtGA1YBfHxjBzDiD");
}

pub mod add_shred_type_to_shred_seed {
    solana_sdk::declare_id!("Et5a4ZGGoP1KVnnBbe8KrgcSMvjJkBFgLNg64qB2WhBq");
}

pub mod warp_timestamp_with_a_vengeance {
    solana_sdk::declare_id!("aiBU2fxy3uwCkHjCUZ7Di4Yt52Fijimh1Fnkyd1Gtwx");
}

pub mod separate_nonce_from_blockhash {
    solana_sdk::declare_id!("WxvSUp6PxjEsVoe6TRpW4RNEWFxxaRJnwbHGYAbtKiZ");
}

pub mod enable_durable_nonce {
    solana_sdk::declare_id!("7dKstdL2VVEDnBzTq45fpQnaK8t9nk2UYD3RsnbR1zgM");
}

pub mod vote_state_update_credit_per_dequeue {
    solana_sdk::declare_id!("9HPWyLWyBh6iTKNNWmefQZuVgmCGq5aUwZcEMB6wNZcT");
}

pub mod executables_incur_cpi_data_cost {
    solana_sdk::declare_id!("AzhDHwZ3ZGgxpFwCCNc1iRJMVtPoH732JxKdGTxHTL2y");
}

pub mod quick_bail_on_panic {
    solana_sdk::declare_id!("AJGRRZA766HJbqGw3Ypca5fegK3YC6hMFY7zhpXoftQ5");
}

pub mod nonce_must_be_authorized {
    solana_sdk::declare_id!("6YgXgt549ryFMR1AzSHaDLxnfw4XdE7Mpc65sxbgRxTQ");
}

pub mod nonce_must_be_advanceable {
    solana_sdk::declare_id!("CWLpm3qEj3N89vqu7iBEAXM5nUp1uoz5t3AtqxzE1upH");
}

pub mod vote_authorize_with_seed {
    solana_sdk::declare_id!("BajzCawKrKiTD6tMrMfDDJx1wRujLNRRQBpERqwcRh54");
}

pub mod cap_accounts_data_size_per_block {
    solana_sdk::declare_id!("25Mh5eSYkC9sj2uWPFJqS4LJzVZpJxvcsNuJZTWB2tf3");
}

pub mod preserve_rent_epoch_for_rent_exempt_accounts {
    solana_sdk::declare_id!("51XV6fVPo8uatk5UniTPcWztxXycwP4ochbS1dxRWwFL");
}

pub mod enable_bpf_loader_extend_program_ix {
    solana_sdk::declare_id!("8Zs9W7D9MpSEtUWSQdGniZk2cNmV22y6FLJwCx53asme");
}

pub mod enable_early_verification_of_account_modifications {
    solana_sdk::declare_id!("7Vced912WrRnfjaiKRiNBcbuFw7RrnLv3E3z95Y4GTNc");
}

pub mod prevent_crediting_accounts_that_end_rent_paying {
    solana_sdk::declare_id!("ChpGabXXtKucGJahQTKcG8nSotXDY8qfkCvowVjC7LHN");
}

pub mod cap_bpf_program_instruction_accounts {
    solana_sdk::declare_id!("9k5ijzTbYPtjzu8wj2ErH9v45xecHzQ1x4PMYMMxFgdM");
}

pub mod loosen_cpi_size_restriction {
    solana_sdk::declare_id!("GDH5TVdbTPUpRnXaRyQqiKUa7uZAbZ28Q2N9bhbKoMLm");
}

pub mod use_default_units_in_fee_calculation {
    solana_sdk::declare_id!("8sKQrMQoUHtQSUP83SPG4ta2JDjSAiWs7t5aJ9uEd6To");
}

pub mod compact_vote_state_updates {
    solana_sdk::declare_id!("86HpNqzutEZwLcPxS6EHDcMNYWk6ikhteg9un7Y2PBKE");
}

pub mod concurrent_replay_of_forks {
    solana_sdk::declare_id!("9F2Dcu8xkBPKxiiy65XKPZYdCG3VZDpjDTuSmeYLozJe");
}

pub mod incremental_snapshot_only_incremental_hash_calculation {
    solana_sdk::declare_id!("25vqsfjk7Nv1prsQJmA4Xu1bN61s8LXCBGUPp8Rfy1UF");
}

pub mod vote_state_update_root_fix {
    solana_sdk::declare_id!("G74BkWBzmsByZ1kxHy44H3wjwp5hp7JbrGRuDpco22tY");
}

pub mod return_none_for_zero_lamport_accounts {
    solana_sdk::declare_id!("RQqrrAqXFzvfbg2uMnKadixa9AxeFpddvExWLhL1BAM");
}

pub mod disable_rehash_for_rent_epoch {
    solana_sdk::declare_id!("DTVTkmw3JSofd8CJVJte8PXEbxNQ2yZijvVr3pe2APPj");
}

pub mod on_load_preserve_rent_epoch_for_rent_exempt_accounts {
    solana_sdk::declare_id!("CpkdQmspsaZZ8FVAouQTtTWZkc8eeQ7V3uj7dWz543rZ");
}

pub mod increase_tx_account_lock_limit {
    solana_sdk::declare_id!("GZGMs9dCQC7rBnp8VGn37GJRFdAoHVcwtAC3N66A2qTt");
}

pub mod check_syscall_outputs_do_not_overlap {
    solana_sdk::declare_id!("Emk7wDKRBqW451FVCz9BWPmHHLFwQmo5cmGsL88birvQ");
}

pub mod commission_updates_only_allowed_in_first_half_of_epoch {
    solana_sdk::declare_id!("noRuG2kzACwgaY7TVmLRnUNPLKNVQE1fb7X55YWBehp");
}

pub mod enable_turbine_fanout_experiments {
    solana_sdk::declare_id!("D31EFnLgdiysi84Woo3of4JMu7VmasUS3Z7j9HYXCeLY");
}

pub mod disable_turbine_fanout_experiments {
    solana_sdk::declare_id!("Gz1aLrbeQ4Q6PTSafCZcGWZXz91yVRi7ASFzFEr1U4sa");
}

pub mod drop_merkle_shreds {
    solana_sdk::declare_id!("84zy5N23Q9vTZuLc9h1HWUtyM9yCFV2SCmyP9W9C3yHZ");
}

pub mod keep_merkle_shreds {
    solana_sdk::declare_id!("HyNQzc7TMNmRhpVHXqDGjpsHzeQie82mDQXSF9hj7nAH");
}

pub mod move_serialized_len_ptr_in_cpi {
    solana_sdk::declare_id!("74CoWuBmt3rUVUrCb2JiSTvh6nXyBWUsK4SaMj3CtE3T");
}

pub mod enable_request_heap_frame_ix {
    solana_sdk::declare_id!("Hr1nUA9b7NJ6eChS26o7Vi8gYYDDwWD3YeBfzJkTbU86");
}

lazy_static! {
    /// Map of feature identifiers to user-visible description
    pub static ref FEATURE_NAMES: HashMap<Pubkey, &'static str> = [
        (secp256k1_program_enabled::id(), "secp256k1 program"),
        (deprecate_rewards_sysvar::id(), "deprecate unused rewards sysvar"),
        (pico_inflation::id(), "pico inflation"),
        (full_inflation::devnet_and_testnet::id(), "full inflation on devnet and testnet"),
        (spl_token_v2_multisig_fix::id(), "spl-token multisig fix"),
        (no_overflow_rent_distribution::id(), "no overflow rent distribution"),
        (filter_stake_delegation_accounts::id(), "filter stake_delegation_accounts #14062"),
        (require_custodian_for_locked_stake_authorize::id(), "require custodian to authorize withdrawer change for locked stake"),
        (spl_token_v2_self_transfer_fix::id(), "spl-token self-transfer fix"),
        (full_inflation::mainnet::certusone::enable::id(), "full inflation enabled by Certus One"),
        (full_inflation::mainnet::certusone::vote::id(), "community vote allowing Certus One to enable full inflation"),
        (warp_timestamp_again::id(), "warp timestamp again, adjust bounding to 25% fast 80% slow #15204"),
        (check_init_vote_data::id(), "check initialized Vote data"),
        (secp256k1_recover_syscall_enabled::id(), "secp256k1_recover syscall"),
        (system_transfer_zero_check::id(), "perform all checks for transfers of 0 lamports"),
        (blake3_syscall_enabled::id(), "blake3 syscall"),
        (dedupe_config_program_signers::id(), "dedupe config program signers"),
        (verify_tx_signatures_len::id(), "prohibit extra transaction signatures"),
        (vote_stake_checked_instructions::id(), "vote/state program checked instructions #18345"),
        (rent_for_sysvars::id(), "collect rent from accounts owned by sysvars"),
        (libsecp256k1_0_5_upgrade_enabled::id(), "upgrade libsecp256k1 to v0.5.0"),
        (tx_wide_compute_cap::id(), "transaction wide compute cap"),
        (spl_token_v2_set_authority_fix::id(), "spl-token set_authority fix"),
        (merge_nonce_error_into_system_error::id(), "merge NonceError into SystemError"),
        (disable_fees_sysvar::id(), "disable fees sysvar"),
        (stake_merge_with_unmatched_credits_observed::id(), "allow merging active stakes with unmatched credits_observed #18985"),
        (zk_token_sdk_enabled::id(), "enable Zk Token proof program and syscalls"),
        (curve25519_syscall_enabled::id(), "enable curve25519 syscalls"),
        (versioned_tx_message_enabled::id(), "enable versioned transaction message processing"),
        (libsecp256k1_fail_on_bad_count::id(), "fail libsec256k1_verify if count appears wrong"),
        (libsecp256k1_fail_on_bad_count2::id(), "fail libsec256k1_verify if count appears wrong"),
        (instructions_sysvar_owned_by_sysvar::id(), "fix owner for instructions sysvar"),
        (stake_program_advance_activating_credits_observed::id(), "Enable advancing credits observed for activation epoch #19309"),
        (credits_auto_rewind::id(), "Auto rewind stake's credits_observed if (accidental) vote recreation is detected #22546"),
        (demote_program_write_locks::id(), "demote program write locks to readonly, except when upgradeable loader present #19593 #20265"),
        (ed25519_program_enabled::id(), "enable builtin ed25519 signature verify program"),
        (return_data_syscall_enabled::id(), "enable sol_{set,get}_return_data syscall"),
        (reduce_required_deploy_balance::id(), "reduce required payer balance for program deploys"),
        (sol_log_data_syscall_enabled::id(), "enable sol_log_data syscall"),
        (stakes_remove_delegation_if_inactive::id(), "remove delegations from stakes cache when inactive"),
        (do_support_realloc::id(), "support account data reallocation"),
        (prevent_calling_precompiles_as_programs::id(), "prevent calling precompiles as programs"),
        (optimize_epoch_boundary_updates::id(), "optimize epoch boundary updates"),
        (remove_native_loader::id(), "remove support for the native loader"),
        (send_to_tpu_vote_port::id(), "send votes to the tpu vote port"),
        (requestable_heap_size::id(), "Requestable heap frame size"),
        (disable_fee_calculator::id(), "deprecate fee calculator"),
        (add_compute_budget_program::id(), "Add compute_budget_program"),
        (nonce_must_be_writable::id(), "nonce must be writable"),
        (spl_token_v3_3_0_release::id(), "spl-token v3.3.0 release"),
        (leave_nonce_on_success::id(), "leave nonce as is on success"),
        (reject_empty_instruction_without_program::id(), "fail instructions which have native_loader as program_id directly"),
        (fixed_memcpy_nonoverlapping_check::id(), "use correct check for nonoverlapping regions in memcpy syscall"),
        (reject_non_rent_exempt_vote_withdraws::id(), "fail vote withdraw instructions which leave the account non-rent-exempt"),
        (evict_invalid_stakes_cache_entries::id(), "evict invalid stakes cache entries on epoch boundaries"),
        (allow_votes_to_directly_update_vote_state::id(), "enable direct vote state update"),
        (cap_accounts_data_len::id(), "cap the accounts data len"),
        (max_tx_account_locks::id(), "enforce max number of locked accounts per transaction"),
        (require_rent_exempt_accounts::id(), "require all new transaction accounts with data to be rent-exempt"),
        (filter_votes_outside_slot_hashes::id(), "filter vote slots older than the slot hashes history"),
        (update_syscall_base_costs::id(), "update syscall base costs"),
        (stake_deactivate_delinquent_instruction::id(), "enable the deactivate delinquent stake instruction #23932"),
        (vote_withdraw_authority_may_change_authorized_voter::id(), "vote account withdraw authority may change the authorized voter #22521"),
        (spl_associated_token_account_v1_0_4::id(), "SPL Associated Token Account Program release version 1.0.4, tied to token 3.3.0 #22648"),
        (reject_vote_account_close_unless_zero_credit_epoch::id(), "fail vote account withdraw to 0 unless account earned 0 credits in last completed epoch"),
        (add_get_processed_sibling_instruction_syscall::id(), "add add_get_processed_sibling_instruction_syscall"),
        (bank_tranaction_count_fix::id(), "fixes Bank::transaction_count to include all committed transactions, not just successful ones"),
        (disable_bpf_deprecated_load_instructions::id(), "disable ldabs* and ldind* BPF instructions"),
        (disable_bpf_unresolved_symbols_at_runtime::id(), "disable reporting of unresolved BPF symbols at runtime"),
        (record_instruction_in_transaction_context_push::id(), "move the CPI stack overflow check to the end of push"),
        (syscall_saturated_math::id(), "syscalls use saturated math"),
        (check_physical_overlapping::id(), "check physical overlapping regions"),
        (limit_secp256k1_recovery_id::id(), "limit secp256k1 recovery id"),
        (disable_deprecated_loader::id(), "disable the deprecated BPF loader"),
        (check_slice_translation_size::id(), "check size when translating slices"),
        (stake_split_uses_rent_sysvar::id(), "stake split instruction uses rent sysvar"),
        (add_get_minimum_delegation_instruction_to_stake_program::id(), "add GetMinimumDelegation instruction to stake program"),
        (error_on_syscall_bpf_function_hash_collisions::id(), "error on bpf function hash collisions"),
        (reject_callx_r10::id(), "Reject bpf callx r10 instructions"),
        (drop_redundant_turbine_path::id(), "drop redundant turbine path"),
        (executables_incur_cpi_data_cost::id(), "Executables incur CPI data costs"),
        (fix_recent_blockhashes::id(), "stop adding hashes for skipped slots to recent blockhashes"),
        (update_rewards_from_cached_accounts::id(), "update rewards from cached accounts"),
        (spl_token_v3_4_0::id(), "SPL Token Program version 3.4.0 release #24740"),
        (spl_associated_token_account_v1_1_0::id(), "SPL Associated Token Account Program version 1.1.0 release #24741"),
        (default_units_per_instruction::id(), "Default max tx-wide compute units calculated per instruction"),
        (stake_allow_zero_undelegated_amount::id(), "Allow zero-lamport undelegated amount for initialized stakes #24670"),
        (require_static_program_ids_in_transaction::id(), "require static program ids in versioned transactions"),
        (stake_raise_minimum_delegation_to_1_sol::id(), "Raise minimum stake delegation to 1.0 SOL #24357"),
        (stake_minimum_delegation_for_rewards::id(), "stakes must be at least the minimum delegation to earn rewards"),
        (add_set_compute_unit_price_ix::id(), "add compute budget ix for setting a compute unit price"),
        (disable_deploy_of_alloc_free_syscall::id(), "disable new deployments of deprecated sol_alloc_free_ syscall"),
        (include_account_index_in_rent_error::id(), "include account index in rent tx error #25190"),
        (add_shred_type_to_shred_seed::id(), "add shred-type to shred seed #25556"),
        (warp_timestamp_with_a_vengeance::id(), "warp timestamp again, adjust bounding to 150% slow #25666"),
        (separate_nonce_from_blockhash::id(), "separate durable nonce and blockhash domains #25744"),
        (enable_durable_nonce::id(), "enable durable nonce #25744"),
        (vote_state_update_credit_per_dequeue::id(), "Calculate vote credits for VoteStateUpdate per vote dequeue to match credit awards for Vote instruction"),
        (quick_bail_on_panic::id(), "quick bail on panic"),
        (nonce_must_be_authorized::id(), "nonce must be authorized"),
        (nonce_must_be_advanceable::id(), "durable nonces must be advanceable"),
        (vote_authorize_with_seed::id(), "An instruction you can use to change a vote accounts authority when the current authority is a derived key #25860"),
        (cap_accounts_data_size_per_block::id(), "cap the accounts data size per block #25517"),
        (stake_redelegate_instruction::id(), "enable the redelegate stake instruction #26294"),
        (preserve_rent_epoch_for_rent_exempt_accounts::id(), "preserve rent epoch for rent exempt accounts #26479"),
        (enable_bpf_loader_extend_program_ix::id(), "enable bpf upgradeable loader ExtendProgram instruction #25234"),
        (enable_early_verification_of_account_modifications::id(), "enable early verification of account modifications #25899"),
        (disable_rehash_for_rent_epoch::id(), "on accounts hash calculation, do not try to rehash accounts #28934"),
        (on_load_preserve_rent_epoch_for_rent_exempt_accounts::id(), "on bank load account, do not try to fix up rent_epoch #28541"),
        (prevent_crediting_accounts_that_end_rent_paying::id(), "prevent crediting rent paying accounts #26606"),
        (cap_bpf_program_instruction_accounts::id(), "enforce max number of accounts per bpf program instruction #26628"),
        (loosen_cpi_size_restriction::id(), "loosen cpi size restrictions #26641"),
        (use_default_units_in_fee_calculation::id(), "use default units per instruction in fee calculation #26785"),
        (compact_vote_state_updates::id(), "Compact vote state updates to lower block size"),
        (concurrent_replay_of_forks::id(), "Allow slots from different forks to be replayed concurrently #26465"),
        (incremental_snapshot_only_incremental_hash_calculation::id(), "only hash accounts in incremental snapshot during incremental snapshot creation #26799"),
        (vote_state_update_root_fix::id(), "fix root in vote state updates #27361"),
        (return_none_for_zero_lamport_accounts::id(), "return none for zero lamport accounts #27800"),
        (increase_tx_account_lock_limit::id(), "increase tx account lock limit to 128 #27241"),
        (check_syscall_outputs_do_not_overlap::id(), "check syscall outputs do_not overlap #28600"),
        (commission_updates_only_allowed_in_first_half_of_epoch::id(), "validator commission updates are only allowed in the first half of an epoch #29362"),
        (enable_turbine_fanout_experiments::id(), "enable turbine fanout experiments #29393"),
        (disable_turbine_fanout_experiments::id(), "disable turbine fanout experiments #29393"),
        (drop_merkle_shreds::id(), "drop merkle shreds #29711"),
        (keep_merkle_shreds::id(), "keep merkle shreds #29711"),
        (move_serialized_len_ptr_in_cpi::id(), "cpi ignore serialized_len_ptr #29592"),
        (enable_request_heap_frame_ix::id(), "Enable transaction to request heap frame using compute budget instruction #30076"),
        /*************** ADD NEW FEATURES HERE ***************/
    ]
    .iter()
    .cloned()
    .collect();

    /// Unique identifier of the current software's feature set
    pub static ref ID: Hash = {
        let mut hasher = Hasher::default();
        let mut feature_ids = FEATURE_NAMES.keys().collect::<Vec<_>>();
        feature_ids.sort();
        for feature in feature_ids {
            hasher.hash(feature.as_ref());
        }
        hasher.result()
    };
}

#[derive(Clone, PartialEq, Eq, Hash)]
pub struct FullInflationFeaturePair {
    pub vote_id: Pubkey, // Feature that grants the candidate the ability to enable full inflation
    pub enable_id: Pubkey, // Feature to enable full inflation by the candidate
}

lazy_static! {
    /// Set of feature pairs that once enabled will trigger full inflation
    pub static ref FULL_INFLATION_FEATURE_PAIRS: HashSet<FullInflationFeaturePair> = [
        FullInflationFeaturePair {
            vote_id: full_inflation::mainnet::certusone::vote::id(),
            enable_id: full_inflation::mainnet::certusone::enable::id(),
        },
    ]
    .iter()
    .cloned()
    .collect();
}

/// `FeatureSet` holds the set of currently active/inactive runtime features
#[derive(AbiExample, Debug, Clone)]
pub struct FeatureSet {
    pub active: HashMap<Pubkey, Slot>,
    pub inactive: HashSet<Pubkey>,
}
impl Default for FeatureSet {
    fn default() -> Self {
        // All features disabled
        Self {
            active: HashMap::new(),
            inactive: FEATURE_NAMES.keys().cloned().collect(),
        }
    }
}
impl FeatureSet {
    pub fn is_active(&self, feature_id: &Pubkey) -> bool {
        self.active.contains_key(feature_id)
    }

    pub fn activated_slot(&self, feature_id: &Pubkey) -> Option<Slot> {
        self.active.get(feature_id).copied()
    }

    /// List of enabled features that trigger full inflation
    pub fn full_inflation_features_enabled(&self) -> HashSet<Pubkey> {
        let mut hash_set = FULL_INFLATION_FEATURE_PAIRS
            .iter()
            .filter_map(|pair| {
                if self.is_active(&pair.vote_id) && self.is_active(&pair.enable_id) {
                    Some(pair.enable_id)
                } else {
                    None
                }
            })
            .collect::<HashSet<_>>();

        if self.is_active(&full_inflation::devnet_and_testnet::id()) {
            hash_set.insert(full_inflation::devnet_and_testnet::id());
        }
        hash_set
    }

    /// All features enabled, useful for testing
    pub fn all_enabled() -> Self {
        Self {
            active: FEATURE_NAMES.keys().cloned().map(|key| (key, 0)).collect(),
            inactive: HashSet::new(),
        }
    }

    /// Activate a feature
    pub fn activate(&mut self, feature_id: &Pubkey, slot: u64) {
        self.inactive.remove(feature_id);
        self.active.insert(*feature_id, slot);
    }

    /// Deactivate a feature
    pub fn deactivate(&mut self, feature_id: &Pubkey) {
        self.active.remove(feature_id);
        self.inactive.insert(*feature_id);
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_full_inflation_features_enabled_devnet_and_testnet() {
        let mut feature_set = FeatureSet::default();
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::devnet_and_testnet::id(), 42);
        assert_eq!(
            feature_set.full_inflation_features_enabled(),
            [full_inflation::devnet_and_testnet::id()]
                .iter()
                .cloned()
                .collect()
        );
    }

    #[test]
    fn test_full_inflation_features_enabled() {
        // Normal sequence: vote_id then enable_id
        let mut feature_set = FeatureSet::default();
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::vote::id(), 42);
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::enable::id(), 42);
        assert_eq!(
            feature_set.full_inflation_features_enabled(),
            [full_inflation::mainnet::certusone::enable::id()]
                .iter()
                .cloned()
                .collect()
        );

        // Backwards sequence: enable_id and then vote_id
        let mut feature_set = FeatureSet::default();
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::enable::id(), 42);
        assert!(feature_set.full_inflation_features_enabled().is_empty());
        feature_set
            .active
            .insert(full_inflation::mainnet::certusone::vote::id(), 42);
        assert_eq!(
            feature_set.full_inflation_features_enabled(),
            [full_inflation::mainnet::certusone::enable::id()]
                .iter()
                .cloned()
                .collect()
        );
    }

    #[test]
    fn test_feature_set_activate_deactivate() {
        let mut feature_set = FeatureSet::default();

        let feature = Pubkey::new_unique();
        assert!(!feature_set.is_active(&feature));
        feature_set.activate(&feature, 0);
        assert!(feature_set.is_active(&feature));
        feature_set.deactivate(&feature);
        assert!(!feature_set.is_active(&feature));
    }
}
