import React, { useMemo } from "react";
import { Select as BaseSelect } from "@mui/base/Select";
import { Option } from "@mui/base/Option";

import * as styles from "./Select.css";

// TODO: Remove direct dependency on Kontrol
import type {
  Control,
  ControlType,
  ReturnTypeFromType,
} from "../../Kontrol/inference";

type ControlProps<T extends ControlType> = {
  control: Control<T>;
  value: ReturnTypeFromType<T>;
  update: (value: ReturnTypeFromType<T>) => void;
};

export const Select: React.FC<ControlProps<"Select">> = ({
  control,
  value,
  update,
}) => {
  const { options } = control;

  const keys = useMemo(() => {
    const allKeys = Object.keys(options);

    // (Ugly) Heuristic to determine if options is an Enum
    const isEnum =
      allKeys.length % 2 === 0 &&
      options[allKeys[0]] === options[allKeys[allKeys[0] as any]];

    return isEnum ? allKeys.slice(allKeys.length / 2) : allKeys;
  }, [options]);

  return (
    <BaseSelect
      slotProps={{
        root: {
          className: styles.CustomSelect,
        },
        listbox: {
          className: styles.CustomSelectListbox,
        },
        popper: {
          className: styles.CustomSelectPopper,
        },
      }}
      // @ts-expect-error TODO: Fix types here
      value={value}
      onChange={(_, newValue) => update(newValue as string)}
    >
      {keys.map((key) => (
        <Option
          slotProps={{
            root: {
              className: styles.CustomSelectOption,
            },
          }}
          key={options[key]}
          value={options[key]}
        >
          {key} ({options[key]})
        </Option>
      ))}
    </BaseSelect>
  );
};
