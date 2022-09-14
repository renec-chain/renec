import React from "react";
import { TableCardBody } from "components/common/TableCardBody";
import { Slot } from "components/common/Slot";
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
import { Epoch } from "components/common/Epoch";
import { TimestampToggle } from "components/common/TimestampToggle";
import { SolanaPingCard } from "components/SolanaPingCard";

const CLUSTER_STATS_TIMEOUT = 5000;

export function ClusterStatsPage() {
  return (
    <div className="cluster-stats-page mt-4">
      <div className="cluster-stats-page__gradient-bg" />
      <div className="container" style={{ marginTop: "-74px" }}>
        <StakingComponent />
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-header-title">Live Cluster Stats</h4>
              </div>
            </div>
          </div>
          <StatsCardBody />
        </div>
        <TpsCard />
      </div>
      <TpsCard />
      <SolanaPingCard />
    </div>
  );
}

function StakingComponent() {
  const { status } = useCluster();
  const supply = useSupply();
  const fetchSupply = useFetchSupply();
  const coinInfo = useCoinGecko("solana");
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
  }, [voteAccounts]);

  const activeStake = React.useMemo(() => {
    if (voteAccounts && delinquentStake) {
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
    return <LoadingCard message="Loading supply and price data" />;
  } else if (typeof supply === "string") {
    return <ErrorCard text={supply} retry={fetchData} />;
  }

  const circulatingPercentage = (
    (supply.circulating / supply.total) *
    100
  ).toFixed(1);

  let delinquentStakePercentage;
  if (delinquentStake && activeStake) {
    delinquentStakePercentage = ((delinquentStake / activeStake) * 100).toFixed(
      1
    );
  }

  return (
    <div className="row staking-card">
      <div className="col-12 col-lg-6 col-xl">
        <div className="card">
          <div className="card-body">
            <h4>Circulating Supply</h4>
            <h1>
              <em>{displayLamports(supply.circulating)}</em> /{" "}
              {displayLamports(supply.total)}
            </h1>
            <h5>
              <em>{circulatingPercentage}%</em> is circulating
            </h5>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl">
        <div className="card">
          <div className="card-body">
            <h4>Active Stake</h4>
            {activeStake && (
              <h1>
                <em>{displayLamports(activeStake)}</em> /{" "}
                {displayLamports(supply.total)}
              </h1>
            )}
            {delinquentStakePercentage && (
              <h5>
                Delinquent stake: <em>{delinquentStakePercentage}%</em>
              </h5>
            )}
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

  const { avgSlotTime_1h, avgSlotTime_1min, epochInfo, blockTime } =
    dashboardInfo;
  const hourlySlotTime = Math.round(1000 * avgSlotTime_1h);
  const averageSlotTime = Math.round(1000 * avgSlotTime_1min);
  const { slotIndex, slotsInEpoch } = epochInfo;
  const epochProgress = ((100 * slotIndex) / slotsInEpoch).toFixed(1) + "%";
  const epochTimeRemaining = slotsToHumanString(
    slotsInEpoch - slotIndex,
    hourlySlotTime
  );
  const { blockHeight, absoluteSlot } = epochInfo;

  return (
    <TableCardBody>
      <tr>
        <td className="w-100">Slot</td>
        <td className="text-lg-end font-monospace">
          <Slot slot={absoluteSlot} link />
        </td>
      </tr>
      {blockHeight !== undefined && (
        <tr>
          <td className="w-100">Block height</td>
          <td className="text-lg-end font-monospace">
            <Slot slot={blockHeight} />
          </td>
        </tr>
      )}
      {blockTime && (
        <tr>
          <td className="w-100">Cluster time</td>
          <td className="text-lg-end font-monospace">
            <TimestampToggle unixTimestamp={blockTime}></TimestampToggle>
          </td>
        </tr>
      )}
      <tr>
        <td className="w-100">Slot time (1min average)</td>
        <td className="text-lg-end font-monospace">{averageSlotTime}ms</td>
      </tr>
      <tr>
        <td className="w-100">Slot time (1hr average)</td>
        <td className="text-lg-end font-monospace">{hourlySlotTime}ms</td>
      </tr>
      <tr>
        <td className="w-100">Epoch</td>
        <td className="text-lg-end font-monospace">
          <Epoch epoch={epochInfo.epoch} link />
        </td>
      </tr>
      <tr>
        <td className="w-100">Epoch progress</td>
        <td className="text-lg-end font-monospace">{epochProgress}</td>
      </tr>
      <tr>
        <td className="w-100">Epoch time remaining (approx.)</td>
        <td className="text-lg-end font-monospace">~{epochTimeRemaining}</td>
      </tr>
    </TableCardBody>
  );
}

export function StatsNotReady({ error }: { error: boolean }) {
  const { setTimedOut, retry, active } = useStatsProvider();
  const { cluster } = useCluster();

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
      <div className="card-body text-center">
        There was a problem loading cluster stats.{" "}
        <button
          className="btn btn-white btn-sm"
          onClick={() => {
            retry();
          }}
        >
          <span className="fe fe-refresh-cw me-2"></span>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="card-body text-center">
      <span className="spinner-grow spinner-grow-sm me-2"></span>
      Loading
    </div>
  );
}
