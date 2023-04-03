import React from "react";
import { Link } from "react-router-dom";
import { Location } from "history";
import { AccountBalancePair } from "@solana/web3.js";
import { useRichList, useFetchRichList, Status } from "providers/richList";
import { LoadingCard } from "./common/LoadingCard";
import { ErrorCard } from "./common/ErrorCard";
import { SolBalance } from "utils";
import { useQuery } from "utils/url";
import { useSupply } from "providers/supply";
import { Address } from "./common/Address";
import { useTranslation } from "react-i18next";

type Filter = "circulating" | "nonCirculating" | "all" | null;

export function TopAccountsCard() {
  const supply = useSupply();
  const { t } = useTranslation();
  const richList = useRichList();
  const fetchRichList = useFetchRichList();
  const [showDropdown, setDropdown] = React.useState(false);
  const filter = useQueryFilter();

  if (typeof supply !== "object") return null;

  if (richList === Status.Disconnected) {
    return <ErrorCard text={t("loading_supply_and_price_data")} />;
  }

  if (richList === Status.Connecting) {
    return <LoadingCard />;
  }

  if (typeof richList === "string") {
    return <ErrorCard text={richList} retry={fetchRichList} />;
  }

  let supplyCount: number;
  let accounts, header;

  if (richList !== Status.Idle) {
    switch (filter) {
      case "nonCirculating": {
        accounts = richList.nonCirculating;
        supplyCount = supply.nonCirculating;
        header = t("non_circulating");
        break;
      }
      case "all": {
        accounts = richList.total;
        supplyCount = supply.total;
        header = t("total");
        break;
      }
      case "circulating":
      default: {
        accounts = richList.circulating;
        supplyCount = supply.circulating;
        header = t("circulating");
        break;
      }
    }
  }

  return (
    <>
      {showDropdown && (
        <div className="dropdown-exit" onClick={() => setDropdown(false)} />
      )}

      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="card-header-title">{t("largest_accounts")}</h4>
            </div>

            <div className="col-auto">
              <FilterDropdown
                filter={filter}
                toggle={() => setDropdown((show) => !show)}
                show={showDropdown}
              />
            </div>
          </div>
        </div>

        {richList === Status.Idle && (
          <div className="card-body">
            <span
              className="btn btn-white ms-3 d-none d-md-inline"
              onClick={fetchRichList}
            >
              {t("load_largest_accounts")}
            </span>
          </div>
        )}

        {accounts && (
          <div className="table-responsive mb-0">
            <table className="table table-sm table-nowrap card-table">
              <thead>
                <tr>
                  <th className="text-muted">{t("rank")}</th>
                  <th className="text-muted">{t("address")}</th>
                  <th className="text-muted text-end">
                    {t("balance")} (RENEC)
                  </th>
                  <th className="text-muted text-end">
                    {t("percent_of_header_supply", { header })}
                  </th>
                </tr>
              </thead>
              <tbody className="list">
                {accounts.map((account, index) =>
                  renderAccountRow(account, index, supplyCount)
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const renderAccountRow = (
  account: AccountBalancePair,
  index: number,
  supply: number
) => {
  return (
    <tr key={index}>
      <td>
        <span className="badge bg-gray-soft badge-pill">{index + 1}</span>
      </td>
      <td>
        <Address pubkey={account.address} link />
      </td>
      <td className="text-end">
        <SolBalance lamports={account.lamports} maximumFractionDigits={0} />
      </td>
      <td className="text-end">{`${((100 * account.lamports) / supply).toFixed(
        3
      )}%`}</td>
    </tr>
  );
};

const useQueryFilter = (): Filter => {
  const query = useQuery();
  const filter = query.get("filter");
  if (
    filter === "circulating" ||
    filter === "nonCirculating" ||
    filter === "all"
  ) {
    return filter;
  } else {
    return null;
  }
};

type DropdownProps = {
  filter: Filter;
  toggle: () => void;
  show: boolean;
};

const FilterDropdown = ({ filter, toggle, show }: DropdownProps) => {
  const { t } = useTranslation();

  const buildLocation = (location: Location, filter: Filter) => {
    const params = new URLSearchParams(location.search);
    if (filter === null) {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    return {
      ...location,
      search: params.toString(),
    };
  };

  const filterTitle = (filter: Filter): string => {
    switch (filter) {
      case "nonCirculating":
        return t("non_circulating");
      case "all":
        return t("all");
      case "circulating":
      default:
        return t("circulating");
    }
  };

  const FILTERS: Filter[] = ["all", null, "nonCirculating"];

  return (
    <div className="dropdown">
      <button className="btn border-base dropdown-toggle" onClick={toggle}>
        {filterTitle(filter)}
      </button>
      <div className={`dropdown-menu-end dropdown-menu${show ? " show" : ""}`}>
        {FILTERS.map((filterOption) => {
          return (
            <Link
              key={filterOption || "null"}
              to={(location) => buildLocation(location, filterOption)}
              className={`dropdown-item${
                filterOption === filter ? " active" : ""
              }`}
              onClick={toggle}
            >
              {filterTitle(filterOption)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
