import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";
// import { translate } from "@docusaurus/Translate";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title="Homepage" description="Renec Documentation">
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="staking">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="run-validator">
                          Staking
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="validate-transactions">
                          Delegate RENEC to validators and get rewards
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="running-validator">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="run-validator">
                          Run a Validator Node
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="validate-transactions">
                          Validate transactions, secure the network, and earn
                          rewards.
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="renec-wallet">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="manage-wallet">
                          Renec Wallet
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="wallet-options">
                          Create wallet and interact with Remitano network.
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="rpl-token">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="create-spl">
                          Create an RPL Token
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="erc-20">
                          Launch your own RPL Token, Renec's equivalent of
                          ERC-20.
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
