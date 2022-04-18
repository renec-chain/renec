const ALIGNMENTS = ["left", "center", "right"];
const COLORS_PALETTE = {
  transparent: "rgba(0,0,0,0)",

  white: "#FFFFFF",

  "primary-dark": "#9354AC",
  primary: "#9B59B6",
  "primary-lightest": "#F0E9F2",

  "secondary-dark": "#59535D",
  secondary: "#F3F3F5",
  "secondary-light": "#A29DA5",
  "secondary-lightest": "#EAEAEC",

  "success-dark": "#26957B",
  success: "#299D82",
  "success-lightest": "#F5FBFB",

  "danger-dark": "#DA5151",
  danger: "#E65656",
  "danger-lightest": "#FEF8F7",

  warning: "#FFAB00",
  "warning-lightest": "#FEFDF3",

  info: "#308CD5",
  "info-lightest": "#F4F9FD",

  "muted-darker": "#8C8C8C",
  muted: "#BEBEBE",
  "muted-lighter": "#F3F3F3",

  "gray-darkest": "#49474A",
  "gray-darker": "#767478",
  "gray-dark": "#99999B",
  gray: "#B8B7BE",
  "gray-light": "#D8D9DE",
  "gray-lighter": "#EBECF0",
  "gray-lightest": "#FBFBFC",

  "ghost-dark": "#F3F3F5",
  ghost: "#F8F8FA",

  "violet-dark": "#210C34",
  violet: "#27133A",
  "violet-light": "#2F1C41",
  "violet-lighter": "#41225D",
  "violet-lightest": "#3F2D4F",

  twitter: "#55ACEE",
  facebook: "#3B5998",
  apple: "#323232",
  weibo: "#DF2029",
  renren: "#005BAA",
  reddit: "#FF2A00",
  simplex: "#6ECF69",

  btc: "#f7931a",
  eth: "#0a5483",
  usdt: "#00a17b",
  bch: "#478558",
  ltc: "#d3d3d3",
  xrp: "#018ac4",
  bnb: "#ad8107",
};
const COLORS = Object.keys(COLORS_PALETTE);
const ZINDEXES = {
  toast: 10000,
};

const sizeMap = {
  4: [4, 0],
  8: [12, 0],
  10: [16, 0],
  12: [18, 0.32],
  14: [20, 0.16],
  16: [24, 0],
  18: [26, 0],
  20: [32, 0],
  24: [32, 0],
  28: [36, 0],
  32: [40, 0],
  36: [48, 0],
  40: [48, 0],
  48: [48, 0],
};
const TEXT_SIZES = Object.keys(sizeMap).map(size => (isNaN(size) ? size : parseInt(size, 10)));
const TEXT_COLORS = [
  "base", "base-light",
  "primary", "secondary", "secondary-light", "success", "danger", "info", "muted-darker", "muted", "warning",
  "white", "gray-darker", "gray-dark", "gray-light", "gray-lighter",
  "btc", "simplex",
];

export {
  ALIGNMENTS,
  COLORS, COLORS_PALETTE, ZINDEXES,
  TEXT_SIZES, TEXT_COLORS, sizeMap,
};
