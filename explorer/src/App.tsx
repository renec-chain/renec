import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ClusterModal } from "components/ClusterModal";
import { MessageBanner } from "components/MessageBanner";
import { Navbar } from "components/Navbar";
import { ClusterStatusBanner } from "components/ClusterStatusButton";
import { SearchBar } from "components/SearchBar";

import { AccountDetailsPage } from "pages/AccountDetailsPage";
import { TransactionInspectorPage } from "pages/inspector/InspectorPage";
import { ClusterStatsPage } from "pages/ClusterStatsPage";
import { SupplyPage } from "pages/SupplyPage";
import { TransactionDetailsPage } from "pages/TransactionDetailsPage";
import { BlockDetailsPage } from "pages/BlockDetailsPage";
import { EpochDetailsPage } from "pages/EpochDetailsPage";
import Footer from "./components/Footer";
import "./i18n";
import { useTranslation } from "react-i18next";

const ADDRESS_ALIASES = ["account", "accounts", "addresses"];
const TX_ALIASES = ["txs", "txn", "txns", "transaction", "transactions"];

function App() {
  const { t } = useTranslation();

  return (
    <>
      <ClusterModal />
      <div className="main-content d-flex flex-column">
        <Navbar />
        <MessageBanner />
        <ClusterStatusBanner />
        <div className="container mt-4 pt-md-4">
          <h1 className="main-content__title">
            {t("explore_renec_blockchain")}
          </h1>
        </div>
        <SearchBar />
        <Switch>
          <Route exact path={["/supply", "/accounts", "accounts/top"]}>
            <SupplyPage />
          </Route>
          <Route
            exact
            path={TX_ALIASES.map((tx) => `/${tx}/:signature`)}
            render={({ match, location }) => {
              let pathname = `/tx/${match.params.signature}`;
              return <Redirect to={{ ...location, pathname }} />;
            }}
          />
          <Route
            exact
            path={["/tx/inspector", "/tx/:signature/inspect"]}
            render={({ match }) => (
              <TransactionInspectorPage signature={match.params.signature} />
            )}
          />
          <Route
            exact
            path={"/tx/:signature"}
            render={({ match }) => (
              <TransactionDetailsPage signature={match.params.signature} />
            )}
          />
          <Route
            exact
            path={"/epoch/:id"}
            render={({ match }) => <EpochDetailsPage epoch={match.params.id} />}
          />
          <Route
            exact
            path={["/block/:id", "/block/:id/:tab"]}
            render={({ match }) => (
              <BlockDetailsPage slot={match.params.id} tab={match.params.tab} />
            )}
          />
          <Route
            exact
            path={[
              ...ADDRESS_ALIASES.map((path) => `/${path}/:address`),
              ...ADDRESS_ALIASES.map((path) => `/${path}/:address/:tab`),
            ]}
            render={({ match, location }) => {
              let pathname = `/address/${match.params.address}`;
              if (match.params.tab) {
                pathname += `/${match.params.tab}`;
              }
              return <Redirect to={{ ...location, pathname }} />;
            }}
          />
          <Route
            exact
            path={["/address/:address", "/address/:address/:tab"]}
            render={({ match }) => (
              <AccountDetailsPage
                address={match.params.address}
                tab={match.params.tab}
              />
            )}
          />
          <Route exact path="/">
            <ClusterStatsPage />
          </Route>
          <Route
            render={({ location }) => (
              <Redirect to={{ ...location, pathname: "/" }} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
