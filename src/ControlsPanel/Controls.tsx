import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

import * as styles from "./Controls.css";
import { Slider } from "./Controls/Slider";
import type {
  Control,
  ControlType,
  ReturnTypeFromType,
} from "../Kontrol/inference";
import { ColorPicker } from "./Controls/ColorPicker";
import { Select as BaseSelect } from "./Controls/Select";
import { Toggle as BaseToggle } from "./Controls/Toggle";

type ControlProps<T extends ControlType> = {
  control: Control<T>;
  subject: BehaviorSubject<ReturnTypeFromType<T>>;
};

function useSubject<T>(subject: BehaviorSubject<T>) {
  const [value, setValue] = useState<T>(subject.value);

  useEffect(() => {
    const sub = subject.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [subject]);

  return [value, subject.next.bind(subject)] as const;
}

export const Toggle: React.FC<ControlProps<"Toggle">> = ({
  control,
  subject,
}) => {
  const [value, update] = useSubject(subject);

  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <BaseToggle
        id={`input-${control.label}`}
        checked={value}
        onChange={(e) => update(e.target.checked)}
      />
    </div>
  );
};

export const Number: React.FC<ControlProps<"Number">> = ({
  control,
  subject,
}) => {
  const [value, update] = useSubject(subject);

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
        onChange={(_, newValue) => {
          // e.stopPropagation();
          // e.preventDefault();
          update(newValue as number);
        }}
      />
    </div>
  );
};

export const Select: React.FC<ControlProps<"Select">> = ({
  control,
  subject,
}) => {
  const [value, update] = useSubject(subject);

  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <BaseSelect control={control} value={value} update={update} />
    </div>
  );
};

export const Text: React.FC<ControlProps<"Text">> = ({ control, subject }) => {
  const [value, update] = useSubject(subject);

  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <input
        id={`input-${control.label}`}
        value={value}
        onChange={(e) => update(e.target.value)}
      />
    </div>
  );
};

export const Color: React.FC<ControlProps<"Color">> = ({
  control,
  subject,
}) => {
  const [value, update] = useSubject(subject);

  return (
    <div className={styles.ControlLine}>
      <label className={styles.ControlLabel} htmlFor={`input-${control.label}`}>
        {control.label}
      </label>

      <ColorPicker
        id={`input-${control.label}`}
        value={value}
        onChange={(e) => update(e.currentTarget.value)}
      />
    </div>
  );
};
