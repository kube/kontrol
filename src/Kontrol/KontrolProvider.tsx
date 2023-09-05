import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  type ControlValueType,
  KontrolContext,
  type KontrolContextType,
  type Control,
} from "./context";
import type {
  Command,
  KontrolPlugin,
  KontrolPluginAPI,
} from "./KontrolPluginAPI";
import { useKeybindings } from "./keybindings";
import { useDebouncedCallback } from "use-debounce";
import { getControlDefaultValue } from "./getControlDefault";

type ControlWatcher = (value: ControlValueType) => void;

type ValueMap = Record<string, ControlValueType>;

const STORAGE_KEY = "__DebugControls__values";

function saveControlValues(values: ValueMap): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function loadControlValues(): ValueMap {
  const values = sessionStorage.getItem(STORAGE_KEY);
  return values ? JSON.parse(values) : {};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function areObjectsShallowEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const currentKeys = Object.keys(a);
  const nextKeys = Object.keys(b);

  if (currentKeys.length !== nextKeys.length) {
    return false;
  }

  return currentKeys.every((key) => a[key] === b[key]);
}

function useObjectShallowMemo<T extends Record<string, unknown>>(nextValue: T) {
  const value = useRef<T>(nextValue);

  if (!areObjectsShallowEqual(value.current, nextValue)) {
    value.current = nextValue;
  }
  return value.current;
}

/**
 * Works as `useEffect`, but with debounce delay.
 */
function useDebouncedEffect(
  callback: () => void | (() => void),
  wait: number,
  deps: unknown[]
) {
  const destructorRef = useRef<() => void>();

  const wrappedCallback = useCallback(() => {
    // Call previous destructor
    destructorRef.current?.();

    // Save next destructor, or erase previous one
    const destructorOption = callback();
    destructorRef.current =
      typeof destructorOption === "function" ? destructorOption : undefined;
  }, [callback]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(useDebouncedCallback(wrappedCallback, wait), deps);
}

/**
 * Helper to always return same function identity.
 * Useful for setters.
 */
function useProxyCallback<Fn extends (...args: never[]) => unknown>(fn: Fn): Fn;

function useProxyCallback(fn: Function) {
  const callbackRef = useRef<typeof fn>(fn);
  callbackRef.current = fn;
  return useCallback((...args) => callbackRef.current(...args), []);
}

type KontrolProviderProps = {
  children: React.ReactNode;
  plugins?: KontrolPlugin[];
};

export const KontrolProvider: React.FC<KontrolProviderProps> = ({
  children,
  plugins,
}) => {
  const [commands, setCommands] = useState<Command[]>([]);

  useKeybindings(commands);

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

  const [controls, setControls] = useState<Record<string, Control>>({});
  const [watchers, setWatchers] = useState<
    Record<string, ControlWatcher[] | undefined>
  >({});
  const [values, setValues] = useState<ValueMap>(loadControlValues);

  // Save to SessionStorage, with debounce to prevent excessive writes
  useDebouncedEffect(() => saveControlValues(values), 200, [values]);

  // Displayed Controls are the ones for which we have Watchers
  // ControlValue is preserved in case it is unmounted and remounted
  const currentControls = useMemo(
    () =>
      Object.entries(watchers)
        .filter(([, list]) => list?.length)
        .map(([id]) => controls[id]),
    [watchers, controls]
  );

  const resetControlsValues = useProxyCallback(() => {
    // For all current controls, reset their values to their default value
    setValues(
      Object.fromEntries(
        currentControls.map((control) => [
          control.id,
          getControlDefaultValue(control),
        ])
      )
    );

    // Call all watchers with default value
    currentControls.forEach((control) => {
      const defaultValue = getControlDefaultValue(control);
      watchers[control.id]?.forEach((watcher) => watcher(defaultValue));
    });
  });

  const registerControl = useProxyCallback(
    (control: Control, watcher: ControlWatcher) => {
      const defaultValue = getControlDefaultValue(control);

      setControls((current) => ({
        ...current,
        [control.id]: control,
      }));
      setWatchers((current) => ({
        ...current,
        [control.id]: [...(current[control.id] ?? []), watcher],
      }));

      // Set initial value if no existing value
      if (!(control.id in values)) {
        setValues((current) => ({ ...current, [control.id]: defaultValue }));
      }

      // Call watcher with initial value
      const initialValue =
        control.id in values ? values[control.id] : defaultValue;
      watcher(initialValue);

      return {
        value: initialValue,
        // When unregistering a Control Instance, only remove Control and Watcher
        // Preserve its Value in case of later remount.
        unregister: () => {
          // When unregistering a Control Instance, only remove Watcher
          // If a new Watcher is registered, it will preserve order
          setWatchers((current) => ({
            ...current,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [control.id]: current[control.id]!.filter((w) => w !== watcher),
          }));
        },
      };
    }
  );

  const updateControlValue = useProxyCallback(
    (control: Control, value: ControlValueType) => {
      setValues({ ...values, [control.id]: value });
      watchers[control.id]?.forEach((watcher) => watcher(value));
    }
  );

  const pluginApi: KontrolPluginAPI = {
    commands,
    controls: currentControls,
    controlsValues: values,
    resetControlsValues,
    updateControlValue,
  };

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
