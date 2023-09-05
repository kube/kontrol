import { useCallback, useEffect, useRef } from "react";
import type { Command } from "./KontrolPluginAPI";

/**
 * Helper to always return same function identity.
 * Useful for setters.
 */
function useProxyCallback<Fn extends (...args: never[]) => unknown>(fn: Fn): Fn;

function useProxyCallback(fn: Function) {
  const callbackRef = useRef<typeof fn>(fn);
  callbackRef.current = fn;
  return useCallback((...args: any[]) => callbackRef.current(...args), []);
}

const IS_MAC = window.navigator.platform.includes("Mac");

export function useKeybindings(commands: Command[]) {
  const runCommandsForKeyboardShortcut = useProxyCallback(
    (keyboardShortcut: string) => {
      const commandsForShortcut = commands.filter(
        (c) =>
          c.keyboardShortcut?.toUpperCase() === keyboardShortcut.toUpperCase()
      );
      commandsForShortcut.forEach((c) => c.callback());
    }
  );

  const recordKeyStrokes = useCallback(
    (event: KeyboardEvent) => {
      const isControlKeyPressed = IS_MAC ? event.metaKey : event.ctrlKey;

      // TODO: Handle sequences
      if (isControlKeyPressed && event.shiftKey) {
        event.preventDefault();
        console.log("HELLO");
        console.log(`Ctrl+Shift+${event.key}`);

        runCommandsForKeyboardShortcut(`Ctrl+Shift+${event.key}`);
      }
    },
    [runCommandsForKeyboardShortcut]
  );

  // Listen for Keyboard Shortcut
  useEffect(() => {
    window.addEventListener("keydown", recordKeyStrokes);
    return () => window.removeEventListener("keydown", recordKeyStrokes);
  }, [recordKeyStrokes]);
}
