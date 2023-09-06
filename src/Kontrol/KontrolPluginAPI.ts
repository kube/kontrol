import React from "react";

import type { Control, ControlValueType } from "./inference";
import type { BehaviorSubject } from "rxjs";

export type Command = {
  id: string;
  group: string;
  label: string;
  keyboardShortcut?: string;
  callback: () => void;
};

export type KontrolPluginAPI = {
  commands: Command[];
  // TODO: Controls could have directly Subject embedded in them.
  controls: Control[];
  controlsSubjects: Record<string, BehaviorSubject<ControlValueType>>;
  resetControlsValues: () => void;
};

export type KontrolPlugin = (api: KontrolPluginAPI) => React.ReactNode;
