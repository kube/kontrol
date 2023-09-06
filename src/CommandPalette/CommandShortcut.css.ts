import { style, globalStyle } from "@vanilla-extract/css";

import * as CommandPalette from "./CommandPalette.css";

export const CommandShortcut = style({
  fontFamily: "",
  flexGrow: 0,
  marginLeft: "6px",
  color: "white",
  fontWeight: 300,
});

globalStyle(`${CommandShortcut} kbd`, {
  display: "inline-block",
  padding: "1px 4px",
  borderRadius: "3px",
  fontSize: "0.8em",
  fontWeight: 400,
  fontFamily: "inherit",
  width: "24px",
  textAlign: "center",
  margin: "0 2px",

  lineHeight: "18px",
  border: "1px solid #FFFFFF31",
});

globalStyle(
  `${CommandPalette.CommandsListItem}${CommandPalette.Selected} ${CommandShortcut} kbd`,
  {
    color: "white",
    backgroundColor: "#ffffff2c",
  }
);
