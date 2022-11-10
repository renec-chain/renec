import React from "react";
import { useSupply, useFetchSupply, Status } from "providers/supply";
import { LoadingCard } from "./common/LoadingCard";
import { ErrorCard } from "./common/ErrorCard";
import { SolBalance } from "utils";
import { TableCardBody } from "./common/TableCardBody";
import { useTranslation } from "react-i18next";

export function SupplyCard() {
  const supply = useSupply();
  const { t } = useTranslation();
  const fetchSupply = useFetchSupply();

  // Fetch supply on load
  React.useEffect(() => {
    if (supply === Status.Idle) fetchSupply();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (supply === Status.Disconnected) {
    return <ErrorCard text={t("not_connected_to_the_cluster")} />;
  }

  if (supply === Status.Idle || supply === Status.Connecting)
    return <LoadingCard />;

  if (typeof supply === "string") {
    return <ErrorCard text={supply} retry={fetchSupply} />;
  }

  return (
    <div className="card">
      <Header />

      <TableCardBody>
        <tr>
          <td className="w-100">{t("total_supply")} (RENEC)</td>
          <td className="text-lg-end">
            <SolBalance lamports={supply.total} maximumFractionDigits={0} />
          </td>
        </tr>

        <tr>
          <td className="w-100">{t("circulating_supply")} (RENEC)</td>
          <td className="text-lg-end">
            <SolBalance
              lamports={supply.circulating}
              maximumFractionDigits={0}
            />
          </td>
        </tr>

        <tr>
          <td className="w-100">{t("non_circulating_supply")} (RENEC)</td>
          <td className="text-lg-end">
            <SolBalance
              lamports={supply.nonCirculating}
              maximumFractionDigits={0}
            />
          </td>
        </tr>
      </TableCardBody>
    </div>
  );
}

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="card-header">
      <div className="row align-items-center">
        <div className="col">
          <h4 className="card-header-title">{t("supply_overview")}</h4>
        </div>
      </div>
    </div>
  );
};
