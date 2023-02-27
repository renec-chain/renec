import axios from "axios";
import { ReactComponent as SortIcon } from "img/icons/sort.svg";
import { useVoteAccounts } from "providers/accounts/vote-accounts";
import { ClusterStatus, useCluster } from "providers/cluster";
import { getConnection } from "providers/stats/solanaClusterStats";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SolBalance } from "utils";
import { LoadingCard } from "./common/LoadingCard";
import { Slot } from "./common/Slot";
import { TableCardBody } from "./common/TableCardBody";

const Banner = ({ version, validator, apy, superminority }: any) => {
  const { t } = useTranslation();

  return (
    <div className="validator-banner">
      <div className="validator-elm">
        <div className="title">{t("validator")}</div>
        <div className="highlight">{validator}</div>
        <div className="title">
          {t("superminority")}: {superminority}
        </div>
      </div>
      <div className="validator-elm">
        <div className="title">{t("weighted_skip_rate")}</div>
        <div className="highlight">0%</div>
        <div className="title">{t("non_weighted")}: 0</div>
      </div>
      <div className="validator-elm">
        <div className="title">{t("nominal_staking_apy")}</div>
        <div className="highlight">{apy?.toFixed(2)}%</div>
      </div>
      <div className="version-box">
        <div>
          <div className="title">{t("node_versions")}</div>
          <div className="small-highlight">{version}(100%)</div>
        </div>

        <div className="version-circle">
          <span className="small-highlight">{version}</span>
        </div>
      </div>
    </div>
  );
};

const Header = ({ sort }: { sort: Function }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <th>{t("#")}</th>
      <th>{t("validator")}</th>
      <th>
        <div className="d-flex flex-row">
          {t("stake")}
          <div className="ms-2">
            <SortIcon onClick={() => sort("stake")} />
          </div>
        </div>
      </th>
      <th>{t("cummulative_stake")}</th>
      <th>
        <div className="d-flex flex-row">
          {t("commission")}
          <div className="ms-2">
            <SortIcon onClick={() => sort("commission")} />
          </div>
        </div>
      </th>
      <th>{t("last_vote")}</th>
    </tr>
  );
};

const ValidatorRow = ({
  account,
  index,
  lastCummulativePercentage,
  cummulativePercentage,
}: any) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="forced-truncate">
        <div className="d-flex flex-row align-items-center">
          <img
            src={account?.info?.avatarUrl}
            width="36px"
            height="36px"
            alt="avatar"
          />
          <div>
            <div className="ms-2">{account?.info?.name}</div>
            <div className="ms-2">{account?.node?.version}</div>
          </div>
        </div>
      </td>
      <td className="forced-truncate">
        <div className="d-flex flex-column">
          <p>
            <SolBalance lamports={account.activatedStake} />
          </p>
          <div>{account.stakePercent}%</div>
        </div>
      </td>
      <td className="cummulative-stake">
        <div
          style={{
            width: `${lastCummulativePercentage}px`,
            borderWidth: `${cummulativePercentage}px`,
          }}
        ></div>
        <span>{lastCummulativePercentage}%</span>
      </td>
      <td>
        <span>{account?.apy?.toFixed(2)}%</span>
      </td>
      <td>
        <Slot slot={account.lastVote} link />
      </td>
    </tr>
  );
};

export const ValidatorCard = () => {
  const { fetchVoteAccounts, voteAccounts } = useVoteAccounts();
  const { url, status } = useCluster();
  const [sortBy, setSortBy] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<any>(null);
  const [voteAccountsInfo, setVoteAccountsInfo] = useState<any>(null);
  const [version, setVersion] = useState<any>(null);
  const [clusterNodes, setClusterNodes] = useState<any>(null);
  const [apy, setApy] = useState<any>(null);
  const [totalSupply, setTotalSupply] = useState<any>(null);
  const [superminority, setSuperminority] = useState<any>(0);
  const [loading, setLoading] = useState<any>(true);
  const connection = getConnection(url);
  let lastCummulativePercentage = 0;

  useEffect(() => {
    if (status === ClusterStatus.Connected) {
      fetchVoteAccounts();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchClusterNodes = async () => {
      try {
        const data = await connection?.getClusterNodes();
        setClusterNodes(data);
      } catch (err) {
        throw err;
      }
    };

    fetchClusterNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const data = await connection?.getVersion();
        setVersion(data?.["solana-core"]);
      } catch (err) {
        throw err;
      }
    };

    fetchVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const fetchSupply = async () => {
      try {
        const data = await connection?.getSupply();
        setTotalSupply(data?.value?.total);
      } catch (err) {
        throw err;
      }
    };

    if (status === ClusterStatus.Connected) {
      fetchSupply();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (clusterNodes && voteAccounts) {
      voteAccounts?.current.map((account: any) => {
        const node = clusterNodes.find(
          (node: { pubkey: any }) => node.pubkey === account.nodePubkey
        );

        account.node = node;
        return null;
      });
    }
  }, [voteAccounts, clusterNodes]);

  useEffect(() => {
    if (voteAccounts?.current && status === ClusterStatus.Connected) {
      axios
        .get("https://hub.renec.foundation/api/v1/validators")
        .then((response) => {
          setVoteAccountsInfo(response.data);
          voteAccounts?.current.forEach((account: any) => {
            const info = response.data.find(
              (accountInfo: { voteAddress: any }) =>
                accountInfo.voteAddress === account.nodePubkey
            );

            account.info = info;
          });

          setLoading(false);
        });
    }
  }, [voteAccounts, status]);

  const delinquentStake = useMemo(() => {
    if (voteAccounts) {
      return voteAccounts.delinquent.reduce(
        (prev, current) => prev + current.activatedStake,
        0
      );
    }
    return 0;
  }, [voteAccounts]);

  const totalActiveStake = useMemo(() => {
    if (voteAccounts) {
      return (
        voteAccounts?.current.reduce(
          (prev, current) => prev + current.activatedStake,
          0
        ) + delinquentStake
      );
    } else {
      return 0;
    }
  }, [voteAccounts, delinquentStake]);

  useEffect(() => {
    if (voteAccounts?.current && totalSupply && totalActiveStake) {
      const yearlyRate = 0.045; // (4.5%)
      const totalYearlyBonus = yearlyRate * totalSupply;
      const bonusForEachActiveRenec = totalYearlyBonus / totalActiveStake;
      voteAccounts?.current.forEach((account: any) => {
        const result = bonusForEachActiveRenec * (100 - account.commission);

        account.apy = result;
      });
    }
  }, [voteAccounts, totalSupply, totalActiveStake]);

  useEffect(() => {
    if (voteAccounts?.current && totalActiveStake) {
      voteAccounts?.current.forEach((account: any) => {
        const stakePercent = (
          (account.activatedStake / totalActiveStake) *
          100
        ).toFixed(2);

        account.stakePercent = stakePercent;
      });

      const accountsSorted: any = voteAccounts?.current.sort((a: any, b: any) =>
        a.stakePercent > b.stakePercent ? a : b
      );

      let superminority: number = 0;
      for (let i = 0; i < accountsSorted.length; i++) {
        superminority += Number(accountsSorted[i].stakePercent);
        if (superminority >= 33) {
          setSuperminority(i + 1);
          return;
        }
      }
    }
  }, [voteAccounts, totalActiveStake]);

  useEffect(() => {
    if (voteAccounts) {
      const apyCalculated =
        voteAccounts.current.reduce(
          (total: number, account: any) => total + account.apy,
          0
        ) / voteAccounts.current.length;
      setApy(apyCalculated);
    }
  }, [voteAccounts, totalSupply, totalActiveStake]);

  const VoteAccountsSorted = useMemo(() => {
    if (voteAccounts?.current) {
      if (!sortBy) {
        return voteAccounts?.current;
      }

      let accountsSorted: any = [];
      for (let entry of voteAccounts?.current) {
        accountsSorted.push(entry);
      }

      if (sortBy === "commission") {
        accountsSorted.sort((a: any, b: any) => {
          if (sortOrder === "desc") {
            return a.commission > b.commission ? 1 : -1;
          } else {
            return a.commission > b.commission ? -1 : 1;
          }
        });
      }

      if (sortBy === "stake") {
        accountsSorted.sort((a: any, b: any) => {
          if (sortOrder === "desc") {
            return a.activatedStake > b.activatedStake ? 1 : -1;
          } else {
            return a.activatedStake > b.activatedStake ? -1 : 1;
          }
        });
      }

      return accountsSorted;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder, voteAccounts, voteAccountsInfo]);

  const sort = (by: string) => {
    let order = sortOrder;

    if (by !== sortBy) {
      setSortBy(by);
      setSortOrder(null);
    } else {
      if (order === "desc") {
        order = "asc";
      } else {
        order = "desc";
      }
      setSortOrder(order);
    }
  };

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <div className="mt-4 mb-4 transaction-card">
      <Banner
        version={version}
        validator={voteAccounts?.current?.length}
        apy={apy}
        superminority={superminority}
      />
      <TableCardBody>
        <Header sort={sort} />
        {voteAccounts?.current &&
          VoteAccountsSorted.map((account: any, index: any) => {
            const cummulativePercentage =
              (account.activatedStake / totalActiveStake) * 100;
            lastCummulativePercentage += Number(cummulativePercentage);

            return (
              <ValidatorRow
                account={account}
                key={index}
                index={index}
                cummulativePercentage={cummulativePercentage}
                lastCummulativePercentage={lastCummulativePercentage.toFixed(2)}
                version={version}
              />
            );
          })}
      </TableCardBody>
    </div>
  );
};
