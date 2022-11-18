import React from "react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Address } from "components/common/Address";
import {
  Account,
  useAccountInfo,
  useFetchAccountInfo,
} from "providers/accounts";
import { ClusterStatus, useCluster } from "providers/cluster";
import { addressLabel } from "utils/tx";
import { lamportsToSolString } from "utils";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

type AccountValidator = (account: Account) => string | undefined;

export const createFeePayerValidator = (
  feeLamports: number
): AccountValidator => {
  return (account: Account): string | undefined => {
    if (account.details === undefined) return i18n.t("account_doesnot_exists");
    if (!account.details.owner.equals(SystemProgram.programId))
      return i18n.t("only_system_account_can_pay_fees");
    // TODO: Actually nonce accounts can pay fees too
    if (account.details.space > 0)
      return i18n.t("only_unallocated_accounts_can_pay_fees");
    if (account.lamports < feeLamports) {
      return i18n.t("insufficient_funds_for_fees");
    }
    return;
  };
};

export const programValidator = (account: Account): string | undefined => {
  if (account.details === undefined) return i18n.t("account_doesnot_exists");
  if (!account.details.executable)
    return i18n.t("only_executable_accounts_can_be_invoked");
  return;
};

export function AddressWithContext({
  pubkey,
  validator,
}: {
  pubkey: PublicKey;
  validator?: AccountValidator;
}) {
  return (
    <div className="d-flex align-items-end flex-column">
      <Address pubkey={pubkey} link />
      <AccountInfo pubkey={pubkey} validator={validator} />
    </div>
  );
}

function AccountInfo({
  pubkey,
  validator,
}: {
  pubkey: PublicKey;
  validator?: AccountValidator;
}) {
  const address = pubkey.toBase58();
  const fetchAccount = useFetchAccountInfo();
  const info = useAccountInfo(address);
  const { cluster, status } = useCluster();
  const { t } = useTranslation();

  // Fetch account on load
  React.useEffect(() => {
    if (!info && status === ClusterStatus.Connected && pubkey) {
      fetchAccount(pubkey);
    }
  }, [address, status]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!info?.data)
    return (
      <span className="text-muted">
        <span className="spinner-grow spinner-grow-sm me-2"></span>
        Loading
      </span>
    );

  const errorMessage = validator && validator(info.data);
  if (errorMessage) return <span className="text-warning">{errorMessage}</span>;

  if (info.data.details?.executable) {
    return <span className="text-muted">Executable Program</span>;
  }

  const owner = info.data.details?.owner;
  const ownerAddress = owner?.toBase58();
  const ownerLabel = ownerAddress && addressLabel(ownerAddress, cluster);

  return (
    <span className="text-muted">
      {ownerAddress
        ? t("owned_by_xxx_address_balance_is_yyy", {
            owner: ownerLabel || ownerAddress,
            balance: lamportsToSolString(info.data.lamports),
          })
        : t("account_doesnot_exists")}
    </span>
  );
}
