import { createContext } from "react";

import { getControlDefaultValue } from "./getControlDefault";

///
/// CONTROLS
///

export type ControlType = "Select" | "Number" | "Toggle" | "Color";

type BaseOptions<T extends ControlType, V> = {
  type: T;
  label: string;
  group?: string[];
  default?: V;
};

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

export type OptionsFromType<T extends ControlType> = T extends "Select"
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

///
/// COMMANDS
///

type CommandRegisterInput = {
  id?: string;
  group: string;
  label: string;
  callback: () => void;
  keyboardShortcut?: string;
};

///
/// CONTEXT
///

type UnregisterFn = () => void;

const fakeUnregister = () => {};

export type KontrolContextType = {
  registerCommand: (command: CommandRegisterInput) => UnregisterFn;

  registerControl: <T extends ControlType, C extends Control<T>>(
    options: C,
    onChange: (value: ReturnTypeFromOptions<C>) => void
  ) => {
    value: ReturnTypeFromOptions<C>;
    unregister: UnregisterFn;
  };
};

export const KontrolContext = createContext<KontrolContextType>({
  registerCommand: () => fakeUnregister,

  registerControl: (control) => ({
    // If no Context Provider, return default value
    // @ts-expect-error Types of Controls need to be reworked for better narrowing
    value: getControlDefaultValue(control),
    unregister: () => {},
  }),
});
