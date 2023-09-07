export type ControlType = "Text" | "Select" | "Number" | "Toggle" | "Color";

type BaseOptions<T extends ControlType, V> = {
  type: T;
  label: string;
  group?: string[];
  default?: V;
};

type TextInput = BaseOptions<"Text", string>;

type SelectInput<
  O extends Record<string, unknown> = Record<string, string | number>
> = BaseOptions<"Select", O[keyof O]> & {
  options: O;
};

type NumberInput = BaseOptions<"Number", number> & {
  min?: number;
  max?: number;
  step?: number;
};

type ToggleInput = BaseOptions<"Toggle", boolean>;

type ColorInput = BaseOptions<"Color", string>;

///

export type OptionsFromType<T extends ControlType> = T extends "Text"
  ? TextInput
  : T extends "Select"
  ? SelectInput
  : T extends "Number"
  ? NumberInput
  : T extends "Toggle"
  ? ToggleInput
  : T extends "Color"
  ? ColorInput
  : never;

export type ReturnTypeFromOptions<O extends OptionsFromType<ControlType>> =
  O extends SelectInput<infer R>
    ? R[keyof R]
    : O extends TextInput
    ? string
    : O extends NumberInput
    ? number
    : O extends ToggleInput
    ? boolean
    : O extends ColorInput
    ? string
    : never;

///

export type Control<T extends ControlType = ControlType> = {
  id: string;
} & OptionsFromType<T>;

export type ControlValueType = ReturnTypeFromOptions<
  OptionsFromType<ControlType>
>;

///

export type ReturnTypeFromType<T extends ControlType = ControlType> =
  ReturnTypeFromOptions<OptionsFromType<T>>;
