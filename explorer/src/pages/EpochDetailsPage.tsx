import React from "react";

import { ErrorCard } from "components/common/ErrorCard";
import { ClusterStatus, useCluster } from "providers/cluster";
import { LoadingCard } from "components/common/LoadingCard";
import { TableCardBody } from "components/common/TableCardBody";
import { Epoch } from "components/common/Epoch";
import { Slot } from "components/common/Slot";
import { useEpoch, useFetchEpoch } from "providers/epoch";
import { displayTimestampUtc } from "utils/date";
import { FetchStatus } from "providers/cache";
import { useTranslation } from "react-i18next";

type Props = { epoch: string };
export function EpochDetailsPage({ epoch }: Props) {
  const { t } = useTranslation();

  let output;
  if (isNaN(Number(epoch))) {
    output = <ErrorCard text={t("epoch_is_not_valid", { epoch })} />;
  } else {
    output = <EpochOverviewCard epoch={Number(epoch)} />;
  }

  return (
    <div className="container mt-n3">
      <div className="header">
        <div className="header-body">
          <h2 className="header-title">{t("details")}</h2>
        </div>
      </div>
      {output}
    </div>
  );
}

type OverviewProps = { epoch: number };
function EpochOverviewCard({ epoch }: OverviewProps) {
  const { status, clusterInfo } = useCluster();
  const { t } = useTranslation();
  const epochState = useEpoch(epoch);
  const fetchEpoch = useFetchEpoch();

  // Fetch extra epoch info on load
  React.useEffect(() => {
    if (!clusterInfo) return;
    const { epochInfo, epochSchedule } = clusterInfo;
    const currentEpoch = epochInfo.epoch;
    if (
      epoch <= currentEpoch &&
      !epochState &&
      status === ClusterStatus.Connected
    )
      fetchEpoch(epoch, currentEpoch, epochSchedule);
  }, [epoch, epochState, clusterInfo, status, fetchEpoch]);

  if (!clusterInfo) {
    return <LoadingCard message={t("connecting_to_cluster")} />;
  }

  const { epochInfo, epochSchedule } = clusterInfo;
  const currentEpoch = epochInfo.epoch;
  if (epoch > currentEpoch) {
    return <ErrorCard text={t("epoch_has_not_started", { epoch })} />;
  } else if (!epochState?.data) {
    if (epochState?.status === FetchStatus.FetchFailed) {
      return <ErrorCard text={t("failed_to_load_details_epoch", { epoch })} />;
    }
    return <LoadingCard message={t("loading_epoch")} />;
  }

  const firstSlot = epochSchedule.getFirstSlotInEpoch(epoch);
  const lastSlot = epochSchedule.getLastSlotInEpoch(epoch);

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
            <td className="w-100">{t("epoch")}</td>
            <td className="text-lg-end font-monospace">
              <Epoch epoch={epoch} />
            </td>
          </tr>
          {epoch > 0 && (
            <tr>
              <td className="w-100">{t("previous_epoch")}</td>
              <td className="text-lg-end font-monospace">
                <Epoch epoch={epoch - 1} link />
              </td>
            </tr>
          )}
          <tr>
            <td className="w-100">{t("next_epoch")}</td>
            <td className="text-lg-end font-monospace">
              {currentEpoch > epoch ? (
                <Epoch epoch={epoch + 1} link />
              ) : (
                <span className="text-muted">{t("epoch_in_progress")}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="w-100">{t("first_slot")}</td>
            <td className="text-lg-end font-monospace">
              <Slot slot={firstSlot} />
            </td>
          </tr>
          <tr>
            <td className="w-100">{t("last_slot")}</td>
            <td className="text-lg-end font-monospace">
              <Slot slot={lastSlot} />
            </td>
          </tr>
          {epochState.data.firstTimestamp && (
            <tr>
              <td className="w-100">{t("first_block_timestamp")}</td>
              <td className="text-lg-end">
                <span className="font-monospace">
                  {displayTimestampUtc(
                    epochState.data.firstTimestamp * 1000,
                    true
                  )}
                </span>
              </td>
            </tr>
          )}
          <tr>
            <td className="w-100">{t("first_block")}</td>
            <td className="text-lg-end font-monospace">
              <Slot slot={epochState.data.firstBlock} link />
            </td>
          </tr>
          <tr>
            <td className="w-100">{t("last_block")}</td>
            <td className="text-lg-end font-monospace">
              {epochState.data.lastBlock !== undefined ? (
                <Slot slot={epochState.data.lastBlock} link />
              ) : (
                <span className="text-muted">{t("epoch_in_progress")}</span>
              )}
            </td>
          </tr>
          {epochState.data.lastTimestamp && (
            <tr>
              <td className="w-100">{t("last_block_timestamp")}</td>
              <td className="text-lg-end">
                <span className="font-monospace">
                  {displayTimestampUtc(
                    epochState.data.lastTimestamp * 1000,
                    true
                  )}
                </span>
              </td>
            </tr>
          )}
        </TableCardBody>
      </div>
    </>
  );
}
