import React from "react";
import { PublicKey } from "@solana/web3.js";
import { useUserDomains, DomainInfo } from "../../utils/name-service";
import { LoadingCard } from "components/common/LoadingCard";
import { ErrorCard } from "components/common/ErrorCard";
import { Address } from "components/common/Address";
import { useTranslation } from "react-i18next";

export function DomainsCard({ pubkey }: { pubkey: PublicKey }) {
  const [domains, domainsLoading] = useUserDomains(pubkey);
  const { t } = useTranslation();

  if (domainsLoading && (!domains || domains.length === 0)) {
    return <LoadingCard message={t("loading_domains")} />;
  } else if (!domains) {
    return <ErrorCard text={t("failed_to_fetch_domains")} />;
  }

  if (domains.length === 0) {
    return <ErrorCard text={t("no_domain_name_found")} />;
  }

  return (
    <div className="card">
      <div className="card-header align-items-center">
        <h3 className="card-header-title">{t("domain_name_owned")}</h3>
      </div>
      <div className="table-responsive mb-0">
        <table className="table table-sm table-nowrap card-table">
          <thead>
            <tr>
              <th className="text-muted">{t("domain_name")}</th>
              <th className="text-muted">{t("domain_address")}</th>
              <th className="text-muted">{t("domain_class_address")}</th>
            </tr>
          </thead>
          <tbody className="list">
            {domains.map((domain) => (
              <RenderDomainRow
                key={domain.address.toBase58()}
                domainInfo={domain}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RenderDomainRow({ domainInfo }: { domainInfo: DomainInfo }) {
  return (
    <tr>
      <td>{domainInfo.name}</td>
      <td>
        <Address pubkey={domainInfo.address} link />
      </td>
      <td>
        <Address pubkey={domainInfo.class} link />
      </td>
    </tr>
  );
}
