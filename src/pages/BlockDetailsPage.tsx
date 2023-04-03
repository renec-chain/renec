import React from "react";

import { ErrorCard } from "components/common/ErrorCard";
import { BlockOverviewCard } from "components/block/BlockOverviewCard";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// IE11 doesn't support Number.MAX_SAFE_INTEGER
const MAX_SAFE_INTEGER = 9007199254740991;

type Props = { slot: string; tab?: string };

export function BlockDetailsPage({ slot, tab }: Props) {
  const { search } = useLocation();
  const { t } = useTranslation();
  const backURL = `/${search}`;
  const slotNumber = Number(slot);
  let output = <ErrorCard text={t("block_is_not_valid", { block: slot })} />;

  if (
    !isNaN(slotNumber) &&
    slotNumber < MAX_SAFE_INTEGER &&
    slotNumber % 1 === 0
  ) {
    output = <BlockOverviewCard slot={slotNumber} tab={tab} />;
  }

  return (
    <div className="container block-detail">
      <div className="mb-4 mt-4">
        <Link to={backURL}>
          <a className="mb-2 d-flex align-items-center block-detail__back-btn mb-2">
            <i className="fe fe-chevron-left" />
            <div className="mx-1" />
            <span>{t("back")}</span>
          </a>
        </Link>
        <h1 className="mb-0 fw-bold">{t("block_detail")}</h1>
      </div>
      {output}
    </div>
  );
}
