import React from "react";
import bs58 from "bs58";
import { Connection, Message, Transaction } from "@solana/web3.js";
import { useCluster } from "providers/cluster";
import { InstructionLogs, prettyProgramLogs } from "utils/program-logs";
import { ProgramLogsCardBody } from "components/ProgramLogsCardBody";
import { useTranslation } from "react-i18next";

const DEFAULT_SIGNATURE = bs58.encode(Buffer.alloc(64).fill(0));

export function SimulatorCard({ message }: { message: Message }) {
  const { cluster } = useCluster();
  const {
    simulate,
    simulating,
    simulationLogs: logs,
    simulationError,
  } = useSimulator(message);
  const { t } = useTranslation();

  if (simulating) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-header-title">{t("transaction_simulation")}</h3>
        </div>
        <div className="card-body text-center">
          <span className="spinner-grow spinner-grow-sm me-2"></span>
          {t("simulating")}
        </div>
      </div>
    );
  } else if (!logs) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-header-title">{t("transaction_simulation")}</h3>
          <button className="btn btn-sm d-flex btn-white" onClick={simulate}>
            Simulate
          </button>
        </div>
        {simulationError ? (
          <div className="card-body">
            {t("failed_to_run_simulation")}:
            <span className="text-warning ms-2">{simulationError}</span>
          </div>
        ) : (
          <div className="card-body text-muted">
            <ul>
              <li>{t("simulation_note_0")}</li>
              <li>{t("simulation_note_1")}</li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-header-title">{t("transaction_simulation")}</h3>
        <button className="btn btn-sm d-flex btn-white" onClick={simulate}>
          Retry
        </button>
      </div>
      <ProgramLogsCardBody message={message} logs={logs} cluster={cluster} />
    </div>
  );
}

function useSimulator(message: Message) {
  const { cluster, url } = useCluster();
  const [simulating, setSimulating] = React.useState(false);
  const [logs, setLogs] = React.useState<Array<InstructionLogs> | null>(null);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    setLogs(null);
    setSimulating(false);
    setError(undefined);
  }, [url]);

  const onClick = React.useCallback(() => {
    if (simulating) return;
    setError(undefined);
    setSimulating(true);

    const connection = new Connection(url, "confirmed");
    (async () => {
      try {
        const tx = Transaction.populate(
          message,
          new Array(message.header.numRequiredSignatures).fill(
            DEFAULT_SIGNATURE
          )
        );

        // Simulate without signers to skip signer verification
        const resp = await connection.simulateTransaction(tx);
        if (resp.value.logs === null) {
          throw new Error("Expected to receive logs from simulation");
        }

        // Prettify logs
        setLogs(prettyProgramLogs(resp.value.logs, resp.value.err, cluster));
      } catch (err) {
        console.error(err);
        setLogs(null);
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setSimulating(false);
      }
    })();
  }, [cluster, url, message, simulating]);
  return {
    simulate: onClick,
    simulating,
    simulationLogs: logs,
    simulationError: error,
  };
}
