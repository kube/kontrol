import { createGlobalTheme, style } from "@vanilla-extract/css";

const theme = createGlobalTheme(":root", {
  color: {
    slider: "rgba(255, 255, 255, 0.2)",
    rail: "currentColor",
    track: "currentColor",
    thumb: "#919191",
  },
  height: {
    slider: "6px",
    rail: "2px",
    track: "2px",
    thumb: "10px",
  },
  padding: {
    slider: "10px 0 4px 0",
  },
  width: {
    slider: "100%",
  },
  borderRadius: {
    rail: "2px",
    track: "2px",
    thumb: "50%",
  },
  margin: {
    thumb: "-3px 0 0 -3px",
  },
  position: {
    rail: "absolute",
    track: "absolute",
    thumb: "absolute",
  },
  display: {
    slider: "inline-block",
    rail: "block",
    track: "block",
  },
  opacity: {
    rail: "0.4",
  },
  cursor: {
    slider: "pointer",
  },
  touchAction: {
    slider: "none",
  },
  outline: {
    thumb: "0",
  },
  backgroundColor: {
    rail: "currentColor",
    track: "currentColor",
    thumb: "#919191",
  },
  tapHighlightColor: {
    slider: "transparent",
  },
});

export const CustomSlider = style({
  color: theme.color.slider,
  height: theme.height.slider,
  width: theme.width.slider,
  padding: theme.padding.slider,
  display: theme.display.slider,
  position: "relative",
  cursor: theme.cursor.slider,
  touchAction: theme.touchAction.slider,
  WebkitTapHighlightColor: theme.tapHighlightColor.slider,
});

export const CustomSliderRail = style({
  display: theme.display.rail,
  position: theme.position.rail,
  width: theme.width.slider,
  height: theme.height.rail,
  borderRadius: theme.borderRadius.rail,
  backgroundColor: theme.backgroundColor.rail,
  opacity: theme.opacity.rail,
});

export const CustomSliderTrack = style({
  display: theme.display.track,
  position: theme.position.track,
  height: theme.height.track,
  borderRadius: theme.borderRadius.track,
  backgroundColor: theme.backgroundColor.track,
});

export const CustomSliderThumb = style({
  position: theme.position.thumb,
  width: theme.height.thumb,
  height: theme.height.thumb,
  margin: theme.margin.thumb,
  boxSizing: "border-box",
  borderRadius: theme.borderRadius.thumb,
  outline: theme.outline.thumb,
  backgroundColor: theme.backgroundColor.thumb,
});
