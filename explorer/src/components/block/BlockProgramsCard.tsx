import React from "react";
import { BlockResponse, PublicKey } from "@solana/web3.js";
import { Address } from "components/common/Address";
import { TableCardBody } from "components/common/TableCardBody";
import { useTranslation } from "react-i18next";

export function BlockProgramsCard({ block }: { block: BlockResponse }) {
  const totalTransactions = block.transactions.length;
  const txSuccesses = new Map<string, number>();
  const txFrequency = new Map<string, number>();
  const ixFrequency = new Map<string, number>();
  const { t } = useTranslation();

  let totalInstructions = 0;
  block.transactions.forEach((tx) => {
    const message = tx.transaction.message;
    totalInstructions += message.instructions.length;
    const programUsed = new Set<string>();
    const trackProgram = (index: number) => {
      if (index >= message.accountKeys.length) return;
      const programId = message.accountKeys[index];
      const programAddress = programId.toBase58();
      programUsed.add(programAddress);
      const frequency = ixFrequency.get(programAddress);
      ixFrequency.set(programAddress, frequency ? frequency + 1 : 1);
    };

    message.instructions.forEach((ix) => trackProgram(ix.programIdIndex));
    tx.meta?.innerInstructions?.forEach((inner) => {
      totalInstructions += inner.instructions.length;
      inner.instructions.forEach((innerIx) =>
        trackProgram(innerIx.programIdIndex)
      );
    });

    const successful = tx.meta?.err === null;
    programUsed.forEach((programId) => {
      const frequency = txFrequency.get(programId);
      txFrequency.set(programId, frequency ? frequency + 1 : 1);
      if (successful) {
        const count = txSuccesses.get(programId);
        txSuccesses.set(programId, count ? count + 1 : 1);
      }
    });
  });

  const programEntries = [];
  for (let entry of txFrequency) {
    programEntries.push(entry);
  }

  programEntries.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });

  return (
    <>
      <div className="card">
        <div className="card-header align-items-center">
          <h3 className="card-header-title">{t("block_program_stats")}</h3>
        </div>
        <TableCardBody>
          <tr>
            <td className="w-100">{t("unique_program_count")}</td>
            <td className="text-lg-end font-monospace">
              {programEntries.length}
            </td>
          </tr>
          <tr>
            <td className="w-100">{t("total_instructions")}</td>
            <td className="text-lg-end font-monospace">{totalInstructions}</td>
          </tr>
        </TableCardBody>
      </div>
      <div className="card">
        <div className="card-header align-items-center">
          <h3 className="card-header-title">{t("block_programs")}</h3>
        </div>

        <div className="table-responsive mb-0">
          <table className="table table-sm table-nowrap card-table">
            <thead>
              <tr>
                <th className="text-muted">{t("program")}</th>
                <th className="text-muted">{t("transaction_count")}</th>
                <th className="text-muted">{t("percent_of_total")}</th>
                <th className="text-muted">{t("instruction_count")}</th>
                <th className="text-muted">{t("percent_of_total")}</th>
                <th className="text-muted">{t("success_rate")}</th>
              </tr>
            </thead>
            <tbody>
              {programEntries.map(([programId, txFreq]) => {
                const ixFreq = ixFrequency.get(programId) as number;
                const successes = txSuccesses.get(programId) || 0;
                return (
                  <tr key={programId}>
                    <td>
                      <Address pubkey={new PublicKey(programId)} link />
                    </td>
                    <td>{txFreq}</td>
                    <td>{((100 * txFreq) / totalTransactions).toFixed(2)}%</td>
                    <td>{ixFreq}</td>
                    <td>{((100 * ixFreq) / totalInstructions).toFixed(2)}%</td>
                    <td>{((100 * successes) / txFreq).toFixed(0)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
