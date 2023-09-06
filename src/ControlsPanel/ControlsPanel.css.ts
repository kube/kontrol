import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "fixed",
  top: "20px",
  left: "20px",
  right: "20px",
  bottom: "20px",
  pointerEvents: "none",
  zIndex: 99999999999,
  fontFamily: "Arial, Helvetica, sans-serif",
});

export const Panel = style({
  pointerEvents: "all",
  display: "block",
  position: "fixed",
  zIndex: 1000000,
  fontFamily: "Inter, Arial, Helvetica, sans-serif",
  backgroundColor: "rgba(0, 0, 0, 0.85)",
  color: "white",
  borderRadius: "7px",
  padding: "0",
  width: "310px",
  userSelect: "none",
  border: "1px solid #444",
  backdropFilter: "blur(10px)",

  "@media": {
    "(prefers-color-scheme: light)": {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      color: "black",
      border: "1px solid #ccc",
    },
  },
});

export const PanelTitle = style({
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "uppercase",
  padding: "10px",
  userSelect: "none",
  opacity: 0.54,

  "@media": {
    "(prefers-color-scheme: light)": {
      opacity: 0.36,
    },
  },
});

export const PanelTitleButtons = style({
  float: "right",
});

export const PanelTitleButton = style({
  margin: "0 2px",
  padding: "5px 7px",
  lineHeight: "8px",
  borderRadius: "20px",
  border: "none",
});

export const NoControls = style({
  textAlign: "center",
  padding: "10px",
  marginBottom: "16px",
  fontSize: "12px",
  opacity: 0.54,
});
