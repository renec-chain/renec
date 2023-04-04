import React from "react";
import bs58 from "bs58";
import { CompiledInstruction, Message } from "@solana/web3.js";
import { TableCardBody } from "components/common/TableCardBody";
import { AddressWithContext, programValidator } from "./AddressWithContext";
import { useCluster } from "providers/cluster";
import { programLabel } from "utils/tx";
import { HexData } from "components/common/HexData";
import { useTranslation } from "react-i18next";

export function InstructionsSection({ message }: { message: Message }) {
  return (
    <>
      {message.instructions.map((ix, index) => {
        return <InstructionCard key={index} {...{ message, ix, index }} />;
      })}
    </>
  );
}

function InstructionCard({
  message,
  ix,
  index,
}: {
  message: Message;
  ix: CompiledInstruction;
  index: number;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const { cluster } = useCluster();
  const { t } = useTranslation();
  const programId = message.accountKeys[ix.programIdIndex];
  const programName = programLabel(programId.toBase58(), cluster) || "Unknown";

  return (
    <div className="card" id={`instruction-index-${index + 1}`} key={index}>
      <div className={`card-header${!expanded ? " border-bottom-none" : ""}`}>
        <h3 className="card-header-title mb-0 d-flex align-items-center">
          <span className={`badge bg-info-soft me-2`}>#{index + 1}</span>
          {t("program_instruction", { programName })}
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
      {expanded && (
        <TableCardBody>
          <tr>
            <td>{t("program")}</td>
            <td className="text-lg-end">
              <AddressWithContext
                pubkey={message.accountKeys[ix.programIdIndex]}
                validator={programValidator}
              />
            </td>
          </tr>
          {ix.accounts.map((accountIndex, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-start flex-column">
                    {t("account")} #{index + 1}
                    <span className="mt-1">
                      {accountIndex < message.header.numRequiredSignatures && (
                        <span className="badge bg-info-soft me-2">Signer</span>
                      )}
                      {message.isAccountWritable(accountIndex) && (
                        <span className="badge bg-danger-soft me-2">
                          {t("writable")}
                        </span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="text-lg-end">
                  <AddressWithContext
                    pubkey={message.accountKeys[accountIndex]}
                  />
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              {t("instruction_data")} <span className="text-muted">(Hex)</span>
            </td>
            <td className="text-lg-end">
              <HexData raw={bs58.decode(ix.data)} />
            </td>
          </tr>
        </TableCardBody>
      )}
    </div>
  );
}
