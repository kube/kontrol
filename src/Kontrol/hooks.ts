import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";

import { useMotionValue, type MotionValue } from "framer-motion";

import { KontrolContext } from "./context";
import type {
  ControlType,
  ControlValueType,
  OptionsFromType,
  ReturnTypeFromOptions,
} from "./inference";
import { getControlDefaultValue } from "./getControlDefault";

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

function getControlId(control: OptionsFromType<ControlType>) {
  // TODO: Should escape characters that are used to separate sub IDs
  const groupId = control.group?.join("::") ?? "";
  return `__${control.type}__${groupId}__${control.label}`;
}

export function useControlMotion<
  T extends ControlType,
  O extends OptionsFromType<T>
>(input: O): MotionValue<ReturnTypeFromOptions<O>> {
  const { registerControl } = useContext(KontrolContext);

  const defaultValue = useMemo(() => getControlDefaultValue(input), []);

  const motionValue = useMotionValue(defaultValue);

  const controlId = useMemo(() => getControlId(input), [input]);

  const memoizedControl = useObjectShallowMemo({
    ...input,
    id: controlId,
    // This options field is only on Select controls
    options: useObjectShallowMemo("options" in input ? input.options : {}),
  });

  useEffect(() => {
    // FIXME find a better way to handle types for memoizedControl
    const { unregister } = registerControl(memoizedControl, (value) =>
      motionValue.set(value)
    );
    return () => unregister();
  }, [motionValue, memoizedControl, registerControl]);

  // @ts-expect-error Need to do better TS here (and upstream)
  return motionValue;
}

export function useControl<T extends ControlType, O extends OptionsFromType<T>>(
  input: O
): ReturnTypeFromOptions<O> {
  const { registerControl } = useContext(KontrolContext);

  const [value, setValue] = useState<ControlValueType>();

  const controlId = useMemo(() => getControlId(input), [input]);

  const memoizedControl = useObjectShallowMemo({
    ...input,
    id: controlId,
    // This options field is only on Select controls
    options: useObjectShallowMemo("options" in input ? input.options : {}),
  });

  useEffect(() => {
    // FIXME find a better way to handle types for memoizedControl
    const { unregister } = registerControl(memoizedControl, setValue);
    return () => unregister();
  }, [memoizedControl, registerControl]);

  // @ts-expect-error Need to do better TS here (and upstream)
  return value ?? getControlDefaultValue(input);
}

// TODO: Type Signature is just copy-paste from upper function, but we can do specific inference for each key/value
export function useControls<
  T extends ControlType,
  O extends OptionsFromType<T>
>(inputs: Record<string, O>): Record<string, ReturnTypeFromOptions<O>> {
  const { registerControl } = useContext(KontrolContext);

  const [values, setValues] = useState<Record<string, ControlValueType>>();

  const memoizedControls = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(inputs).map(([key, input]) => [
          key,
          { ...input, id: getControlId(input) },
        ])
      ),
    [inputs]
  );

  useEffect(() => {
    const unregisters = Object.entries(memoizedControls).map(
      ([key, control]) => {
        const { unregister } = registerControl(control, (value) =>
          setValues((current) => ({ ...current, [key]: value }))
        );
        return unregister;
      }
    );
    return () => unregisters.forEach((unregister) => unregister());
  }, [memoizedControls, registerControl]);

  // @ts-expect-error Need to do better TS here (and upstream)
  return (
    values ??
    Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [
        key,
        getControlDefaultValue(value),
      ])
    )
  );
}

/**
 * Register a Single Debug Command.
 */
export function useCommand({
  id,
  group,
  label,
  callback,
  condition,
  keyboardShortcut,
}: {
  id?: string;
  group: string;
  label: string;
  callback: () => void;
  condition?: boolean;
  keyboardShortcut?: string;
}) {
  const { registerCommand } = useContext(KontrolContext);

  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const wrappedCallback = useCallback(() => callbackRef.current(), []);

  // TODO: This hook should be enhanced to reduce the number of updates it does.
  // It is much more simple to optimize than the other one (which handles arrays of commands).
  // Though, it would be nice to find optimization patterns that we can use on both.
  useEffect(() => {
    if (condition ?? true) {
      return registerCommand({
        id,
        group,
        callback: wrappedCallback,
        label,
        keyboardShortcut,
      });
    }
    return undefined;
  }, [
    registerCommand,
    id,
    group,
    wrappedCallback,
    label,
    condition,
    keyboardShortcut,
  ]);
}

/**
 * Register Multiple Debug Commands.
 */
export function useDebugCommands(
  group: string,
  commands: {
    id?: string;
    label: string;
    callback: () => void;
    condition?: boolean;
    keyboardShortcut?: string;
  }[]
) {
  const { registerCommand } = useContext(KontrolContext);

  // TODO: This hook should be enhanced to reduce the number of updates it does.
  useEffect(() => {
    const unregisterArray = commands
      .filter((command) => command.condition ?? true)
      .map((command) => registerCommand({ ...command, group }));

    return () => unregisterArray.forEach((unregister) => unregister());
  }, [registerCommand, group, commands]);
}
