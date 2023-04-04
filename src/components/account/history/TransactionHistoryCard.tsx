import React from "react";
import { Signature } from "components/common/Signature";
import { Slot } from "components/common/Slot";
import Moment from "react-moment";
import { PublicKey } from "@solana/web3.js";
import {
  useAccountHistory,
  useFetchAccountHistory,
} from "providers/accounts/history";
import {
  getTransactionRows,
  HistoryCardFooter,
  HistoryCardHeader,
} from "../HistoryCardComponents";
import { FetchStatus } from "providers/cache";
import { LoadingCard } from "components/common/LoadingCard";
import { ErrorCard } from "components/common/ErrorCard";
import { useTranslation } from "react-i18next";

export function TransactionHistoryCard({ pubkey }: { pubkey: PublicKey }) {
  const address = pubkey.toBase58();
  const history = useAccountHistory(address);
  const fetchAccountHistory = useFetchAccountHistory();
  const { t } = useTranslation();
  const refresh = () => fetchAccountHistory(pubkey, false, true);
  const loadMore = () => fetchAccountHistory(pubkey, false);

  const transactionRows = React.useMemo(() => {
    if (history?.data?.fetched) {
      return getTransactionRows(history.data.fetched);
    }
    return [];
  }, [history]);

  React.useEffect(() => {
    if (!history) {
      refresh();
    }
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!history) {
    return null;
  }

  if (history?.data === undefined) {
    if (history.status === FetchStatus.Fetching) {
      return <LoadingCard message={t("loading_history")} />;
    }

    return (
      <ErrorCard
        retry={refresh}
        text={t("failed_to_fetch_transaction_history")}
      />
    );
  }

  const hasTimestamps = transactionRows.some((element) => element.blockTime);
  const detailsList: React.ReactNode[] = transactionRows.map(
    ({ slot, signature, blockTime, statusClass, statusText }) => {
      return (
        <tr key={signature}>
          <td>
            <Signature signature={signature} link truncate />
          </td>

          <td className="w-1">
            <Slot slot={slot} link />
          </td>

          {hasTimestamps && (
            <td className="text-muted">
              {blockTime ? <Moment date={blockTime * 1000} fromNow /> : "---"}
            </td>
          )}

          <td>
            <span className={`badge bg-${statusClass}-soft`}>{statusText}</span>
          </td>
        </tr>
      );
    }
  );

  const fetching = history.status === FetchStatus.Fetching;
  return (
    <div className="card">
      <HistoryCardHeader
        fetching={fetching}
        refresh={() => refresh()}
        title={t("transaction_history")}
      />
      <div className="table-responsive mb-0">
        <table className="table table-sm table-nowrap card-table">
          <thead>
            <tr>
              <th className="text-muted w-1">{t("transaction_signature")}</th>
              <th className="text-muted w-1">{t("slot")}</th>
              {hasTimestamps && <th className="text-muted w-1">{t("age")}</th>}
              <th className="text-muted">{t("result")}</th>
            </tr>
          </thead>
          <tbody className="list">{detailsList}</tbody>
        </table>
      </div>
      <HistoryCardFooter
        fetching={fetching}
        foundOldest={history.data.foundOldest}
        loadMore={() => loadMore()}
      />
    </div>
  );
}
