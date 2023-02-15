import { useEffect, useState } from "react";
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
import { SolBalance } from "utils";
import { Slot } from "./common/Slot";

const Header = () => {
  const { t } = useTranslation();
  return (
    <tr>
      <th>SLOT</th>
      <th>TRANSACTION HASH</th>
      <th>{t("status")}</th>
      <th>{t("FEE")}</th>
      <th>{t("time")}</th>
    </tr>
  );
};

const Footer = ({
  fetching,
  loadMore,
}: {
  fetching: boolean;
  loadMore: Function;
}) => {
  const { t } = useTranslation();
  return (
    <div className="card-footer">
      <button className="btn btn-primary w-100" onClick={() => loadMore()}>
        {fetching ? (
          <>
            <span className="spinner-grow spinner-grow-sm me-2"></span>
            {t("loading")}
          </>
        ) : (
          t("load_more")
        )}
      </button>
    </div>
  );
};

const TransactionRow = ({ data }: { data: TransactionResponse }) => {
  const signature = data.transaction.signatures[0];
  const statusClass = data?.meta?.err ? "warning" : "success";
  const statusText = i18n.t(data?.meta?.err ? "failed" : "success");
  const fee = data?.meta?.fee || 0;

  return (
    <tr>
      <td>
        <Slot slot={data.slot} link />
      </td>
      <td>
        <Signature signature={signature} truncate link minimized />
      </td>
      <td>
        <span className={`badge bg-${statusClass}-soft`}>{statusText}</span>
      </td>
      <td>
        <span>
          <SolBalance lamports={fee} />
        </span>
      </td>
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
  slot: number;
  blockTime: number;
};

type BlockTransactionReponse = TransactionResponse[];

let currentTransactions = Array<TransactionResponse>();
let lastSlot: number;

const convertArray = (data: any, slot: number) => {
  return data?.transactions.map((it: any) => ({
    ...it,
    blockTime: 1000 * (data?.blockTime || 0),
    slot,
  }));
};

const useRecentTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { epochInfo } = useDashboardInfo();
  const { url } = useCluster();
  const connection = getConnection(url);
  const [transactions, setTransactions] = useState<BlockTransactionReponse>();

  const fetchTransaction = async (loadMode = false) => {
    try {
      loadMode ? setFetched(false) : setLoading(true);
      setError(false);
      lastSlot = lastSlot || epochInfo.absoluteSlot;
      const dataResponse = await Promise.all(
        [0, 1, 2].map((slotNumber) =>
          connection?.getBlock(lastSlot - slotNumber)
        )
      );
      const data = dataResponse.map((el, index) =>
        convertArray(el, lastSlot - index)
      );
      currentTransactions = currentTransactions.concat(data.flat(1));
      lastSlot = lastSlot - 3;

      setFetched(true);
      setTransactions(currentTransactions);
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
    lastSlot = 0;
    currentTransactions = [];
    fetchTransaction();
  };

  const loadMore = () => {
    fetchTransaction(true);
  };

  return { transactions, retry, loading, loadMore, fetched, error };
};

export const ListTransactionsCard = () => {
  const { transactions, retry, loading, loadMore, fetched, error } =
    useRecentTransaction();
  const { t } = useTranslation();

  const render = () => {
    if (error) {
      return <ErrorCard text={t("failed_to_fetch_tratransaction")} />;
    }
    if (loading) {
      return <LoadingCard />;
    }
    return (
      <div className="card">
        <TableCardBody>
          <Header />
          {transactions?.map((data) => (
            <TransactionRow key={data.transaction.signatures[0]} data={data} />
          ))}
        </TableCardBody>
        {transactions?.length && (
          <Footer loadMore={loadMore} fetching={!fetched} />
        )}
      </div>
    );
  };

  return (
    <div className="mt-4 mb-4 transaction-card">
      <div className="mb-3 cursor-pointer" onClick={retry}>
        {t("recent_transaction")} <i className="fe fe-repeat text-primary" />
      </div>
      {render()}
    </div>
  );
};
