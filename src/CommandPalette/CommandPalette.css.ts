import { style, globalStyle } from "@vanilla-extract/css";

export const CommandPaletteContainer = style({
  position: "fixed",
  display: "block",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  overflow: "hidden",
  zIndex: 9999999999,
});

export const CommandPalette = style({
  margin: "22px auto",
  minWidth: "400px",
  maxWidth: "700px",
  width: "85%",
  backgroundColor: "black",
  overflow: "hidden",
  borderRadius: "6px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  fontFamily: "Arial, Helvetica, sans-serif",
});

export const Input = style({
  display: "block",
  width: "100%",
  height: "30px",
  padding: "9px",
  borderBottom: "1px solid #00000022",
  backgroundColor: "black",
  border: "none",

  ":focus": {
    outline: "none",
  },
});

export const CommandShortcut = style({
  flexGrow: 0,
  marginLeft: "6px",
  color: "white",
  fontWeight: 300,
});

export const Selected = style({});

export const CommandsList = style({
  margin: 0,
  padding: 0,
  listStyle: "none",
  maxHeight: "calc(100vh - 90px)",
  overflowX: "hidden",
  overflowY: "auto",
});

export const CommandsListItem = style({
  display: "flex",
  padding: "9px",
  borderBottom: "1px solid #00000022",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",

  ":hover": {
    backgroundColor: "#FFFFFF13",
  },
});

globalStyle(`${CommandsListItem}${Selected}`, {
  backgroundColor: "rgb(49, 96, 196)",
  color: "white",
});

globalStyle(`${CommandsListItem}${Selected}:hover`, {
  backgroundColor: "rgb(9, 87, 190)",
});

globalStyle(
  `${CommandsListItem}:active, ${CommandsListItem}${Selected}:hover:active`,
  {
    backgroundColor: "rgb(11, 59, 122)",
  }
);

globalStyle(`${CommandsListItem}${Selected} ${CommandShortcut} kbd`, {
  backgroundColor: "#ffffff2c",
});

globalStyle(`${CommandShortcut} kbd`, {
  display: "inline-block",
  padding: "2px 4px",
  borderRadius: "3px",
  fontSize: "0.8em",
  fontWeight: 400,
  fontFamily: "inherit",
  width: "22px",
  textAlign: "center",
  margin: "0 2px",
});

export const GroupName = style({
  flexGrow: 0,
  fontWeight: 300,
  opacity: 0.6,
  marginRight: "6px",
});

export const CommandLabel = style({
  flexGrow: 1,
});
