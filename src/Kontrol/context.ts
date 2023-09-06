import { createContext } from "react";

import { getControlDefaultValue } from "./getControlDefault";
import { Control, ControlType, ReturnTypeFromOptions } from "./inference";

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
    value: getControlDefaultValue(control),
    unregister: () => {},
  }),
});
