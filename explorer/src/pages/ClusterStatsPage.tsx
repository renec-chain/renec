import React from "react";
import {
  ClusterStatsStatus,
  useDashboardInfo,
  usePerformanceInfo,
  useStatsProvider,
} from "providers/stats/solanaClusterStats";
import { abbreviatedNumber, lamportsToSol, slotsToHumanString } from "utils";
import { ClusterStatus, useCluster } from "providers/cluster";
import { TpsCard } from "components/TpsCard";
import { Status, useFetchSupply, useSupply } from "providers/supply";
import { ErrorCard } from "components/common/ErrorCard";
import { LoadingCard } from "components/common/LoadingCard";
import { useVoteAccounts } from "providers/accounts/vote-accounts";
import { useCoinGecko } from "utils/coingecko";
import { useTranslation } from "react-i18next";
import ActiveStakeIcon from "img/active-stake.png";
import CircumlatingSupply from "img/circumlating_supply.png";
import { TransactionsCard } from "../components/TransactionsCard";

const CLUSTER_STATS_TIMEOUT = 5000;

export function ClusterStatsPage() {
  return (
    <div className="cluster-stats-page">
      <div className="container mb-6">
        <StatsCardBody />
        <div className="mt-4" />
        <TpsCard />
        <StakingComponent />
        <TransactionsCard />
      </div>
    </div>
  );
}

function StakingComponent() {
  const { status } = useCluster();
  const supply = useSupply();
  const fetchSupply = useFetchSupply();
  const coinInfo = useCoinGecko("solana");
  const { t } = useTranslation();
  const { fetchVoteAccounts, voteAccounts } = useVoteAccounts();

  function fetchData() {
    fetchSupply();
    fetchVoteAccounts();
  }

  React.useEffect(() => {
    if (status === ClusterStatus.Connected) {
      fetchData();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const delinquentStake = React.useMemo(() => {
    if (voteAccounts) {
      return voteAccounts.delinquent.reduce(
        (prev, current) => prev + current.activatedStake,
        0
      );
    }
    return 0;
  }, [voteAccounts]);

  const activeStake = React.useMemo(() => {
    if (voteAccounts) {
      return (
        voteAccounts.current.reduce(
          (prev, current) => prev + current.activatedStake,
          0
        ) + delinquentStake
      );
    }
  }, [voteAccounts, delinquentStake]);

  if (supply === Status.Disconnected) {
    // we'll return here to prevent flicker
    return null;
  }

  if (supply === Status.Idle || supply === Status.Connecting || !coinInfo) {
    return <LoadingCard message={t("loading_supply_and_price_data")} />;
  } else if (typeof supply === "string") {
    return <ErrorCard text={supply} retry={fetchData} />;
  }

  const circulatingPercentage = (
    (supply.circulating / supply.total) *
    100
  ).toFixed(1);

  const activeStakingPercentage = (
    ((activeStake || 0) / supply.total) *
    100
  ).toFixed(1);

  let delinquentStakePercentage;
  if (delinquentStake && activeStake) {
    delinquentStakePercentage = ((delinquentStake / activeStake) * 100).toFixed(
      1
    );
  }

  return (
    <div className="row staking-cards">
      <div className="col-12 col-lg-6 col-xl mb-4 mb-lg-0">
        <div className="custom-card">
          <div className="text-second text-sm">
            {t("active_stake")} <i className="fe fe-alert-circle" />{" "}
          </div>
          {activeStake && (
            <div>
              <h1 className="d-flex align-items-center">
                <img width={32} src={ActiveStakeIcon} alt="active-stake" />
                <span className="text-primary font-weight-bold">
                  {displayLamports(activeStake)}{" "}
                </span>
              </h1>
              <div className="text-xs">
                <span className="text-second">
                  of {displayLamports(supply.total)}:
                </span>
                <span className="text-primary">
                  {" "}
                  {activeStakingPercentage}%
                </span>
              </div>
            </div>
          )}
          {delinquentStakePercentage && (
            <div>
              Delinquent stake: <em>{delinquentStakePercentage}%</em>
            </div>
          )}
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl">
        <div className="custom-card">
          <div className="text-second text-sm">{t("circulating_supply")}</div>
          <div>
            <h1 className="d-flex align-items-center">
              <img
                width={32}
                src={CircumlatingSupply}
                alt="circumlating-supply"
              />
              <span className="text-primary font-weight-bold">
                {displayLamports(supply.circulating)}
              </span>
            </h1>
            <div className="text-xs">
              <span className="text-second">
                of {displayLamports(supply.total)}:
              </span>
              <span className="text-primary"> {circulatingPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function displayLamports(value: number) {
  return abbreviatedNumber(lamportsToSol(value));
}

function StatsCardBody() {
  const dashboardInfo = useDashboardInfo();
  const performanceInfo = usePerformanceInfo();
  const { setActive } = useStatsProvider();
  const { cluster } = useCluster();
  const { t } = useTranslation();

  React.useEffect(() => {
    setActive(true);
    return () => setActive(false);
  }, [setActive, cluster]);

  if (
    performanceInfo.status !== ClusterStatsStatus.Ready ||
    dashboardInfo.status !== ClusterStatsStatus.Ready
  ) {
    const error =
      performanceInfo.status === ClusterStatsStatus.Error ||
      dashboardInfo.status === ClusterStatsStatus.Error;
    return <StatsNotReady error={error} />;
  }

  const { avgSlotTime_1h, avgSlotTime_1min, epochInfo } = dashboardInfo;
  const hourlySlotTime = Math.round(1000 * avgSlotTime_1h);
  const averageSlotTime = avgSlotTime_1min.toFixed(3);
  const { slotIndex, slotsInEpoch } = epochInfo;
  const epochProgress = ((100 * slotIndex) / slotsInEpoch).toFixed(1) + "%";
  const epochTimeRemaining = slotsToHumanString(
    slotsInEpoch - slotIndex,
    hourlySlotTime
  );
  const { absoluteSlot } = epochInfo;

  return (
    <div className="custom-card stats-card">
      <div className="stats-card__item">
        <div className="text-second text-sm">{t("slot_height")}</div>
        <div className="text-primary stats-card__item--value">
          {absoluteSlot.toLocaleString()}
        </div>
      </div>
      <div className="stats-card__item ">
        <div className="text-second text-sm">
          {t("current_slot_time")} <i className="fe fe-alert-circle" />
        </div>
        <div className="slot-time">
          <span className="text-primary stats-card__item--value mr-2">
            {averageSlotTime}
          </span>
          <span>S</span>
        </div>
      </div>
      <div className="stats-card__item">
        <div className="text-second text-sm">
          {t("epoch")} <i className="fe fe-alert-circle" />
        </div>
        <div className="d-flex epoch-progress">
          <div className="text-primary stats-card__item--value">
            {epochInfo.epoch}
          </div>
          <div className="mx-4">
            <div className="d-flex justify-content-between">
              <span className="text-primary">{epochProgress}</span>
              <span className="text-primary">ETA {epochTimeRemaining}</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: epochProgress }}
              ></div>
            </div>
          </div>
          <div className="stats-card__item--value text-black-400">
            {epochInfo.epoch + 1}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsNotReady({ error }: { error: boolean }) {
  const { setTimedOut, retry, active } = useStatsProvider();
  const { cluster } = useCluster();
  const { t } = useTranslation();

  React.useEffect(() => {
    let timedOut = 0;
    if (!error) {
      timedOut = setTimeout(setTimedOut, CLUSTER_STATS_TIMEOUT);
    }
    return () => {
      if (timedOut) {
        clearTimeout(timedOut);
      }
    };
  }, [setTimedOut, cluster, error]);

  if (error || !active) {
    return (
      <div className="custom-card text-center mb-4">
        {t("loading_cluster_problem")}
        <button
          className="btn btn-white btn-sm"
          onClick={() => {
            retry();
          }}
        >
          <span className="fe fe-refresh-cw me-2"></span>
          {t("try_again")}
        </button>
      </div>
    );
  }

  return (
    <div className="custom-card text-center mb-4">
      <span className="spinner-grow spinner-grow-sm me-2"></span>
      {t("loading")}
    </div>
  );
}
