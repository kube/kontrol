import React from "react";
import * as styles from "./CommandShortcut.css";
import { BsShift } from "react-icons/bs";
import { MdKeyboardControlKey } from "react-icons/md";

function parseKeybinding(keybinding: string) {
  const simplified = keybinding.replace("++", "+PLUS");
  const parts = simplified.split("+");
  return parts.map((part) => part.trim().toUpperCase());
}

const KEYS_SYMBOLS: Record<string, React.ReactNode | string | undefined> = {
  CTRL: <MdKeyboardControlKey style={{ marginBottom: -3 }} />,
  SHIFT: <BsShift style={{ marginBottom: -2 }} />,
  PLUS: "+",
  META: "⌘",
  ALT: "⌥",
  SPACE: "␣",
  UP: "↑",
  DOWN: "↓",
  LEFT: "←",
  RIGHT: "→",
  BACKSPACE: "⌫",
  ENTER: "⏎",
};

function toKeySymbol(key: string) {
  // TODO: Should have different symbols depending on OS
  return KEYS_SYMBOLS[key] ?? key;
}

export const CommandShortcut: React.FC<{ keybinding: string }> = ({
  keybinding,
}) => {
  const keybindingParts = parseKeybinding(keybinding);

  return (
    <div className={styles.CommandShortcut}>
      {keybindingParts.map((part, index) => (
        <kbd key={index}>{toKeySymbol(part)}</kbd>
      ))}
    </div>
  );
};
