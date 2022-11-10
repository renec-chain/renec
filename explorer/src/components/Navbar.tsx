import React from "react";
import Logo from "img/logos/logo.png";
import { clusterPath } from "utils/url";
import { Link, NavLink } from "react-router-dom";
import { ClusterStatusButton } from "components/ClusterStatusButton";
import ToggleLanguage from "./common/ToggleLanguage";
import { Dropdown } from "react-bootstrap";

export function Navbar() {
  // TODO: use `collapsing` to animate collapsible navbar
  const [collapse, setCollapse] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        <Link to={clusterPath("/")} className="mr-2">
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/")} exact>
                Cluster Stats
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/supply")}>
                Supply
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/tx/inspector")}>
                Inspector
              </NavLink>
            </li>
          </ul>
          <Dropdown.Divider />
          <div className="d-md-none d-flex justify-content-start px-3">
            <ToggleLanguage />
          </div>
        </div>
        <div className="d-none d-md-flex">
          <ToggleLanguage />
        </div>
        <div className="d-none d-md-block">
          <ClusterStatusButton />
        </div>
      </div>
    </nav>
  );
}
