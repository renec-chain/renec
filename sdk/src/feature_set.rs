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
    solana_sdk::declare_id!("A3Wtikt95SmCiyeUV7NJxdcqMLLHadfvZz1z4XMR3XdK");
}

pub mod pico_inflation {
    solana_sdk::declare_id!("Bi8r1dDXME3t6G73y67rWAJjpHE6mZ4rbEQrbiKJbfMC");
}

pub mod full_inflation {
    pub mod devnet_and_testnet {
        solana_sdk::declare_id!("DAihtGVYW41CWe8QABGYBx9F7W5wbqGe2WPexdo39CAU");
    }

    pub mod mainnet {
        pub mod certusone {
            pub mod vote {
                solana_sdk::declare_id!("7MTNGY37sCVPR7qEKGXcK6fZTzAJkhA45FTtj7V2jFpc");
            }
            pub mod enable {
                solana_sdk::declare_id!("7uDczEfGi6UDcSTtt8sisNuk1a57iGQtaAM4SXgwq5rG");
            }
        }
    }
}

pub mod secp256k1_program_enabled {
    solana_sdk::declare_id!("BqE9PHFnY3EVqsSn57ZofAU3x8g6MRYQj7ZZR6BNHfVV");
}

pub mod spl_token_v2_multisig_fix {
    solana_sdk::declare_id!("2VTk44ztGcwdF86S4axiSDeWaD95MGKGUnaiYyT4A9rz");
}

pub mod no_overflow_rent_distribution {
    solana_sdk::declare_id!("A5mLanHAcCwUopGfHuXJuqAYG6fx1QFFKt4AV76tNoYj");
}

pub mod filter_stake_delegation_accounts {
    solana_sdk::declare_id!("7GqaeTV9hCs623k2JaAu5tZPqpJyFwJyA28P9WDfr2Jy");
}

pub mod require_custodian_for_locked_stake_authorize {
    solana_sdk::declare_id!("F35YZmRT3oxK6tk7VqZqukMTvDuqYMopBLmeg4jHPmyh");
}

pub mod spl_token_v2_self_transfer_fix {
    solana_sdk::declare_id!("C4BcXP9S6d4DKq5aMGHiaS15KwNSxMWffaMnV675zU2f");
}

pub mod warp_timestamp_again {
    solana_sdk::declare_id!("7LmznBYNRPgKcdbZBxvJeDHA9PWd58GVAJCzVf6UUycf");
}

pub mod check_init_vote_data {
    solana_sdk::declare_id!("5VsFYGwmdJTYBcqVaRGg51n7Gq8W8rBtR9DTL2Ewg94d");
}

pub mod secp256k1_recover_syscall_enabled {
    solana_sdk::declare_id!("F72eKkD1P49iD8BMR5SxgmgbAk8BQzYMK4KRni6stPK8");
}

pub mod system_transfer_zero_check {
    solana_sdk::declare_id!("6zgAKYFJeBpMHFbWCYhqhNzvk3geYZ8Jb9cymHDeQNKp");
}

pub mod blake3_syscall_enabled {
    solana_sdk::declare_id!("ANDD31KABspCNTov59fzsFQCP5KqVUUX8spWKto3bMaj");
}

pub mod dedupe_config_program_signers {
    solana_sdk::declare_id!("7b9d9LztJz5JhbKMMSSHpbj3gcAahpiegSifPrNJbmBS");
}

pub mod verify_tx_signatures_len {
    solana_sdk::declare_id!("59PrgpfNBiimRHcw2Mo9oNnaoiqEk5XDVDcw9XoJ1fDr");
}

pub mod vote_stake_checked_instructions {
    solana_sdk::declare_id!("6E6h8txEwpwEecer6kQ1oUetKuvUqwP5k3DTNQdhxBeM");
}

pub mod neon_evm_compute_budget {
    solana_sdk::declare_id!("NMZVSufYby3qgkXi1SmnyqiTn3b8cDmUfEwSXvQiFcW");
}

pub mod rent_for_sysvars {
    solana_sdk::declare_id!("8tiG3LKw7bRLSgctmRdKuq8ejfkkgQjjakaA95q6Qyhq");
}

pub mod libsecp256k1_0_5_upgrade_enabled {
    solana_sdk::declare_id!("Gfd7ZoD4JCUmYaSg4jRTJEhjL4CUV3j3yeatFWiRH6D2");
}

pub mod tx_wide_compute_cap {
    solana_sdk::declare_id!("Fhz4NZctZeHsQHZt6ajUPfsARBGfDkgT7iNSwoZrxVzv");
}

pub mod spl_token_v2_set_authority_fix {
    solana_sdk::declare_id!("7EtabcVR37DWoSWg9KcNE8kEKsbAv46i9SJa2AGZBtdi");
}

pub mod merge_nonce_error_into_system_error {
    solana_sdk::declare_id!("HZbFpcugg81gpA61LkKeBQgkcS7qQPTreA2G1VGWx9ef");
}

pub mod disable_fees_sysvar {
    solana_sdk::declare_id!("2gQxsDAdhJ1BwsQnTvbszMSKVpWGFhLTSWb5Nim6mqbj");
}

pub mod stake_merge_with_unmatched_credits_observed {
    solana_sdk::declare_id!("4aJzVF3tXnpRxjUUEwGRTUDmovPkFu8cVdEAZnsc9Zcz");
}

pub mod gate_large_block {
    solana_sdk::declare_id!("FueNYnxku4M41duLfZn2BZ5PCNtJoN4bMKz75tgFkY8r");
}

pub mod zk_token_sdk_enabled {
    solana_sdk::declare_id!("NJRzpm48pjUeBK3ZZXZEcF6NMhoFjWrhkkDUZLrAvaV");
}

pub mod curve25519_syscall_enabled {
    solana_sdk::declare_id!("AXAQpJYC4Uqv9Z28SpEE7DtLfieiHpDboxAkEmUVTFEj");
}

pub mod versioned_tx_message_enabled {
    solana_sdk::declare_id!("5UQMU7Vm6yS9ZXmFvznpP38aqdAEHUoEpvjbHDt3ebzY");
}

pub mod libsecp256k1_fail_on_bad_count {
    solana_sdk::declare_id!("C56t1ExhFzXLopUqPkbkxLqsCtgC17B4F2W2SKZ7gVWg");
}

pub mod libsecp256k1_fail_on_bad_count2 {
    solana_sdk::declare_id!("J7v4qDbJGEiayvZvEKnVTcWkrZAt9ZFCF5i2JuLdyDyu");
}

pub mod instructions_sysvar_owned_by_sysvar {
    solana_sdk::declare_id!("72wYhXMm9G8Qbn4RGWh2t1PGjzo7zWmB49jmD4QhDnNr");
}

pub mod stake_program_advance_activating_credits_observed {
    solana_sdk::declare_id!("AKjCQpQQPSnF6XuW5rKGwNwgJNEDSyqtc2RS88QXvBfZ");
}

pub mod credits_auto_rewind {
    solana_sdk::declare_id!("BUS12ciZ5gCoFafUHWW8qaFMMtwFQGVxjsDheWLdqBE2");
}

pub mod demote_program_write_locks {
    solana_sdk::declare_id!("C9rgYL3bj8ZYUWSdTm8bszCrCjbQGRJDKcpKj7sZq29C");
}

pub mod ed25519_program_enabled {
    solana_sdk::declare_id!("3YFzDW5UvaSYjYg1q2W1bD6bktLxSkPCdufqt2xkpfNf");
}

pub mod return_data_syscall_enabled {
    solana_sdk::declare_id!("GiDwJyku3WwmPqvmuMJWWBJ6hCgAVFbQNCTqwpa2vL7A");
}

pub mod reduce_required_deploy_balance {
    solana_sdk::declare_id!("J9MsJXWfbRpUUyADjMTjWjjNcCsVeaqAHRM8wnekzWj3");
}

pub mod sol_log_data_syscall_enabled {
    solana_sdk::declare_id!("3LV5cvZTUPp4d94WJVKGrFTw4d1HJoe3pYgDZ5yxmVZ1");
}

pub mod stakes_remove_delegation_if_inactive {
    solana_sdk::declare_id!("6njMnYJKBdB2EFz92SZiGsuMxXU47oWeRZKXYZGLmbor");
}

pub mod do_support_realloc {
    solana_sdk::declare_id!("CJXypETjNyn6xZpZjCqMAmCifL7tDby39odepkYuCXcD");
}

// Note: when this feature is cleaned up, also remove the secp256k1 program from
// the list of builtins and remove its files from /programs
pub mod prevent_calling_precompiles_as_programs {
    solana_sdk::declare_id!("2F1kGdNid5RnpK1U5HTAGeMmpkcTY5qzXePmN8Sjcbdt");
}

pub mod optimize_epoch_boundary_updates {
    solana_sdk::declare_id!("2ndCm5Bmkwu3RrhWHzkm8QTfpB1GcQ6hXMEPPsnvgyrQ");
}

pub mod remove_native_loader {
    solana_sdk::declare_id!("AiQhj5AidmW3eEcJf7WJEVAVFggC263DMLxhbx4uM9rG");
}

pub mod send_to_tpu_vote_port {
    solana_sdk::declare_id!("ETWZVGVWk2Drndjw2sU6KbfrjXcAfWBCtNZKBPnexMKY");
}

pub mod requestable_heap_size {
    solana_sdk::declare_id!("BDDemyTHrLEGp1LzhHAPJePhm3D3Co2jf4m6kmNoRMic");
}

pub mod disable_fee_calculator {
    solana_sdk::declare_id!("3pfZSSy1vw42RRJAvWNS9et4kbquAfTwt9DPT86bDzUv");
}

pub mod add_compute_budget_program {
    solana_sdk::declare_id!("9eNGVcxiKTCQm4pu2V628MwiejfsJrprCcvD1oQGH3jr");
}

pub mod nonce_must_be_writable {
    solana_sdk::declare_id!("F2Nah1GAhMySBXqmTemgAXrUBW9DJFJwUgjTJE78kJuQ");
}

pub mod spl_token_v3_3_0_release {
    solana_sdk::declare_id!("6dnhvMzKUTzUsnq82bbJLc9dXu4RVoV4HMZ4MThWM1BL");
}

pub mod leave_nonce_on_success {
    solana_sdk::declare_id!("2k6WR6MAtbZAXmT7v3XJX4j2FBu91xmUQTj3vQFV8HHz");
}

pub mod reject_empty_instruction_without_program {
    solana_sdk::declare_id!("596dD1YNxw6nqcZLnkRp2vRWRjfMp9oWpRVVCsoD4vF");
}

pub mod fixed_memcpy_nonoverlapping_check {
    solana_sdk::declare_id!("7KCdC1V6JBshgp7XJApLBcQmnbGa1BjPkbv3xf1oi2kh");
}

pub mod reject_non_rent_exempt_vote_withdraws {
    solana_sdk::declare_id!("GP6xbuUoWzJwjoEWFfyFVG5cfGnekktMCJTytzZmEV9t");
}

pub mod evict_invalid_stakes_cache_entries {
    solana_sdk::declare_id!("EPpspM8wfcvuEhdGVEx5q85DgmWrUVRZJu5swYojDaGx");
}

pub mod allow_votes_to_directly_update_vote_state {
    solana_sdk::declare_id!("6DExwAjTKti2dG14C9Nzx1yKE49S5bHhmwvjtHR3C6G3");
}

pub mod cap_accounts_data_len {
    solana_sdk::declare_id!("5tZdfJkUgrgAb2vT5ngqzXG86jcupPMbSCBxG8i4bSof");
}

pub mod max_tx_account_locks {
    solana_sdk::declare_id!("5zNSKBUe3cJveLXE726BC8eFwQGSZXo4WimF3aGUidnx");
}

pub mod require_rent_exempt_accounts {
    solana_sdk::declare_id!("EjSfPKs9ajVXZcHKVk1eTg77iTo9p3MVS2SRprtWKcBh");
}

pub mod filter_votes_outside_slot_hashes {
    solana_sdk::declare_id!("5fHsE9jBArZn3JAbCTWrt1qubGPLXBvnMwY2PVUVbUGf");
}

pub mod update_syscall_base_costs {
    solana_sdk::declare_id!("AHahjaE3SfrSqWLo6jVTPiKLopkxTF4Sio8nPrt1TfPY");
}

pub mod stake_deactivate_delinquent_instruction {
    solana_sdk::declare_id!("437r62HoAdUb63amq3D7ENnBLDhHT2xY8eFkLJYVKK4x");
}

pub mod stake_redelegate_instruction {
    solana_sdk::declare_id!("3EPmAX94PvVJCjMeFfRFvj4avqCPL8vv3TGsZQg7ydMx");
}

pub mod vote_withdraw_authority_may_change_authorized_voter {
    solana_sdk::declare_id!("6W88pSG7p87xigqbawkH3Eb3x2pvyH7poFY8dKj4kS1u");
}

pub mod spl_associated_token_account_v1_0_4 {
    solana_sdk::declare_id!("3KhG72pKGbCUZDHZWiEhSomvQeU3pk5PCQjmTzf2JbU2");
}

pub mod reject_vote_account_close_unless_zero_credit_epoch {
    solana_sdk::declare_id!("Cb18xCeHRtU7dccemfAk1b6VPSSmANLdZBQWbYz9moFv");
}

pub mod add_get_processed_sibling_instruction_syscall {
    solana_sdk::declare_id!("Bj99VUr3fesoWsksEiXk9GMcekHRyMRd1fKC5wzUgyED");
}

pub mod bank_tranaction_count_fix {
    solana_sdk::declare_id!("CTsgeJBsPjdNAxYdjB3n5DemEQD36L8Rm8uHXYHJX12c");
}

pub mod disable_bpf_deprecated_load_instructions {
    solana_sdk::declare_id!("7v48zcX2Q4WyQM88eHgz3vgzWR2uGZZdhA9gieWZm5u8");
}

pub mod disable_bpf_unresolved_symbols_at_runtime {
    solana_sdk::declare_id!("36kXgr3j5y3RtMjLqgwxSgHJjpLs1qE5mxoQfGgVPwPv");
}

pub mod record_instruction_in_transaction_context_push {
    solana_sdk::declare_id!("9Mqd8wZShEaLM9iqKAVnACrsDMFPQzt7Q912UM6hxkV9");
}

pub mod syscall_saturated_math {
    solana_sdk::declare_id!("3XoQnjLRzohsZHKVoeWVLbnbo7DNjYaJJHYNBTgbNLAN");
}

pub mod check_physical_overlapping {
    solana_sdk::declare_id!("BNvLRPBBMwMCx17gCJVSyTKVSKnoZjYMnkDMCDuU7sKM");
}

pub mod limit_secp256k1_recovery_id {
    solana_sdk::declare_id!("5tFzxCKid5GEuA5nWqRMgywN5LPrEBVJ4BA8G4p1tkP6");
}

pub mod disable_deprecated_loader {
    solana_sdk::declare_id!("FU2TZTAKc99TBnzZV8YEkfZyo6ipjenGZbY6DLTDGh5u");
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
    solana_sdk::declare_id!("HwQn4hSWpuSVgbKsAZnkLAwXBLd8QHdyAXkbT7dF8yYJ");
}

pub mod fix_recent_blockhashes {
    solana_sdk::declare_id!("6iyggb5MTcsvdcugX7bEKbHV8c6jdLbpHwkncrgLMhfo");
}

pub mod update_rewards_from_cached_accounts {
    solana_sdk::declare_id!("28s7i3htzhahXQKqmS2ExzbEoUypg9krwvtK2M9UWXh9");
}

pub mod spl_token_v3_4_0 {
    solana_sdk::declare_id!("G2nx6VWfBKswPbEd6NMm8KJWuSRvXGBA5S3npawFgh52");
}

pub mod spl_associated_token_account_v1_1_0 {
    solana_sdk::declare_id!("4gMoNQr1kXWpG1X8HpmP3mBV7Jnu4712M5HGEUuVX1QJ");
}

pub mod default_units_per_instruction {
    solana_sdk::declare_id!("ESabkx13zh1mrGLGa5gJtD19w7p6S8bz6svfbm2wjnNq");
}

pub mod stake_allow_zero_undelegated_amount {
    solana_sdk::declare_id!("4uPpt8mUffAYXNvfPVo85us6nYGuTWCRzZAU1QsCvyxK");
}

pub mod require_static_program_ids_in_transaction {
    solana_sdk::declare_id!("9H9AECGZQVchUdYzeLNgcjzH3i3f8ybW5wfmNhSCZsAD");
}

pub mod stake_raise_minimum_delegation_to_1_sol {
    // This is a feature-proposal *feature id*.  The feature keypair address is `3YHAo6wWw5rDbQxb59BmJkQ3XwVhX3m8tdBVbtxnJmma`.
    solana_sdk::declare_id!("4xmyBuR2VCXzy9H6qYpH9ckfgnTuMDQFPFBfTs4eBCY1");
}

pub mod stake_minimum_delegation_for_rewards {
    solana_sdk::declare_id!("ELjxSXwNsyXGfAh8TqX8ih22xeT8huF6UngQirbLKYKH");
}

pub mod add_set_compute_unit_price_ix {
    solana_sdk::declare_id!("Hpo6r2vkVJu2ZGcosSjPu6UEMKCgfPvVYZaVBH6h8VMT");
}

pub mod disable_deploy_of_alloc_free_syscall {
    solana_sdk::declare_id!("79HWsX9rpnnJBPcdNURVqygpMAfxdrAirzAGAVmf92im");
}

pub mod include_account_index_in_rent_error {
    solana_sdk::declare_id!("GkgHKtPdwbk6xUh4zEEP9bUHdns7AqgN9m5cET4BsCeF");
}

pub mod add_shred_type_to_shred_seed {
    solana_sdk::declare_id!("5RzYz7JqCwWah7Ti4aF2mPYEpK91dbMhgBMLK7sbmRzW");
}

pub mod warp_timestamp_with_a_vengeance {
    solana_sdk::declare_id!("FcuiKq6j3ZcmhUpWo1yEPmz22u8UCtJPhy5uaPSJjSSm");
}

pub mod separate_nonce_from_blockhash {
    solana_sdk::declare_id!("9cM2tctociau7B5tNECEGAkaqremBv963GfS62m8tqy8");
}

pub mod enable_durable_nonce {
    solana_sdk::declare_id!("DJcnw3tH8GuQcwYNsJsjot3CtL8sPERehZhNoj3Y14TW");
}

pub mod vote_state_update_credit_per_dequeue {
    solana_sdk::declare_id!("9HPWyLWyBh6iTKNNWmefQZuVgmCGq5aUwZcEMB6wNZcT");
}

pub mod executables_incur_cpi_data_cost {
    solana_sdk::declare_id!("C2sVuUiyPJDNkVUQ99hzjqQNtpomNb1uHLMPMa2ZXvBR");
}

pub mod quick_bail_on_panic {
    solana_sdk::declare_id!("Ekz7WbCow7PyKpMzf4r5AvmLDnMfgC8Tiy1eGRE5ofuU");
}

pub mod nonce_must_be_authorized {
    solana_sdk::declare_id!("EVzDSdZBes7eoxEmivLxUyfp2kN42o5iw8paUnPCAuFD");
}

pub mod nonce_must_be_advanceable {
    solana_sdk::declare_id!("HRjN4cRQQiXEGpJ7g7CL5q4sqaZ5tGu5TFgwyayMWpNM");
}

pub mod vote_authorize_with_seed {
    solana_sdk::declare_id!("E1BNsswX1PctyYcERz8qqh5kzaEmRLdYrGnFVt1LZ5DR");
}

pub mod cap_accounts_data_size_per_block {
    solana_sdk::declare_id!("9PESfxb8jES2BZDtRrYTnnQiYLKt9pa8LuV5Xb65ogms");
}

pub mod preserve_rent_epoch_for_rent_exempt_accounts {
    solana_sdk::declare_id!("7oDvDcAouW5k7bECkweS5JKivws2jhaDdURS8k357KGm");
}

pub mod enable_bpf_loader_extend_program_ix {
    solana_sdk::declare_id!("8Zs9W7D9MpSEtUWSQdGniZk2cNmV22y6FLJwCx53asme");
}

pub mod enable_early_verification_of_account_modifications {
    solana_sdk::declare_id!("7Vced912WrRnfjaiKRiNBcbuFw7RrnLv3E3z95Y4GTNc");
}

pub mod prevent_crediting_accounts_that_end_rent_paying {
    solana_sdk::declare_id!("FsU6RrkhahdXixur34LwQpbczrWvGAC2UG3M3ZAuv2we");
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
    solana_sdk::declare_id!("41pj9TFZKhXNiMuHGA5pi669bmsJzLy8NEgFbPoLoHCx");
}

pub mod disable_rehash_for_rent_epoch {
    solana_sdk::declare_id!("DTVTkmw3JSofd8CJVJte8PXEbxNQ2yZijvVr3pe2APPj");
}

pub mod on_load_preserve_rent_epoch_for_rent_exempt_accounts {
    solana_sdk::declare_id!("CpkdQmspsaZZ8FVAouQTtTWZkc8eeQ7V3uj7dWz543rZ");
}

pub mod increase_tx_account_lock_limit {
    solana_sdk::declare_id!("ChZkoorKRzXShfAp7tVrMBevvgdsYAAGVMMTYbTPoV9R");
}

pub mod check_syscall_outputs_do_not_overlap {
    solana_sdk::declare_id!("8UBGG5Wn2gv6c2wcLetqrN58J6dCfXwCNPxo4zk5swh7");
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
