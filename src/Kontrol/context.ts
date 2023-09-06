import { createContext } from "react";
import { Observable, of } from "rxjs";

import { getControlDefaultValue } from "./getControlDefault";
import type { Control, ControlType, ReturnTypeFromOptions } from "./inference";

type CommandRegisterInput = {
  id?: string;
  group: string;
  label: string;
  callback: () => void;
  keyboardShortcut?: string;
};

type UnregisterFn = () => void;

const fakeUnregister = () => {};

export type KontrolContextType = {
  registerCommand: (command: CommandRegisterInput) => UnregisterFn;

  registerControl: <T extends ControlType, C extends Control<T>>(
    options: C
  ) => Observable<ReturnTypeFromOptions<C>>;
};

export const KontrolContext = createContext<KontrolContextType>({
  registerCommand: () => fakeUnregister,

  // If no Context Provider, return default value
  registerControl: (control) => of(getControlDefaultValue(control)),
});
