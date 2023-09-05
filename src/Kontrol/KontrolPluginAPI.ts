import React from "react";

import type { Control, ControlValueType } from "./context";

export type Command = {
  id: string;
  group: string;
  label: string;
  keyboardShortcut?: string;
  callback: () => void;
};

export type KontrolPluginAPI = {
  commands: Command[];
  controls: Control[];
  controlsValues: Record<string, ControlValueType>;
  updateControlValue: (control: Control, value: ControlValueType) => void;
  resetControlsValues: () => void;
};

export type KontrolPlugin = (api: KontrolPluginAPI) => React.ReactNode;
