import React, { type ComponentProps } from "react";

import { Switch as BaseSwitch } from "@mui/base";

import * as styles from "./Toggle.css";

export const Toggle: typeof BaseSwitch = ({ ...props }) => {
  const slotProps: ComponentProps<typeof BaseSwitch>["slotProps"] = {
    root: { className: styles.CustomSwitchIntroduction },
    thumb: { className: styles.CustomSwitchIntroductionThumb },
    track: { className: styles.CustomSwitchIntroductionTrack },
    input: {
      label: props.label,
      className: styles.CustomSwitchIntroductionInput,
    },
  };

  return <BaseSwitch slotProps={slotProps} {...props} />;
};
