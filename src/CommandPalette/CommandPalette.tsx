import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import cslx from "clsx";

import type { Command, KontrolPluginAPI } from "../Kontrol/KontrolPluginAPI";
import { useCommand } from "../Kontrol/hooks";

import * as styles from "./CommandPalette.css";
import { CommandShortcut } from "./CommandShortcut";

function toSlug(str: string) {
  return str.replace(/\s/g, "").toLowerCase();
}

function matchSearch(search: string) {
  const searchSlug = toSlug(search);

  return ({ group, label }: Command) => {
    const commandSlug = toSlug(`${group}${label}`);
    return commandSlug.includes(searchSlug);
  };
}

function sortCommands(a: Command, b: Command) {
  // Sort by Category
  if (a.group < b.group) return -1;
  if (a.group > b.group) return 1;
  // Then by Id
  if (a.id < b.id) return -1;
  return 1;
}

export const CommandPaletteUI: React.FC<{
  commands: KontrolPluginAPI["commands"];
  close: () => void;
}> = ({ commands, close }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = useMemo(
    () => [...commands].sort(sortCommands).filter(matchSearch(search)),
    [commands, search]
  );

  const callCommand = (index: number) => {
    filteredCommands[index]?.callback();
    close();
  };

  // Scroll list to view item if not fully visible
  function scrollItemIntoView(index: number) {
    const listElem = listRef.current;
    const item = listRef.current?.children[index];

    if (!listElem || !(item instanceof HTMLElement)) return;

    const scrollY = listElem.scrollTop;
    const viewHeight = listElem.offsetHeight;
    const itemY = item.offsetTop - listElem.offsetTop;
    const itemHeight = item.clientHeight;

    if (itemY < scrollY) {
      item.scrollIntoView(true); // Item is upper, align at bottom
    } else if (itemY + itemHeight > scrollY + viewHeight) {
      item.scrollIntoView(false); // Item is lower, align at top
    }
  }

  function handleKeyDown({ key }: KeyboardEvent) {
    if (key === "Escape") {
      close();
    } else if (key === "ArrowDown") {
      const nextIndex = (selectedIndex + 1) % filteredCommands.length;
      setSelectedIndex(nextIndex);
      scrollItemIntoView(nextIndex);
    } else if (key === "ArrowUp") {
      const previousIndex =
        (selectedIndex + filteredCommands.length - 1) % filteredCommands.length;
      setSelectedIndex(previousIndex);
      scrollItemIntoView(previousIndex);
    } else if (key === "Enter") {
      callCommand(selectedIndex);
    }
  }

  // Focus input when Command Palette opens
  useEffect(() => inputRef.current?.focus(), []);

  // Listen Keyboard for Navigation in Command Palette
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return createPortal(
    <motion.div className={styles.CommandPaletteContainer} onClick={close}>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 22 }}
        className={styles.CommandPalette}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className={styles.Input}
          ref={inputRef}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <ul ref={listRef} className={styles.CommandsList}>
          {filteredCommands.map((command, index) => (
            <li
              key={command.id}
              role="menuitem"
              tabIndex={index}
              className={cslx(styles.CommandsListItem, {
                [styles.Selected]: selectedIndex === index,
              })}
              onFocus={() => setSelectedIndex(index)}
              onClick={() => callCommand(index)}
            >
              <motion.div className={styles.GroupName}>
                {command.group}
              </motion.div>
              <motion.div className={styles.CommandLabel}>
                {command.label}
              </motion.div>
              {command.keyboardShortcut && (
                <CommandShortcut keybinding={command.keyboardShortcut} />
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const CommandPalette: React.FC<KontrolPluginAPI> = ({ commands }) => {
  const [visible, setVisible] = useState(false);

  useCommand({
    group: "Command Palette",
    label: "Toggle",
    callback: () => setVisible((x) => !x),
    keyboardShortcut: "Ctrl+Shift+p",
  });

  return (
    <>
      <AnimatePresence>
        {visible && (
          <CommandPaletteUI
            commands={commands}
            close={() => setVisible(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
