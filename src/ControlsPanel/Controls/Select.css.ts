import { createGlobalTheme, style } from "@vanilla-extract/css";

import { optionClasses } from "@mui/base/Option";

const vars = createGlobalTheme(":root", {
  color: {
    white: "white",
    black: "black",
    grey: "grey",
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

export const CustomSelect = style({
  position: "relative",
  fontSize: vars.font.size.small,
  boxSizing: "border-box",
  width: "160px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  padding: "2px 4px",
  borderRadius: vars.borderRadius.small,
  textAlign: "left",
  background: `rgba(255, 255, 255, 0.1)`,
  color: vars.color.white,
  transitionProperty: "all",
  transitionTimingFunction: vars.transition.timingFunction,
  transitionDuration: vars.transition.duration,
  ":hover": {
    background: `rgba(255, 255, 255, 0.2)`,
  },
  "::after": {
    position: "absolute",
    right: "4px",
    top: "3px",
    content: '"▾"',
    opacity: 0.7,
  },
});

export const CustomSelectListbox = style({
  fontFamily: vars.font.family.sans,
  boxSizing: "border-box",
  fontSize: vars.font.size.small,
  padding: 0,
  margin: 0,
  minWidth: "160px",
  borderRadius: vars.borderRadius.small,
  overflow: "auto",
  outline: "0px",
  background: vars.color.black,
  color: vars.color.white,
  border: `1px solid rgba(255, 255, 255, 0.3)`,
});

export const CustomSelectPopper = style({
  zIndex: 99999999999,
});

export const CustomSelectOption = style({
  listStyle: "none",
  padding: "3px",
  userSelect: "none",
  cursor: "default",
  opacity: 0.8,
  ":last-of-type": {
    borderBottom: "none",
  },
  selectors: {
    [`&.${optionClasses.highlighted}`]: {
      opacity: 0.9,
      background: `rgba(255, 255, 255, 0.2)`,
    },
    [`&.${optionClasses.selected}`]: {
      opacity: 1,
      background: "blue",
    },
  },
});
