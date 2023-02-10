import React, { useEffect, useState } from "react";
import { ConfirmedTransactionMeta, Message } from "@solana/web3.js";
import { TableCardBody } from "./common/TableCardBody";
import {
  getConnection,
  useDashboardInfo,
} from "../providers/stats/solanaClusterStats";
import { useCluster } from "../providers/cluster";
import { LoadingCard } from "./common/LoadingCard";
import { ErrorCard } from "./common/ErrorCard";
import { Signature } from "./common/Signature";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Header = () => {
  const { t } = useTranslation();
  return (
    <tr>
      <th>TX HASH</th>
      <th>{t("status")}</th>
      <th>SLOT</th>
      <th>{t("time")}</th>
    </tr>
  );
};

const TransactionRow = ({ data }: { data: TransactionResponse }) => {
  const signature = data.transaction.signatures[0];
  const statusClass = data?.meta?.err ? "warning" : "success";
  const statusText = i18n.t(data?.meta?.err ? "failed" : "success");

  return (
    <tr>
      <td>
        <Signature signature={signature} truncate link minimized />
      </td>
      <td>
        <span className={`badge bg-${statusClass}-soft`}>{statusText}</span>
      </td>
      <td>{data.epoch}</td>
      <td>{new Date(data.blockTime).toLocaleString()}</td>
    </tr>
  );
};

type TransactionResponse = {
  transaction: {
    message: Message;
    signatures: string[];
  };
  meta: ConfirmedTransactionMeta | null;
  epoch: number;
  blockTime: number;
};

type BlockTransactionReponse = TransactionResponse[];

const useRecentTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { epochInfo } = useDashboardInfo();
  const { url } = useCluster();
  const connection = getConnection(url);
  const [transactions, setTransactions] = useState<BlockTransactionReponse>();

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await connection?.getBlock(epochInfo.absoluteSlot);
      setFetched(true);
      setTransactions(
        data?.transactions.map((it) => ({
          ...it,
          blockTime: 1000 * (data?.blockTime || 0),
          epoch: epochInfo.absoluteSlot,
        }))
      );
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFetched(false);
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    if (epochInfo.absoluteSlot && !fetched) {
      fetchTransaction();
    }
    // eslint-disable-next-line
  }, [epochInfo.absoluteSlot]);

  const retry = () => {
    fetchTransaction();
  };

  return { transactions, retry, loading, error };
};

export const TransactionsCard = () => {
  const { transactions, retry, loading, error } = useRecentTransaction();
  const { t } = useTranslation();

  const render = () => {
    if (error) {
      return <ErrorCard text={t("failed_to_fetch_tratransaction")} />;
    }
    if (loading) {
      return <LoadingCard />;
    }
    return (
      <TableCardBody>
        <Header />
        {transactions?.map((data) => (
          <TransactionRow key={data.transaction.signatures[0]} data={data} />
        ))}
      </TableCardBody>
    );
  };

  return (
    <div className="mt-4 transaction-card">
      <div className="mb-3 cursor-pointer" onClick={retry}>
        {t("recent_transaction")} <i className="fe fe-repeat text-primary" />
      </div>
      {render()}
    </div>
  );
};
