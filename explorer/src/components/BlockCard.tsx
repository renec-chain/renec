import { PublicKey } from "@solana/web3.js";
import { useCluster } from "providers/cluster";
import { getConnection } from "providers/stats/solanaClusterStats";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SolBalance } from "utils";
import { Address } from "./common/Address";
import { Slot } from "./common/Slot";
import { TableCardBody } from "./common/TableCardBody";

const FETCH_BLOCK_NUMBER = 25;

const Header = () => {
  const { t } = useTranslation();
  return (
    <tr>
      <th>{t("block")}</th>
      <th>{t("blockhash")}</th>
      <th>{t("validator")}</th>
      <th>{t("txs")}</th>
      <th>{t("total_fee")}</th>
      <th>{t("timestamp")}</th>
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
    <div className="mt-4 mb-4 d-flex justify-content-center">
      <button className="btn btn-outline-primary" onClick={() => loadMore()}>
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

const BlockRow = ({ block }: any) => {
  const totalFee = block.transactions.reduce(
    (total: number, transaction: { meta: { fee: any } }) =>
      total + transaction.meta.fee,
    0
  );

  return (
    <tr>
      <td>
        <Slot slot={block.slot} link />
      </td>
      <td className="forced-truncate">
        <Address pubkey={new PublicKey(block.blockhash)} link truncate />
      </td>
      <td className="forced-truncate">
        <Address
          pubkey={new PublicKey(block.rewards[0].pubkey)}
          link
          truncate
        />
      </td>
      <td>
        <span>{block.transactions.length}</span>
      </td>
      <td>
        <span>
          <SolBalance lamports={totalFee} />
        </span>
      </td>
      <td>{new Date(block.blockTime).toLocaleString()}</td>
    </tr>
  );
};

export const BlockCard = () => {
  const { t } = useTranslation();
  const { url, clusterInfo } = useCluster();
  const connection = getConnection(url);
  const [blocks, setBlocks] = useState<any>([]);
  const [slots, setSlots] = useState<any>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const lastSlot = clusterInfo?.epochInfo.absoluteSlot || 0;
  const [lastFetchedSlot, setLastFetchedSlot] = useState<number>(lastSlot);

  useEffect(() => {
    setLastFetchedSlot(lastSlot);
  }, [lastSlot]);

  const fetchSlots = async () => {
    try {
      const data = await connection?.getBlocks(
        lastFetchedSlot - FETCH_BLOCK_NUMBER,
        lastFetchedSlot - 1
      );
      setSlots(data);
    } catch (err) {
      throw err;
    }
  };

  const fetchBlocks = async () => {
    try {
      const data = await Promise.all(
        slots.map((slot: number) => connection?.getBlock(slot))
      );

      const blocksList = data.map((elm, index) => {
        return { ...elm, slot: slots[index] };
      });

      setBlocks([...blocks, ...blocksList.reverse()]);
    } catch (err) {
      throw err;
    } finally {
      setFetching(false);
    }
  };

  const retry = () => {
    setBlocks([]);
    setSlots([]);
    fetchSlots();
    setLastFetchedSlot(clusterInfo?.epochInfo.absoluteSlot || 0);
  };

  const loadMore = () => {
    setLastFetchedSlot(lastFetchedSlot - FETCH_BLOCK_NUMBER);
  };

  useEffect(() => {
    if (lastFetchedSlot && lastFetchedSlot >= FETCH_BLOCK_NUMBER) {
      setFetching(true);
      fetchSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastFetchedSlot]);

  useEffect(() => {
    setFetching(true);
    fetchBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  return (
    <div className="mt-4 mb-4 transaction-card">
      <div className="mb-3 cursor-pointer" onClick={() => retry()}>
        {t("recent_block")} <i className="fe fe-repeat text-primary" />
      </div>
      <TableCardBody>
        <Header></Header>
        {blocks.map((block: any, index: any) => {
          return <BlockRow key={index} block={block}></BlockRow>;
        })}
      </TableCardBody>
      <TableCardBody>
        <Footer loadMore={() => loadMore()} fetching={fetching}></Footer>
      </TableCardBody>
    </div>
  );
};
