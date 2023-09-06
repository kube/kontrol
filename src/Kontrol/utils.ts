import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function areObjectsShallowEqual(a: any, b: any) {
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

export function useObjectShallowMemo<T extends Record<string, unknown>>(
  nextValue: T
) {
  const value = useRef<T>(nextValue);

  if (!areObjectsShallowEqual(value.current, nextValue)) {
    value.current = nextValue;
  }
  return value.current;
}

/**
 * Helper to always return same function identity.
 * Useful for setters.
 */
export function useProxyCallback<Fn extends (...args: never[]) => unknown>(
  fn: Fn
): Fn;

export function useProxyCallback(fn: Function) {
  const callbackRef = useRef<typeof fn>(fn);
  callbackRef.current = fn;
  return useCallback((...args) => callbackRef.current(...args), []);
}
