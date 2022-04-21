import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  TEXT_COLORS,
  TEXT_SIZES,
  sizeMap,
} from "../variables";
import { ALERT_VARIANTS } from "../atoms/alert";
import Icon from "../atoms/icon";

const TYPES = ALERT_VARIANTS;

const styles = {
  container: {
    flexDirection: "row",
    display: "flex",
  },
  icon: {
    justifyContent: "center",
    marginRight: 8,
  },
  title: {
    marginRight: 8,
    fontWeight: "bold",
  },
  message: {
    flexShrink: 1,
  },
};

const Message = ({
  testID,
  type,
  title,
  message,
  textSize,
  textColor,
}) => {
  const [lineHeight] = sizeMap[textSize];
  const textProps = { size: textSize, color: textColor };

  const iconStyle = {
    ...styles.icon,
    height: lineHeight,
  };

  const shouldRenderTitle = !!title;

  return (
    <div
      style={styles.container}
    >
      <div style={iconStyle}>
        <Icon icon={type} color={type} size={16} />
      </div>

      {shouldRenderTitle && (
        <div style={styles.title}>
          <span {...textProps} bold>{title}</span>
        </div>
      )}

      <div style={styles.message}>
        <div {...textProps}>
          {message}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf(TYPES).isRequired,
  textSize: PropTypes.oneOf(TEXT_SIZES),
  textColor: PropTypes.oneOf(TEXT_COLORS),
};

Message.defaultProps = {
  type: "info",
  textSize: 14,
  textColor: "base",
};

export default Message;

export {
  Message,
  TYPES,
};