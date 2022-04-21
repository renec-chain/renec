import React, { useState } from "react";
import PropTypes from "prop-types";
import { mapValues } from "lodash-es";

import { COLORS_PALETTE } from "../variables";

const variantMap = {
  success: ["success", "success-lightest"],
  danger: ["danger", "danger-lightest"],
  warning: ["warning", "warning-lightest"],
  info: ["info", "info-lightest"],
};

const ALERT_VARIANTS = Object.keys(variantMap);

const styles = {
  alert: {
    padding: 10,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
  },
  alertDismissible: {
    paddingRight: 40,
  },
  alertSmScreen: {
    padding: 14,
  },
  dismissible: {
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  dismissibleSmScreen: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
};

const variantStyles = mapValues(variantMap, ([borderColor, backgroundColor]) => ({
  borderColor: COLORS_PALETTE[borderColor],
  backgroundColor: COLORS_PALETTE[backgroundColor],
}));

const Alert = ({
  children,
  variant,
  dismissible,
  onDismiss,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const textProps = { size: 14, color: "base" };

  const alertStyle = {
    ...styles.alert,
    ...variantStyles[variant],
  };

  const dismissibleStyle = styles.dismissible;

  const handleClick = (e) => {
    setIsOpen(false);
    onDismiss(e);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div style={alertStyle}>
      <div {...textProps}>{children}</div>

      {dismissible && (
        <div onPress={handleClick} style={dismissibleStyle} testID="dismiss-icon">
          <span size={24} color="base" bold>×</span>
        </div>
      )}
    </div>
  );
};

Alert.propTypes = {
  testID: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(ALERT_VARIANTS),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  variant: "success",
  dismissible: false,
  onDismiss: f => f,
};

export default Alert;

export {
  Alert,
  ALERT_VARIANTS,
};