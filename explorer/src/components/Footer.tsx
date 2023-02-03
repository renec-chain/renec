import React from "react";
import Logo from "../img/logos/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const resources = [
    {
      id: 1,
      label: "Whitepaper",
      link: "https://renec.foundation/renec-whitepaper.pdf",
    },
    {
      id: 2,
      label: t("terms"),
      link: "https://renec.foundation/terms-of-service",
    },
  ];

  const connecteds = [
    {
      id: 1,
      label: t("about_us"),
      link: "whitepaper",
    },
    {
      id: 2,
      label: "Twitter",
      link: "https://twitter.com/RenecBlockchain",
    },
    {
      id: 3,
      label: "Telegram",
      link: "https://t.me/renecblockchain",
    },
    {
      id: 4,
      label: "Reddit",
      link: "https://www.reddit.com/r/renecblockchain",
    },
    {
      id: 5,
      label: "Discord",
      link: "https://discord.gg/3DcncaVwxR",
    },
  ];

  return (
    <div className="footer">
      <div className="container">
        <div className="font-weight-light">
          <img className="footer__logo" src={Logo} alt="logo" height={32} />
          <div>© RENEC Foundation</div>
          <div>All rights reserved</div>
        </div>
        <div className="d-flex footer--resources">
          <div className="footer--resources__item">
            <div className="text-primary">{t("resources")}</div>
            {resources.map((it) => (
              <div className="footer--resources__item--link" key={it.id}>
                <a target="_blank" rel="noreferrer" href={it.link}>
                  {it.label}
                </a>
              </div>
            ))}
          </div>
          <div className="footer--resources__item">
            <div className="text-primary">{t("get_connected")}</div>
            {connecteds.map((it) => (
              <div className="footer--resources__item--link" key={it.id}>
                <a target="_blank" rel="noreferrer" href={it.link}>
                  {it.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
