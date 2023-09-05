import { style } from "@vanilla-extract/css";

export const ColorPicker = style({
  flexGrow: 0,
  MozAppearance: "none",
  WebkitAppearance: "none",
  appearance: "none",
  padding: 0,
  border: "none",
  width: 42,
  height: 21,
  background: "none",

  selectors: {
    "&::-webkit-color-swatch-wrapper": {
      padding: 0,
      border: "none",
      background: "none",
    },

    "&::-webkit-color-swatch": {
      margin: 0,
      padding: 0,
      borderRadius: 6,
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },

    "&::-moz-color-swatch": {
      borderRadius: 6,
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },

    "&::-moz-focus-inner": {
      padding: 0,
    },
  },
});
