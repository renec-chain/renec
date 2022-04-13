import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";
// import { translate } from "@docusaurus/Translate";

const features = [
  // {
  //   title: <>⛏ Start Building</>,
  //   imageUrl: "developing/programming-model/overview",
  //   description: (
  //     <>Get started building your decentralized app or marketplace.</>
  //   ),
  // },
  {
    title: <>Run a Validator Node</>,
    imageUrl: "running-validator",
    description: (
      <>Validate transactions, secure the network, and earn rewards.</>
    ),
  },
  // {
  //   title: <>🏛 Create an SPL Token</>,
  //   imageUrl: "https://spl.solana.com/token",
  //   description: <>Launch your own SPL Token, Renec's equivalent of ERC-20.</>,
  // },
  // {
  //   title: <>🏦 Integrate an Exchange</>,
  //   imageUrl: "integrations/exchange",
  //   description: (
  //     <>
  //       Follow our extensive integration guide to ensure a seamless user
  //       experience.
  //     </>
  //   ),
  // },
  // {
  //   title: <>📲 Manage a Wallet</>,
  //   imageUrl: "wallet-guide",
  //   description: (
  //     <>Create a wallet, check your balance, and learn about wallet options.</>
  //   ),
  // },
  // {
  //   title: <>🤯 Learn How Renec Works</>,
  //   imageUrl: "cluster/overview",
  //   description: <>Get a high-level understanding of Renec's architecture.</>,
  // }, //
  // {
  //   title: <>Understand Our Economic Design</>,
  //   imageUrl: "implemented-proposals/ed_overview/ed_overview",
  //   description: (
  //     <>
  //       Renec's Economic Design provides a scalable blueprint for long term
  //       economic development and prosperity.
  //     </>
  //   ),
  // }
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <Link className="navbar__link" to={imgUrl}>
          <div className="card">
            <div className="card__header">
              <h3>{title}</h3>
            </div>
            <div className="card__body">
              <p>{description}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title="Homepage" description="Renec Documentation">
      {/* <header className={clsx("hero hero--primary", styles.heroBanner)}> */}
      {/* <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p> */}
      {/* <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div> */}
      {/* </div> */}
      {/* </header> */}
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <div className={clsx("col col--4", styles.feature)}>
                <Link
                  className="navbar__link"
                  to="developing/programming-model/overview"
                >
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="start-building">
                          ⛏ Start Building
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="get-started-building">
                          Get started building your decentralized app or
                          marketplace.
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
                          🎛 Run a Validator Node
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
                <Link
                  className="navbar__link"
                  to="https://spl.solana.com/token"
                >
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="create-spl">
                          🏛 Create an SPL Token
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="erc-20">
                          Launch your own SPL Token, Solana's equivalent of
                          ERC-20.
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="integrations/exchange">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="integrate-exchange">
                          🏦 Integrate an Exchange
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="integration-guide">
                          Follow our extensive integration guide to ensure a
                          seamless user experience.
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="wallet-guide">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="manage-wallet">
                          📲 Manage a Wallet
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="wallet-options">
                          Create a wallet, check your balance, and learn about
                          wallet options.
                        </Translate>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <Link className="navbar__link" to="cluster/overview">
                  <div className="card">
                    <div className="card__header">
                      <h3>
                        <Translate description="learn-how">
                          🤯 Learn How Solana Works
                        </Translate>
                      </h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate description="high-level">
                          Get a high-level understanding of Solana's
                          architecture.
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
