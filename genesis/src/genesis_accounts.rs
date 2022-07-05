use {
    crate::{
        stakes::{create_and_add_stakes, StakerInfo},
        unlocks::UnlockInfo,
    },
    solana_sdk::{genesis_config::GenesisConfig, native_token::LAMPORTS_PER_SOL},
};

// 20% for first year, then monthly for 5 years
const UNLOCKS_20_AT_BEGINNING: UnlockInfo = UnlockInfo {
    cliff_fraction: 0.2,
    cliff_years: 0.0,
    unlocks: 60,
    unlock_years: 5.0,
    custodian: "ELEGzPKyDtwBTJXkxSFAC3qQcmaYgvWRBAz6tsvxznCT",
};
// Yearly for 10 years
const UNLOCKS_IN_10_YEARS: UnlockInfo = UnlockInfo {
    cliff_fraction: 0.1,
    cliff_years: 1.0,
    unlocks: 9,
    unlock_years: 9.0,
    custodian: "ELEGzPKyDtwBTJXkxSFAC3qQcmaYgvWRBAz6tsvxznCT",
};

// TODO: 40_000_000 is temporary, when mainnet is launched, edit this number
const MINERS_RENEC_AMOUNT: u64 = 40_000_000;
const REMITANO_RENEC_AMOUNT: u64 = (MINERS_RENEC_AMOUNT as f64 * 0.25) as u64;
const DAPP_SUPPORT_RENEC_AMOUNT: u64 = ((MINERS_RENEC_AMOUNT + REMITANO_RENEC_AMOUNT) as f64 * 0.1046221254) as u64;

pub const REMITANO_STAKER_INFOS: &[StakerInfo] = &[
    StakerInfo {
        name: "remitano",
        staker: "HyEVmBC7gYXaMzDCibu6Ahxp9A78XChoBGfpGJMk3Yq2",
        lamports: REMITANO_RENEC_AMOUNT * LAMPORTS_PER_SOL,
        withdrawer: Some("8XBnv8o7oqV1Cx5ZCm67pSgWjo4CSSaazJCnB8yg6Q6T"),
    },
];
pub const MINERS_STAKER_INFOS: &[StakerInfo] = &[
    StakerInfo {
        name: "miners",
        staker: "2NbSRu4EFyQWwQrtAyC66Qqm5eaeUxjUD8TWyUnRpUfC",
        lamports: MINERS_RENEC_AMOUNT * LAMPORTS_PER_SOL,
        withdrawer: Some("7GYXsHnr4CL2X6k5f1R6z694vPMyNgFu53vAQ69NsqxT"),
    },
];
pub const DAPPS_STAKER_INFOS: &[StakerInfo] = &[
    StakerInfo {
        name: "dapps support",
        staker: "96b1mmsrYYtDk2D1nWU5sA4pWu3yMhx4btFa8nrgf4qB",
        lamports: DAPP_SUPPORT_RENEC_AMOUNT * LAMPORTS_PER_SOL,
        withdrawer: Some("Gx8MBH5axvswttbHdx7ZckmeE6R8Vohn1V9tCLQG3TQ9"),
    },
];

fn add_stakes(
    genesis_config: &mut GenesisConfig,
    staker_infos: &[StakerInfo],
    unlock_info: &UnlockInfo,
) -> u64 {
    staker_infos
        .iter()
        .map(|staker_info| create_and_add_stakes(genesis_config, staker_info, unlock_info, None))
        .sum::<u64>()
}

pub fn add_genesis_accounts(genesis_config: &mut GenesisConfig, mut issued_lamports: u64) {
    add_stakes(
        genesis_config,
        REMITANO_STAKER_INFOS,
        &UNLOCKS_20_AT_BEGINNING,
    );
    add_stakes(
        genesis_config,
        MINERS_STAKER_INFOS,
        &UNLOCKS_20_AT_BEGINNING,
    );
    add_stakes(
        genesis_config,
        DAPPS_STAKER_INFOS,
        &UNLOCKS_IN_10_YEARS,
    );
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_genesis_accounts() {
        let mut genesis_config = GenesisConfig::default();

        add_genesis_accounts(&mut genesis_config, 0);

        let lamports = genesis_config
            .accounts
            .iter()
            .map(|(_, account)| account.lamports)
            .sum::<u64>();

        assert_eq!(55_231_106 * LAMPORTS_PER_SOL, lamports);
    }
}
