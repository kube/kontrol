import { createGlobalTheme, style } from "@vanilla-extract/css";

const theme = createGlobalTheme(":root", {
  color: {
    light: {
      opacity: "0.36",
    },
    dark: {
      opacity: "0.54",
    },
  },
});

export const ControlGroup = style({
  padding: 0,
  marginTop: 0,
  borderRadius: "3px",
});

export const ControlGroupTitle = style({
  fontSize: "12px",
  fontWeight: 800,
  textTransform: "uppercase",
  padding: 0,
  margin: 0,
  userSelect: "none",
  opacity: theme.color.dark.opacity,

  "@media": {
    "(prefers-color-scheme: light)": {
      opacity: theme.color.light.opacity,
    },
  },
});

export const RootControlGroupContent = style({
  padding: "0 6px 9px 6px",
  margin: 0,
});

export const ControlGroupContent = style({
  transition: "border-left 0.2s ease-in-out",
  borderLeft: "1px solid transparent",
  marginLeft: "8px",
  overflow: "hidden",

  ":hover": {
    borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
  },
});

export const ControlGroupCurrentLevelControls = style({
  paddingLeft: "6px",
});
