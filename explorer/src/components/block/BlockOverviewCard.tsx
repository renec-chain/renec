import React from "react";
import { TableCardBody } from "components/common/TableCardBody";
import { useBlock, useFetchBlock, FetchStatus } from "providers/block";
import { ErrorCard } from "components/common/ErrorCard";
import { LoadingCard } from "components/common/LoadingCard";
import { Slot } from "components/common/Slot";
import { ClusterStatus, useCluster } from "providers/cluster";
import { BlockHistoryCard } from "./BlockHistoryCard";
import { BlockRewardsCard } from "./BlockRewardsCard";
import { BlockResponse } from "@solana/web3.js";
import { NavLink } from "react-router-dom";
import { clusterPath } from "utils/url";
import { BlockProgramsCard } from "./BlockProgramsCard";
import { BlockAccountsCard } from "./BlockAccountsCard";
import { displayTimestamp, displayTimestampUtc } from "utils/date";
import { Epoch } from "components/common/Epoch";
import { useTranslation } from "react-i18next";

export function BlockOverviewCard({
  slot,
  tab,
}: {
  slot: number;
  tab?: string;
}) {
  const confirmedBlock = useBlock(slot);
  const fetchBlock = useFetchBlock();
  const { clusterInfo, status } = useCluster();
  const refresh = () => fetchBlock(slot);
  const { t } = useTranslation();

  // Fetch block on load
  React.useEffect(() => {
    if (!confirmedBlock && status === ClusterStatus.Connected) refresh();
  }, [slot, status]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!confirmedBlock || confirmedBlock.status === FetchStatus.Fetching) {
    return <LoadingCard message={t("loading_block")} />;
  } else if (
    confirmedBlock.data === undefined ||
    confirmedBlock.status === FetchStatus.FetchFailed
  ) {
    return <ErrorCard retry={refresh} text={t("failed_to_fetch_block")} />;
  } else if (confirmedBlock.data.block === undefined) {
    return (
      <ErrorCard
        retry={refresh}
        text={t("block_was_not_found", { block: slot })}
      />
    );
  }

  const block = confirmedBlock.data.block;
  const committedTxs = block.transactions.filter((tx) => tx.meta?.err === null);
  const epoch = clusterInfo?.epochSchedule.getEpoch(slot);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-header-title mb-0 d-flex align-items-center">
            {t("overview")}
          </h3>
        </div>
        <TableCardBody>
          <tr>
            <td className="w-100">{t("slot")}</td>
            <td className="text-lg-end font-monospace">
              <Slot slot={slot} />
            </td>
          </tr>
          <tr>
            <td className="w-100">{t("blockhash")}</td>
            <td className="text-lg-end font-monospace">
              <span>{block.blockhash}</span>
            </td>
          </tr>
          {block.blockTime ? (
            <>
              <tr>
                <td>{t("timestamp_local")}</td>
                <td className="text-lg-end">
                  <span className="font-monospace">
                    {displayTimestamp(block.blockTime * 1000, true)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>{t("timestamp_utc")}</td>
                <td className="text-lg-end">
                  <span className="font-monospace">
                    {displayTimestampUtc(block.blockTime * 1000, true)}
                  </span>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td className="w-100">{t("timestamp")}</td>
              <td className="text-lg-end">{t("unavailable")}</td>
            </tr>
          )}
          <tr>
            <td className="w-100">{t("parent_slot")}</td>
            <td className="text-lg-end font-monospace">
              <Slot slot={block.parentSlot} link />
            </td>
          </tr>
          {epoch !== undefined && (
            <tr>
              <td className="w-100">{t("epoch")}</td>
              <td className="text-lg-end font-monospace">
                <Epoch epoch={epoch} link />
              </td>
            </tr>
          )}
          <tr>
            <td className="w-100">{t("parent_blockhash")}</td>
            <td className="text-lg-end font-monospace">
              <span>{block.previousBlockhash}</span>
            </td>
          </tr>
          {confirmedBlock.data.child && (
            <tr>
              <td className="w-100">{t("child_slot")}</td>
              <td className="text-lg-end font-monospace">
                <Slot slot={confirmedBlock.data.child} link />
              </td>
            </tr>
          )}
          <tr>
            <td className="w-100">{t("processed_transaction")}</td>
            <td className="text-lg-end font-monospace">
              <span>{block.transactions.length}</span>
            </td>
          </tr>
          <tr>
            <td className="w-100">{t("successful_transactions")}</td>
            <td className="text-lg-end font-monospace">
              <span>{committedTxs.length}</span>
            </td>
          </tr>
        </TableCardBody>
      </div>

      <MoreSection block={block} slot={slot} tab={tab} />
    </>
  );
}

type MoreTabs = "history" | "rewards" | "programs" | "accounts";

type Tab = {
  slug: MoreTabs;
  title: string;
  path: string;
};

function MoreSection({
  slot,
  block,
  tab,
}: {
  slot: number;
  block: BlockResponse;
  tab?: string;
}) {
  const { t } = useTranslation();
  const TABS: Tab[] = [
    {
      slug: "history",
      title: t("transactions"),
      path: "",
    },
    {
      slug: "rewards",
      title: t("rewards"),
      path: "/rewards",
    },
    {
      slug: "programs",
      title: t("programs"),
      path: "/programs",
    },
    {
      slug: "accounts",
      title: t("accounts"),
      path: "/accounts",
    },
  ];
  return (
    <>
      <div className="header">
        <div className="header-body pt-0">
          <ul className="nav nav-tabs nav-overflow header-tabs">
            {TABS.map(({ title, slug, path }) => (
              <li key={slug} className="nav-item">
                <NavLink
                  className="nav-link"
                  to={clusterPath(`/block/${slot}${path}`)}
                  exact
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {tab === undefined && <BlockHistoryCard block={block} />}
      {tab === "rewards" && <BlockRewardsCard block={block} />}
      {tab === "accounts" && <BlockAccountsCard block={block} />}
      {tab === "programs" && <BlockProgramsCard block={block} />}
    </>
  );
}
