import { style } from "@vanilla-extract/css";

export const ControlLine = style({
  display: "flex",
  fontSize: "14px",
  lineHeight: 1.6,
  justifyContent: "space-between",
  margin: "2px 0",
  padding: "1px 4px",
  borderRadius: "3px",
  transition: "background-color 0.1s ease-in-out",

  selectors: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      "@media": {
        "(prefers-color-scheme: light)": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export const ControlLabel = style({
  display: "block",
  marginRight: "8px",
  fontSize: "12px",
  flexGrow: 1,
  height: "21px",
  lineHeight: "21px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const ControlState = style({
  flexGrow: 0,
});
