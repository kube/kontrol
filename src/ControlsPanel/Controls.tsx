import React from "react";

import * as styles from "./Controls.css";
import { Slider } from "./Controls/Slider";
import type {
  Control,
  ControlType,
  ReturnTypeFromType,
} from "../Kontrol/context";
import { ColorPicker } from "./Controls/ColorPicker";
import { Select as BaseSelect } from "./Controls/Select";
import { Toggle as BaseToggle } from "./Controls/Toggle";

type ControlProps<T extends ControlType> = {
  control: Control<T>;
  value: ReturnTypeFromType<T>;
  update: (control: Control<T>, value: ReturnTypeFromType<T>) => void;
};

export const Toggle: React.FC<ControlProps<"Toggle">> = ({
  control,
  value,
  update,
}) => {
  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <BaseToggle
        id={`input-${control.label}`}
        checked={value}
        onChange={(e) => update(control, e.target.checked)}
      />
    </div>
  );
};

export const Number: React.FC<ControlProps<"Number">> = ({
  control,
  value,
  update,
}) => {
  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <Slider
        style={{ width: 160 }}
        id={`input-${control.label}`}
        min={control.min}
        max={control.max}
        step={control.step}
        value={value}
        onChange={(e) => {
          e.stopPropagation();
          e.preventDefault();
          update(control, parseInt(e.target.value));
        }}
      />
    </div>
  );
};

export const Select: React.FC<ControlProps<"Select">> = ({
  control,
  value,
  update,
}) => {
  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <BaseSelect control={control} value={value} update={update} />
    </div>
  );
};

export const Color: React.FC<ControlProps<"Color">> = ({
  control,
  value,
  update,
}) => {
  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <ColorPicker
        id={`input-${control.label}`}
        value={value}
        onChange={(e) => update(control, e.target.value)}
      />
    </div>
  );
};
