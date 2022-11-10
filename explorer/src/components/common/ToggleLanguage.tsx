import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { OverlayTrigger } from "react-bootstrap";
import classes from "classnames";
import { toUpper } from "lodash";

const LanguageSelectItem = ({
  value,
  label,
  onChangeLanguage,
  active,
}: any) => {
  const onClick = (e: any) => {
    e.stopPropagation();
    onChangeLanguage(value);
  };

  const className = classes("toggle-language__item px-3 py-2", {
    selected: active,
  });

  return (
    <div className={className} onClick={onClick}>
      {label}
    </div>
  );
};

const ToggleLanguage = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const [open, setOpen] = useState(false);

  const onChangeLanguage = (value: string) => {
    localStorage.setItem("lang", value);
    setOpen(false);
    changeLanguage(value);
  };

  const options = React.useMemo(
    () => [
      {
        value: "en",
        label: "English",
        active: language === "en",
      },
      {
        value: "vi",
        label: "Tiếng Việt",
        active: language === "vi",
      },
    ],
    [language]
  );

  const onHide = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const renderSelectLanguage = () => {
    return (
      <div className="toggle-language--menu shadow-sm py-1 rounded">
        {options.map((option) => (
          <LanguageSelectItem
            {...option}
            key={option.value}
            onChangeLanguage={onChangeLanguage}
          />
        ))}
      </div>
    );
  };

  return (
    <OverlayTrigger
      overlay={renderSelectLanguage()}
      onToggle={onHide}
      show={open}
      placement="bottom"
      rootClose
      trigger="click"
    >
      <span
        onClick={onOpen}
        className="toggle-language d-flex align-items-center"
      >
        <i className="fe fe-globe" />
        <span className="ml-8">{toUpper(language)}</span>
      </span>
    </OverlayTrigger>
  );
};

export default ToggleLanguage;
