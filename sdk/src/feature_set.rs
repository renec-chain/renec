//! Collection of all runtime features.
//!
//! Steps to add a new feature are outlined below. Note that these steps only cover
//! the process of getting a feature into the core Solana code.
//! - For features that are unambiguously good (ie bug fixes), these steps are sufficient.
//! - For features that should go up for community vote (ie fee structure changes), more
//!   information on the additional steps to follow can be found at:
//!   <https://spl.solana.com/feature-proposal#feature-proposal-life-cycle>
//!
//! 1. Generate a new keypair with `solana-keygen new --outfile feature.json --no-passphrase`
//!    - Keypairs should be held by core contributors only. If you're a non-core contirbutor going
//!      through these steps, the PR process will facilitate a keypair holder being picked. That
//!      person will generate the keypair, provide pubkey for PR, and ultimately enable the feature.
//! 2. Add a public module for the feature, specifying keypair pubkey as the id with
//!    `solana_sdk::declare_id!()` within the module.
//!    Additionally, add an entry to `FEATURE_NAMES` map.
//! 3. Add desired logic to check for and switch on feature availability.
//!
//! For more information on how features are picked up, see comments for `Feature`.

use lazy_static::lazy_static;
use solana_sdk::{
    clock::Slot,
    hash::{Hash, Hasher},
    pubkey::Pubkey,
};
use std::collections::{HashMap, HashSet};

pub mod deprecate_rewards_sysvar {
    solana_sdk::declare_id!("GaBtBJvmS4Arjj5W1NmFcyvPjsHN38UGYDq2MDwbs9Qu");
}

pub mod pico_inflation {
    solana_sdk::declare_id!("4RWNif6C2WCNiKVW7otP4G7dkmkHGyKQWRpuZ1pxKU5m");
}

pub mod full_inflation {
    pub mod devnet_and_testnet {
        solana_sdk::declare_id!("DT4n6ABDqs6w4bnfwrXT9rsprcPf6cdDga1egctaPkLC");
    }

    pub mod mainnet {
        pub mod certusone {
            pub mod vote {
                solana_sdk::declare_id!("BzBBveUDymEYoYzcMWNQCx3cd4jQs7puaVFHLtsbB6fm");
            }
            pub mod enable {
                solana_sdk::declare_id!("7XRJcS5Ud5vxGB54JbK9N2vBZVwnwdBNeJW1ibRgD9gx");
            }
        }
    }
}

pub mod spl_token_v2_multisig_fix {
    solana_sdk::declare_id!("E5JiFDQCwyC6QfT9REFyMpfK2mHcmv1GUDySU1Ue7TYv");
}

pub mod no_overflow_rent_distribution {
    solana_sdk::declare_id!("4kpdyrcj5jS47CZb2oJGfVxjYbsMm2Kx97gFyZrxxwXz");
}

pub mod filter_stake_delegation_accounts {
    solana_sdk::declare_id!("GE7fRxmW46K6EmCD9AMZSbnaJ2e3LfqCZzdHi9hmYAgi");
}

pub mod stake_program_v3 {
    solana_sdk::declare_id!("Ego6nTu7WsBcZBvVqJQKp6Yku2N3mrfG8oYCfaLZkAeK");
}

pub mod require_custodian_for_locked_stake_authorize {
    solana_sdk::declare_id!("D4jsDcXaqdW8tDAWn8H4R25Cdns2YwLneujSL1zvjW6R");
}

pub mod spl_token_v2_self_transfer_fix {
    solana_sdk::declare_id!("BL99GYhdjjcv6ys22C9wPgn2aTVERDbPHHo4NbS3hgp7");
}

pub mod warp_timestamp_again {
    solana_sdk::declare_id!("GvDsGDkH5gyzwpDhxNixx8vtx1kwYHH13RiNAPw27zXb");
}

pub mod check_init_vote_data {
    solana_sdk::declare_id!("3ccR6QpxGYsAbWyfevEtBNGfWV4xBffxRj2tD6A9i39F");
}

pub mod stake_program_v4 {
    solana_sdk::declare_id!("Dc7djyhP9aLfdq2zktpvskeAjpG56msCU1yexpxXiWZb");
}

pub mod secp256k1_recover_syscall_enabled {
    solana_sdk::declare_id!("6RvdSWHh8oh72Dp7wMTS2DBkf3fRPtChfNrAo3cZZoXJ");
}

pub mod system_transfer_zero_check {
    solana_sdk::declare_id!("BrTR9hzw4WBGFP65AJMbpAo64DcA3U6jdPSga9fMV5cS");
}

pub mod blake3_syscall_enabled {
    solana_sdk::declare_id!("HTW2pSyErTj4BV6KBM9NZ9VBUJVxt7sacNWcf76wtzb3");
}

pub mod dedupe_config_program_signers {
    solana_sdk::declare_id!("8kEuAshXLsgkUEdcFVLqrjCGGHVWFW99ZZpxvAzzMtBp");
}

pub mod deterministic_shred_seed_enabled {
    solana_sdk::declare_id!("FjSRMpFe7mofQ3WrEMT7Smjk2sME1XdAoRxcv55V6M44");
}

pub mod verify_tx_signatures_len {
    solana_sdk::declare_id!("EVW9B5xD9FFK7vw1SBARwMA4s5eRo5eKJdKpsBikzKBz");
}

pub mod vote_stake_checked_instructions {
    solana_sdk::declare_id!("BcWknVcgvonN8sL4HE4XFuEVgfcee5MwxWPAgP6ZV89X");
}

pub mod neon_evm_compute_budget {
    solana_sdk::declare_id!("GLrVvDPkQi5PMYUrsYWT9doZhSHr1BVZXqj5DbFps3rS");
}

pub mod rent_for_sysvars {
    solana_sdk::declare_id!("BKCPBQQBZqggVnFso5nQ8rQ4RwwogYwjuUt9biBjxwNF");
}

pub mod libsecp256k1_0_5_upgrade_enabled {
    solana_sdk::declare_id!("DhsYfRjxfnh2g7HKJYSzT79r74Afa1wbHkAgHndrA1oy");
}

pub mod tx_wide_compute_cap {
    solana_sdk::declare_id!("5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9");
}

pub mod spl_token_v2_set_authority_fix {
    solana_sdk::declare_id!("FToKNBYyiF4ky9s8WsmLBXHCht17Ek7RXaLZGHzzQhJ1");
}

pub mod stop_verify_mul64_imm_nonzero {
    solana_sdk::declare_id!("EHFwHg2vhwUb7ifm7BuY9RMbsyt1rS1rUii7yeDJtGnN");
}

pub mod merge_nonce_error_into_system_error {
    solana_sdk::declare_id!("21AWDosvp3pBamFW91KB35pNoaoZVTM7ess8nr2nt53B");
}

pub mod disable_fees_sysvar {
    solana_sdk::declare_id!("JAN1trEUEtZjgXYzNBYHU9DYd7GnThhXfFP7SzPXkPsG");
}

pub mod stake_merge_with_unmatched_credits_observed {
    solana_sdk::declare_id!("meRgp4ArRPhD3KtCY9c5yAf2med7mBLsjKTPeVUHqBL");
}

pub mod gate_large_block {
    solana_sdk::declare_id!("2ry7ygxiYURULZCrypHhveanvP5tzZ4toRwVp89oCNSj");
}

pub mod versioned_tx_message_enabled {
    solana_sdk::declare_id!("3KZZ6Ks1885aGBQ45fwRcPXVBCtzUvxhUTkwKMR41Tca");
}

pub mod libsecp256k1_fail_on_bad_count {
    solana_sdk::declare_id!("8aXvSuopd1PUj7UhehfXJRg6619RHp8ZvwTyyJHdUYsj");
}

pub mod instructions_sysvar_owned_by_sysvar {
    solana_sdk::declare_id!("H3kBSaKdeiUsyHmeHqjJYNc27jesXZ6zWj3zWkowQbkV");
}

pub mod stake_program_advance_activating_credits_observed {
    solana_sdk::declare_id!("SAdVFw3RZvzbo6DvySbSdBnHN4gkzSTH9dSxesyKKPj");
}

pub mod demote_program_write_locks {
    solana_sdk::declare_id!("3E3jV7v9VcdJL8iYZUMax9DiDno8j7EWUVbhm9RtShj2");
}

pub mod ed25519_program_enabled {
    solana_sdk::declare_id!("E1TvTNipX8TKNHrhRC8SMuAwQmGY58TZ4drdztP3Gxwc");
}

pub mod return_data_syscall_enabled {
    solana_sdk::declare_id!("BJVXq6NdLC7jCDGjfqJv7M1XHD4Y13VrpDqRF2U7UBcC");
}

pub mod reduce_required_deploy_balance {
    solana_sdk::declare_id!("EBeznQDjcPG8491sFsKZYBi5S5jTVXMpAKNDJMQPS2kq");
}

pub mod sol_log_data_syscall_enabled {
    solana_sdk::declare_id!("HYPs7jyJ3KwQFdDpuSzMtVKf1MLJDaZRv3CSWvfUqdFo");
}

pub mod stakes_remove_delegation_if_inactive {
    solana_sdk::declare_id!("HFpdDDNQjvcXnXKec697HDDsyk6tFoWS2o8fkxuhQZpL");
}

pub mod do_support_realloc {
    solana_sdk::declare_id!("75m6ysz33AfLA5DDEzWM1obBrnPQRSsdVQ2nRmc8Vuu1");
}

// Note: when this feature is cleaned up, also remove the secp256k1 program from
// the list of builtins and remove its files from /programs
pub mod prevent_calling_precompiles_as_programs {
    solana_sdk::declare_id!("4ApgRX3ud6p7LNMJmsuaAcZY5HWctGPr5obAsjB3A54d");
}

pub mod optimize_epoch_boundary_updates {
    solana_sdk::declare_id!("265hPS8k8xJ37ot82KEgjRunsUp5w4n4Q4VwwiN9i9ps");
}

pub mod remove_native_loader {
    solana_sdk::declare_id!("HTTgmruMYRZEntyL3EdCDdnS6e4D5wRq1FA7kQsb66qq");
}

pub mod send_to_tpu_vote_port {
    solana_sdk::declare_id!("C5fh68nJ7uyKAuYZg2x9sEQ5YrVf3dkW6oojNBSc3Jvo");
}

pub mod turbine_peers_shuffle {
    solana_sdk::declare_id!("4VvpgRD6UsHvkXwpuQhtR5NG1G4esMaExeWuSEpsYRUa");
}

pub mod requestable_heap_size {
    solana_sdk::declare_id!("CCu4boMmfLuqcmfTLPHQiUo22ZdUsXjgzPAURYaWt1Bw");
}

pub mod disable_fee_calculator {
    solana_sdk::declare_id!("2jXx2yDmGysmBKfKYNgLj2DQyAQv6mMk2BPh4eSbyB4H");
}

pub mod add_compute_budget_program {
    solana_sdk::declare_id!("4d5AKtxoh93Dwm1vHXUU3iRATuMndx1c431KgT2td52r");
}

pub mod reject_deployment_of_unresolved_syscalls {
    solana_sdk::declare_id!("DqniU3MfvdpU3yhmNF1RKeaM5TZQELZuyFGosASRVUoy");
}

lazy_static! {
    /// Map of feature identifiers to user-visible description
    pub static ref FEATURE_NAMES: HashMap<Pubkey, &'static str> = [
        (deprecate_rewards_sysvar::id(), "deprecate unused rewards sysvar"),
        (pico_inflation::id(), "pico inflation"),
        (full_inflation::devnet_and_testnet::id(), "full inflation on devnet and testnet"),
        (spl_token_v2_multisig_fix::id(), "spl-token multisig fix"),
        (no_overflow_rent_distribution::id(), "no overflow rent distribution"),
        (filter_stake_delegation_accounts::id(), "filter stake_delegation_accounts #14062"),
        (stake_program_v3::id(), "solana_stake_program v3"),
        (require_custodian_for_locked_stake_authorize::id(), "require custodian to authorize withdrawer change for locked stake"),
        (spl_token_v2_self_transfer_fix::id(), "spl-token self-transfer fix"),
        (full_inflation::mainnet::certusone::enable::id(), "full inflation enabled by Certus One"),
        (full_inflation::mainnet::certusone::vote::id(), "community vote allowing Certus One to enable full inflation"),
        (warp_timestamp_again::id(), "warp timestamp again, adjust bounding to 25% fast 80% slow #15204"),
        (check_init_vote_data::id(), "check initialized Vote data"),
        (stake_program_v4::id(), "solana_stake_program v4"),
        (secp256k1_recover_syscall_enabled::id(), "secp256k1_recover syscall"),
        (system_transfer_zero_check::id(), "perform all checks for transfers of 0 lamports"),
        (blake3_syscall_enabled::id(), "blake3 syscall"),
        (dedupe_config_program_signers::id(), "dedupe config program signers"),
        (deterministic_shred_seed_enabled::id(), "deterministic shred seed"),
        (verify_tx_signatures_len::id(), "prohibit extra transaction signatures"),
        (vote_stake_checked_instructions::id(), "vote/state program checked instructions #18345"),
        (neon_evm_compute_budget::id(), "bump neon_evm's compute budget"),
        (rent_for_sysvars::id(), "collect rent from accounts owned by sysvars"),
        (libsecp256k1_0_5_upgrade_enabled::id(), "upgrade libsecp256k1 to v0.5.0"),
        (tx_wide_compute_cap::id(), "transaction wide compute cap"),
        (spl_token_v2_set_authority_fix::id(), "spl-token set_authority fix"),
        (stop_verify_mul64_imm_nonzero::id(), "sets rbpf vm config verify_mul64_imm_nonzero to false"),
        (merge_nonce_error_into_system_error::id(), "merge NonceError into SystemError"),
        (disable_fees_sysvar::id(), "disable fees sysvar"),
        (stake_merge_with_unmatched_credits_observed::id(), "allow merging active stakes with unmatched credits_observed #18985"),
        (gate_large_block::id(), "validator checks block cost against max limit in realtime, reject if exceeds."),
        (versioned_tx_message_enabled::id(), "enable versioned transaction message processing"),
        (libsecp256k1_fail_on_bad_count::id(), "fail libsec256k1_verify if count appears wrong"),
        (instructions_sysvar_owned_by_sysvar::id(), "fix owner for instructions sysvar"),
        (stake_program_advance_activating_credits_observed::id(), "Enable advancing credits observed for activation epoch #19309"),
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
        (turbine_peers_shuffle::id(), "turbine peers shuffle patch"),
        (requestable_heap_size::id(), "Requestable heap frame size"),
        (disable_fee_calculator::id(), "deprecate fee calculator"),
        (add_compute_budget_program::id(), "Add compute_budget_program"),
        (reject_deployment_of_unresolved_syscalls::id(), "Reject deployment of programs with unresolved syscall symbols"),
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