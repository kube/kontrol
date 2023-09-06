import React, { useCallback, useMemo, useState } from "react";
import { BehaviorSubject } from "rxjs";

import { KontrolContext, type KontrolContextType } from "./context";
import type { Control, ControlValueType } from "./inference";
import type {
  Command,
  KontrolPlugin,
  KontrolPluginAPI,
} from "./KontrolPluginAPI";
import { useKeybindings } from "./keybindings";
import { getControlDefaultValue } from "./getControlDefault";
import { useObjectShallowMemo, useProxyCallback } from "./utils";

type SubjectMap = Record<string, BehaviorSubject<ControlValueType>>;

type KontrolProviderProps = {
  children: React.ReactNode;
  plugins?: KontrolPlugin[];
};

export const KontrolProvider: React.FC<KontrolProviderProps> = ({
  children,
  plugins,
}) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [controls, setControls] = useState<Record<string, Control>>({});
  const [subjects, setSubjects] = useState<SubjectMap>({});

  //
  // KEYBINDINGS
  //

  useKeybindings(commands);

  //
  // COMMANDS
  //

  const registerCommand = useCallback<KontrolContextType["registerCommand"]>(
    (commandInput) => {
      const id = commandInput.id ?? commandInput.label;
      const currentCommand: Command = { ...commandInput, id };
      // Register
      setCommands((list) =>
        list
          // Remove existing command with same id.
          // This should not happen, though in some cases the Unregister method seems to not be called properly.
          .filter((command) => command.id !== currentCommand.id)
          .concat(currentCommand)
      );
      // Unregister
      return () =>
        setCommands((list) =>
          list.filter((command) => command !== currentCommand)
        );
    },
    []
  );

  //
  // CONTROLS
  //

  // Displayed Controls are the ones for which their Subject have at least one Observers
  // ControlValue is preserved in case it is unmounted and remounted
  const currentControls = useMemo(
    () =>
      Object.entries(subjects)
        .filter(([, subject]) => subject.observers.length > 0)
        .map(([id]) => controls[id]),
    [subjects, controls]
  );

  const resetControlsValues = useProxyCallback(() => {
    // For all current controls, reset their values to their default value
    currentControls.forEach((control) => {
      const defaultValue = getControlDefaultValue(control);
      subjects[control.id].next(defaultValue);
    });
  });

  const registerControl = useProxyCallback<
    KontrolContextType["registerControl"]
  >((control: Control) => {
    const defaultValue = getControlDefaultValue(control);

    setControls((current) => ({
      ...current,
      [control.id]: control,
    }));

    // Create Subject if it does not exist
    const subject = subjects[control.id] ?? new BehaviorSubject(defaultValue);

    // Save Subject if was not present
    if (!(control.id in subjects)) {
      setSubjects((current) => ({
        ...current,
        [control.id]: subject,
      }));
    }

    // TODO: Fix type
    return subject as any;
  });

  const pluginApi: KontrolPluginAPI = useObjectShallowMemo({
    commands,
    controls: currentControls,
    controlsSubjects: subjects,
    resetControlsValues,
  });

  return (
    <KontrolContext.Provider
      value={useObjectShallowMemo({ registerCommand, registerControl })}
    >
      {children}

      {plugins?.map((Plugin) => (
        <Plugin key={Plugin.name} {...pluginApi} />
      ))}
    </KontrolContext.Provider>
  );
};
