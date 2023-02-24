import { ClusterStatusButton } from "components/ClusterStatusButton";
import Logo from "img/logos/logo.png";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { clusterPath } from "utils/url";
import ToggleLanguage from "./common/ToggleLanguage";

export function Navbar() {
  // TODO: use `collapsing` to animate collapsible navbar
  const [collapse, setCollapse] = React.useState(false);
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        <Link to={clusterPath("/")} className="navbar--logo">
          <img height={28} src={Logo} alt="RENEC Explorer" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapse((value) => !value)}
        >
          <i className="fe fe-menu" />
        </button>

        <div className={`collapse navbar-collapse ${collapse ? "show" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/")} exact>
                {t("dashboard")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/validators")}>
                {t("validators")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/blocks")}>
                {t("blocks")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/transactions")}>
                {t("transactions")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/supply")}>
                {t("supply")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/tx/inspector")}>
                {t("inspector")}
              </NavLink>
            </li>
          </ul>
          <Dropdown.Divider />
          <div className="d-md-none d-flex justify-content-start px-3">
            <ToggleLanguage />
          </div>
        </div>
        <div className="d-none d-md-block navbar--status">
          <div className="d-flex">
            <ClusterStatusButton />
            <div className="m-lg-3 m-sm-2" />
            <ToggleLanguage />
          </div>
        </div>
      </div>
    </nav>
  );
}
