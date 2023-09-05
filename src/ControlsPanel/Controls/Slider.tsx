import React from "react";
import type { ComponentProps } from "react";
import { Slider as BaseSlider } from "@mui/base/Slider";

import * as styles from "./Slider.css";

type BaseSliderProps = ComponentProps<typeof BaseSlider>;

type SliderProps = BaseSliderProps;

const slotProps: BaseSliderProps["slotProps"] = {
  root: { className: styles.CustomSlider },
  rail: { className: styles.CustomSliderRail },
  track: { className: styles.CustomSliderTrack },
  thumb: { className: styles.CustomSliderThumb },
};

export const Slider: React.FC<SliderProps> = ({ ...props }) => {
  return <BaseSlider slotProps={slotProps} {...props} />;
};
