import React from "react";
import { Message, PublicKey } from "@solana/web3.js";
import { TableCardBody } from "components/common/TableCardBody";
import { AddressWithContext } from "./AddressWithContext";
import { ErrorCard } from "components/common/ErrorCard";
import { useTranslation } from "react-i18next";

export function AccountsCard({ message }: { message: Message }) {
  const [expanded, setExpanded] = React.useState(true);
  const { t } = useTranslation();

  const { validMessage, error } = React.useMemo(() => {
    const {
      numRequiredSignatures,
      numReadonlySignedAccounts,
      numReadonlyUnsignedAccounts,
    } = message.header;

    if (numReadonlySignedAccounts >= numRequiredSignatures) {
      return { validMessage: undefined, error: t("invalid_header") };
    } else if (numReadonlyUnsignedAccounts >= message.accountKeys.length) {
      return { validMessage: undefined, error: t("invalid_header") };
    } else if (message.accountKeys.length === 0) {
      return { validMessage: undefined, error: t("message_has_no_accounts") };
    }

    return {
      validMessage: message,
      error: undefined,
    };
  }, [message, t]);

  const accountRows = React.useMemo(() => {
    const message = validMessage;
    if (!message) return;
    return message.accountKeys.map((publicKey, accountIndex) => {
      const {
        numRequiredSignatures,
        numReadonlySignedAccounts,
        numReadonlyUnsignedAccounts,
      } = message.header;

      let readOnly = false;
      let signer = false;
      if (accountIndex < numRequiredSignatures) {
        signer = true;
        if (accountIndex >= numRequiredSignatures - numReadonlySignedAccounts) {
          readOnly = true;
        }
      } else if (
        accountIndex >=
        message.accountKeys.length - numReadonlyUnsignedAccounts
      ) {
        readOnly = true;
      }

      const props = {
        accountIndex,
        publicKey,
        signer,
        readOnly,
      };

      return <AccountRow key={accountIndex} {...props} />;
    });
  }, [validMessage]);

  if (error) {
    return <ErrorCard text={`${t("unable_to_display_account")} ${error}`} />;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-header-title">
          {`Account List (${message.accountKeys.length})`}
        </h3>
        <button
          className={`btn btn-sm d-flex ${
            expanded ? "btn-black active" : "btn-white"
          }`}
          onClick={() => setExpanded((e) => !e)}
        >
          {t(expanded ? "collapse" : "expand")}
        </button>
      </div>
      {expanded && <TableCardBody>{accountRows}</TableCardBody>}
    </div>
  );
}

function AccountRow({
  accountIndex,
  publicKey,
  signer,
  readOnly,
}: {
  accountIndex: number;
  publicKey: PublicKey;
  signer: boolean;
  readOnly: boolean;
}) {
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        <div className="d-flex align-items-start flex-column">
          {t("account")} #{accountIndex + 1}
          <span className="mt-1">
            {signer && (
              <span className="badge bg-info-soft me-1">{t("signer")}</span>
            )}
            {!readOnly && (
              <span className="badge bg-danger-soft">{t("writable")}</span>
            )}
          </span>
        </div>
      </td>
      <td className="text-lg-end">
        <AddressWithContext pubkey={publicKey} />
      </td>
    </tr>
  );
}
