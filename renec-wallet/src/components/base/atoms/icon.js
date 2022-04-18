import React from "react";
import PropTypes from "prop-types";
import { COLORS_PALETTE, COLORS } from "../variables";

const BG_SHAPES = ["circle"];
const SIZES = [8, 12, 14, 16, 18, 20, 24, 30, 32, 36, 48, 60, 70, 100];
const ROTATIONS = [0, 90, 180, 270];

const Icon = React.memo(({
  testID,
  icon,
  size,
  color,
  bgShape,
  bgColor,
  rotate,
  onClick,
}) => {
  const hasBg = bgShape && bgColor;

  const svgProps = {
    fill: COLORS_PALETTE[color],
    width: size,
    height: size,
  };
  let containerStyle = {
      width: size,
      height: size,
  };

  if (!!onClick) {
    containerStyle = {
      ...containerStyle,
      cursor: "pointer",
    };
  }

  if (hasBg) {
    containerStyle = {
      ...containerStyle,
      backgroundColor: COLORS_PALETTE[bgColor],
      // Reserves 40% of size for background paddings
      padding: (size * 0.4) / 2,
    };

    if (bgShape === "circle") {
      containerStyle = {
        ...containerStyle,
        borderRadius: size / 2,
      };
    }

    // Reserves 60% of size for icon
    svgProps.width = size * 0.6;
    svgProps.height = size * 0.6;
  }

  return (
    <div style={containerStyle}>
      <img src={require(`../../../img/svgs/${icon}.svg`)?.default} {...svgProps} onClick={onClick} />
    </div>
  );
});

Icon.propTypes = {
  testID: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(SIZES).isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  bgShape: PropTypes.oneOf(BG_SHAPES),
  bgColor: PropTypes.oneOf(COLORS),
  rotate: PropTypes.oneOf(ROTATIONS),
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  size: 14,
  color: "secondary",
  bgColor: "primary",
};

export default Icon;

export { BG_SHAPES, SIZES, ROTATIONS };