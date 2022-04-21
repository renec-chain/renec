import React, { useContext } from "react";
import PropTypes from "prop-types";
import { COLORS_PALETTE } from "../variables";
import { ArmFlex } from "mdi-material-ui";

const calculateTextColorName = (variant, outline, disabled, color) => {
  if (disabled) return "muted-darker";
  if (outline) return "base";
  if (variant === "tertiary" || variant === "secondary") return "base";
  if (variant === "violet-light") return "muted";
  if (color) return color;

  return "white";
};

const calculateBgColorName = (variant, outline, disabled, color) => {
  if (disabled) {
    return outline ? "muted-lighter" : "muted";
  }
  if (outline) return "white";
  if (variant === "tertiary") return "gray-lighter";
  if (variant === "transparent") return "transparent";
  if (color) return color;

  return variant;
};

const calculateBorderColorName = (variant, outline, disabled, color) => {
  if (disabled) {
    return outline ? "muted-darker" : "muted";
  }

  if (variant === "tertiary") {
    return outline ? "gray-light" : "gray-lighter";
  }

  if (color) return color;

  return variant;
};

const calculatePaddings = ({
  size,
  wider,
  isTextInputSupport,
}) => {
  const normalStyleMap = {
    // [paddingVertical, paddingHorizontal, minHeight]
    xs: [7, 7, 36],
    md: [7, 15, 40],
    lg: [11, 15, 48],
    xl: [19, 15, 64],
  };
  const textInputSupportStyleMap = {
    xs: [5, 7, 32],
    md: [7, 7, 40],
  };

  let [
    paddingVertical, // eslint-disable-line prefer-const
    paddingHorizontal,
    minHeight, // eslint-disable-line prefer-const
  ] = isTextInputSupport
    ? textInputSupportStyleMap[size]
    : normalStyleMap[size];

  if (wider) {
    paddingHorizontal += 8;
  }

  return {
    minHeight,
    paddingVertical,
    paddingHorizontal,
  };
};

const calculateButtonStyle = ({
  size,
  wider,
  block,
  variant,
  outline,
  disabled,
  align,
  alignItems,
  isTextInputSupport,
  fullWidth,
  color,
}) => {
  const paddings = calculatePaddings({
    size,
    wider,
    outline,
    isTextInputSupport,
  });
  const bgColorName = calculateBgColorName(variant, outline, disabled, color);
  const borderColorName = calculateBorderColorName(variant, outline, disabled, color);

  let alignSelf;

  if (!block) {
    alignSelf = ({
      left: "flex-start",
      right: "flex-end",
      center: "center",
    })[align];
  }

  return {
    ...paddings,
    alignSelf,
    alignItems,
    justifyContent: "center",
    backgroundColor: COLORS_PALETTE[bgColorName],
    borderRadius: 4,
    border: `1px solid ${COLORS_PALETTE[borderColorName]}`,
    width: fullWidth ? "100%" : null,
    cursor: "pointer",
    display: "flex",
    paddingLeft: 12,
    paddingRight: 12,
  };
};

const calculateTextStyle = ({
  buttonSize,
  variant,
  outline,
  disabled,
  bold,
  color,
}) => {
  const fontSize = {
    xs: 14,
    xl: 18,
  }[buttonSize] || 16;
  const textColorName = calculateTextColorName(variant, outline, disabled, color);

  return {
    fontWeight: bold ? "bold" : "normal",
    color: textColorName,
    fontSize: fontSize,
  };
};

const RButton = (props) => {
  const {
    children,
    size,
    bold,
    wider,
    block,
    variant,
    outline,
    disabled,
    align,
    alignItems,
    onClick,
    loading,
    icon,
    iconRight,
    fullWidth,
    color,
    className,
  } = props;

  const buttonStyle = calculateButtonStyle({
    size,
    wider,
    block,
    variant,
    outline,
    disabled,
    align,
    alignItems,
    fullWidth,
    color,
  });
  const textStyle = calculateTextStyle({
    buttonSize: size,
    variant,
    outline,
    disabled,
    bold,
    color,
  });

  let childrenView = Boolean(children) && children;

  if (icon) {
    childrenView = iconRight
      ? (
        <>
          {Boolean(childrenView) && childrenView}
          <span className="ml-8">{icon}</span>
        </>
      )
      : (
        <>
          <span className="mr-8">{icon}</span>
          {Boolean(childrenView) && childrenView}
        </>
      );
  }

  return (
    <button
      style={{...buttonStyle, ...textStyle}} 
      disabled={disabled} 
      onClick={onClick}
      className={className}
    >
      {childrenView}
    </button>
  );
};

const BUTTON_SIZES = ["xs", "md", "lg", "xl"];
const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "danger",
  "facebook",
  "twitter",
  "reddit",
  "apple",
  "violet-light",
  "violet-lightest",
  "white",
];
const BUTTON_ALIGNMENTS = ["left", "right", "center"];
const BUTTON_ALIGN_ITEMS_VALUES = ["center", "flex-start"];

RButton.propTypes = {
  size: PropTypes.oneOf(BUTTON_SIZES).isRequired,
  variant: PropTypes.oneOf(BUTTON_VARIANTS).isRequired,
  fullWidth: PropTypes.bool,
  bold: PropTypes.bool,
  wider: PropTypes.bool,
  block: PropTypes.bool,
  outline: PropTypes.bool,
  align: PropTypes.oneOf(BUTTON_ALIGNMENTS).isRequired,
  alignItems: PropTypes.oneOf(BUTTON_ALIGN_ITEMS_VALUES).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  iconRight: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
};

RButton.defaultProps = {
  size: "md",
  variant: "primary",
  align: "left",
  alignItems: "center",
  fullWidth: false,
  onClick: f => f,
};

export default RButton;

export {
  RButton,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  BUTTON_ALIGNMENTS,
  BUTTON_ALIGN_ITEMS_VALUES,
  calculateButtonStyle,
};