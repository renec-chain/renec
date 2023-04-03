import React from "react";
import { ConfirmedSignatureInfo, TransactionError } from "@solana/web3.js";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export type TransactionRow = {
  slot: number;
  signature: string;
  err: TransactionError | null;
  blockTime: number | null | undefined;
  statusClass: string;
  statusText: string;
  signatureInfo: ConfirmedSignatureInfo;
};

export function HistoryCardHeader({
  title,
  refresh,
  fetching,
}: {
  title: string;
  refresh: Function;
  fetching: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="card-header align-items-center">
      <h3 className="card-header-title">{title}</h3>
      <button
        className="btn border-base btn-sm"
        disabled={fetching}
        onClick={() => refresh()}
      >
        {fetching ? (
          <>
            <span className="spinner-grow spinner-grow-sm me-2"></span>
            {t("loading")}
          </>
        ) : (
          <>
            <span className="fe fe-refresh-cw me-2"></span>
            {t("refresh")}
          </>
        )}
      </button>
    </div>
  );
}

export function HistoryCardFooter({
  fetching,
  foundOldest,
  loadMore,
}: {
  fetching: boolean;
  foundOldest: boolean;
  loadMore: Function;
}) {
  const { t } = useTranslation();
  return (
    <div className="card-footer">
      {foundOldest ? (
        <div className="text-muted text-center">
          {t("fetched_full_history")}
        </div>
      ) : (
        <button
          className="btn btn-primary w-100"
          onClick={() => loadMore()}
          disabled={fetching}
        >
          {fetching ? (
            <>
              <span className="spinner-grow spinner-grow-sm me-2"></span>
              {t("loading")}
            </>
          ) : (
            t("load_more")
          )}
        </button>
      )}
    </div>
  );
}

export function getTransactionRows(
  transactions: ConfirmedSignatureInfo[]
): TransactionRow[] {
  const transactionRows: TransactionRow[] = [];
  for (var i = 0; i < transactions.length; i++) {
    const slot = transactions[i].slot;
    const slotTransactions = [transactions[i]];
    while (i + 1 < transactions.length) {
      const nextSlot = transactions[i + 1].slot;
      if (nextSlot !== slot) break;
      slotTransactions.push(transactions[++i]);
    }

    for (let slotTransaction of slotTransactions) {
      let statusText;
      let statusClass;
      if (slotTransaction.err) {
        statusClass = "warning";
        statusText = i18n.t("failed");
      } else {
        statusClass = "success";
        statusText = i18n.t("success");
      }
      transactionRows.push({
        slot,
        signature: slotTransaction.signature,
        err: slotTransaction.err,
        blockTime: slotTransaction.blockTime,
        statusClass,
        statusText,
        signatureInfo: slotTransaction,
      });
    }
  }

  return transactionRows;
}
