import React, { useEffect, useMemo, useState } from "react";
import { m } from "framer-motion";

import * as styles from "./ControlsGroup.css";
import * as Controls from "./Controls";
import type { Control, ControlValueType } from "../Kontrol/inference";
import { MdExpandMore } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { BehaviorSubject } from "rxjs";

function notNil<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}

type ControlsGroupProps = {
  depth?: number;
  title?: string;
  controls: Control[];
  controlsSubjects: Record<string, BehaviorSubject<ControlValueType>>;
};

export const ControlsGroup: React.FC<ControlsGroupProps> = ({
  depth = 0,
  title,
  controls,
  controlsSubjects,
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
          <div className={styles.ControlGroupTitle}>
            <span onClick={toggleExpanded}>
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
            </span>
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
                        subject={
                          controlsSubjects[
                            control.id
                          ] as BehaviorSubject<boolean>
                        }
                      />
                    );
                  }
                  if (control.type === "Number") {
                    const Control = Controls[control.type];
                    return (
                      <Control
                        key={control.id}
                        control={control}
                        subject={
                          controlsSubjects[
                            control.id
                          ] as BehaviorSubject<number>
                        }
                      />
                    );
                  }
                  if (control.type === "Select") {
                    const Control = Controls[control.type];
                    return (
                      <Control
                        key={control.id}
                        control={control}
                        subject={
                          controlsSubjects[control.id] as BehaviorSubject<
                            string | number
                          >
                        }
                      />
                    );
                  }
                  if (control.type === "Text") {
                    const Control = Controls[control.type];
                    return (
                      <Control
                        key={control.id}
                        control={control}
                        subject={
                          controlsSubjects[
                            control.id
                          ] as BehaviorSubject<string>
                        }
                      />
                    );
                  }
                  // last alternative: control.type === 'Color'
                  const Control = Controls[control.type];
                  return (
                    <Control
                      key={control.id}
                      control={control}
                      subject={
                        controlsSubjects[control.id] as BehaviorSubject<string>
                      }
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
                  controlsSubjects={controlsSubjects}
                />
              ))
            }
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
