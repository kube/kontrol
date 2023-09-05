import { style, createGlobalTheme } from "@vanilla-extract/css";

import { switchClasses } from "@mui/base/Switch";

const WIDTH = 36;
const HEIGHT = 16;

const vars = createGlobalTheme(":root", {
  color: {
    white: "white",
    black: "black",
    grey: {
      400: "rgba(255, 255, 255, 0.4)",
      500: "rgba(255, 255, 255, 0.5)",
    },
    cyan: {
      500: "#00cc44",
    },
  },
  font: {
    family: {
      sans: "Inter",
    },
    size: {
      small: "12px",
      medium: "0.875rem",
    },
  },
  transition: {
    timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: "120ms",
  },
  borderRadius: {
    small: "2px",
    medium: "4px",
    large: "8px",
  },
});

export const CustomSwitchIntroduction = style({
  fontSize: 0,
  position: "relative",
  display: "inline-block",
  width: WIDTH,
  height: HEIGHT,
  margin: "2px 0",
  cursor: "pointer",

  selectors: {
    [`&.${switchClasses.disabled}`]: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
  },
});

export const CustomSwitchIntroductionTrack = style({
  background: vars.color.grey[400],
  borderRadius: "16px",
  display: "block",
  height: "100%",
  width: "100%",
  position: "absolute",

  [`.${switchClasses.checked} &`]: {
    backgroundColor: vars.color.cyan[500],
  },
});

export const CustomSwitchIntroductionThumb = style({
  display: "block",
  width: HEIGHT,
  height: HEIGHT,
  top: 0,
  left: 0,
  borderRadius: "16px",
  backgroundColor: "#fff",
  position: "relative",

  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "120ms",

  [`.${switchClasses.focusVisible} &`]: {
    backgroundColor: vars.color.grey[500],
    boxShadow: "0 0 1px 8px rgba(0, 0, 0, 0.25)",
  },

  [`.${switchClasses.checked} &`]: {
    left: `${WIDTH - HEIGHT}px`,
    backgroundColor: "#fff",
  },
});

export const CustomSwitchIntroductionInput = style({
  cursor: "inherit",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  opacity: 0,
  zIndex: 1,
  margin: 0,
});
