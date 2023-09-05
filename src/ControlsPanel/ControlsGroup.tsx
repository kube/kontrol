import React, { useEffect, useMemo, useState } from "react";
import { m } from "framer-motion";

import styles from "./ControlsGroup.module.scss";
import * as Controls from "./Controls";
import type {
  Control,
  ControlType,
  ControlValueType,
  ReturnTypeFromType,
} from "../Kontrol/context";
import { MdExpandMore } from "react-icons/md";
import { AnimatePresence } from "framer-motion";

function notNil<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}

type ControlsGroupProps = {
  depth?: number;
  title?: string;
  controls: Control[];
  controlsValues: Record<string, ControlValueType>;
  updateControl: <T extends ControlType>(
    control: Control<T>,
    value: ReturnTypeFromType<T>
  ) => void;
};

export const ControlsGroup: React.FC<ControlsGroupProps> = ({
  depth = 0,
  title,
  controls,
  controlsValues,
  updateControl,
}) => {
  const [isFirstRender, setFirstRender] = useState(true);
  useEffect(() => setFirstRender(false), []);

  const [isExpanded, setExpanded] = useState(true);

  // Current Group Controls
  const currentDepthControls = useMemo(
    () => controls.filter((control) => control.group?.[depth] === undefined),
    [depth, controls]
  );

  // Unique Control Groups for current Depth
  const childGroups = useMemo(
    () => [...new Set(controls.map((_) => _.group?.[depth]).filter(notNil))],
    [depth, controls]
  );

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className={styles.ControlGroup}>
      {
        // Display Group Title with Expand/Collapse Button
        title ? (
          <div className={styles.ControlGroupTitle} onClick={toggleExpanded}>
            <MdExpandMore
              style={{
                fontSize: 16,
                transition: "transform 0.1s ease",
                transform: `translateY(3px) rotate(${
                  isExpanded ? 0 : -90
                }deg) `,
              }}
            />
            {title}
          </div>
        ) : null
      }

      <AnimatePresence initial={!isFirstRender}>
        {isExpanded && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={
              depth === 0
                ? styles.RootControlGroupContent
                : styles.ControlGroupContent
            }
          >
            <div className={styles.ControlGroupCurrentLevelControls}>
              {
                // Current Group Controls
                currentDepthControls.map((control) => {
                  if (control.type === "Toggle") {
                    const Control = Controls[control.type];
                    return (
                      <Control
                        key={control.id}
                        control={control}
                        value={controlsValues[control.id] as boolean}
                        update={updateControl}
                      />
                    );
                  }
                  if (control.type === "Number") {
                    const Control = Controls[control.type];
                    return (
                      <Control
                        key={control.id}
                        control={control}
                        value={controlsValues[control.id] as number}
                        update={updateControl}
                      />
                    );
                  }
                  if (control.type === "Select") {
                    const Control = Controls[control.type];
                    console.log("HERE");
                    console.log(control.id);
                    console.log(controlsValues);
                    console.log(controlsValues[control.id] as string);
                    return (
                      <Control
                        key={control.id}
                        control={control}
                        value={controlsValues[control.id] as string | number}
                        update={updateControl}
                      />
                    );
                  }
                  // last alternative: control.type === 'Color'
                  const Control = Controls[control.type];
                  return (
                    <Control
                      key={control.id}
                      control={control}
                      value={controlsValues[control.id] as string}
                      update={updateControl}
                    />
                  );
                })
              }
            </div>

            {
              // Child Groups
              childGroups.map((groupName) => (
                <ControlsGroup
                  key={groupName}
                  depth={depth + 1}
                  title={groupName}
                  controls={controls.filter(
                    (control) => control.group?.[depth] === groupName
                  )}
                  controlsValues={controlsValues}
                  updateControl={updateControl}
                />
              ))
            }
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
