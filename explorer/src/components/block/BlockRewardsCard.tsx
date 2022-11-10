import React from "react";
import { SolBalance } from "utils";
import { BlockResponse, PublicKey } from "@solana/web3.js";
import { Address } from "components/common/Address";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 10;

export function BlockRewardsCard({ block }: { block: BlockResponse }) {
  const [rewardsDisplayed, setRewardsDisplayed] = React.useState(PAGE_SIZE);
  const { t } = useTranslation();

  if (!block.rewards || block.rewards.length < 1) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-header align-items-center">
        <h3 className="card-header-title">{t("block_rewards")}</h3>
      </div>

      <div className="table-responsive mb-0">
        <table className="table table-sm table-nowrap card-table">
          <thead>
            <tr>
              <th className="text-muted">{t("address")}</th>
              <th className="text-muted">{t("type")}</th>
              <th className="text-muted">{t("amount")}</th>
              <th className="text-muted">{t("new_balance")}</th>
              <th className="text-muted">{t("percent_change")}</th>
            </tr>
          </thead>
          <tbody>
            {block.rewards.map((reward, index) => {
              if (index >= rewardsDisplayed - 1) {
                return null;
              }

              let percentChange;
              if (reward.postBalance !== null && reward.postBalance !== 0) {
                percentChange = (
                  (Math.abs(reward.lamports) /
                    (reward.postBalance - reward.lamports)) *
                  100
                ).toFixed(9);
              }
              return (
                <tr key={reward.pubkey + reward.rewardType}>
                  <td>
                    <Address pubkey={new PublicKey(reward.pubkey)} link />
                  </td>
                  <td>{reward.rewardType}</td>
                  <td>
                    <SolBalance lamports={reward.lamports} />
                  </td>
                  <td>
                    {reward.postBalance ? (
                      <SolBalance lamports={reward.postBalance} />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{percentChange ? percentChange + "%" : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {block.rewards.length > rewardsDisplayed && (
        <div className="card-footer">
          <button
            className="btn btn-primary w-100"
            onClick={() =>
              setRewardsDisplayed((displayed) => displayed + PAGE_SIZE)
            }
          >
            {t("load_more")}
          </button>
        </div>
      )}
    </div>
  );
}
