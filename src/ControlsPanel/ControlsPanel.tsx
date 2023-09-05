import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  m,
  LazyMotion,
  domMax,
  AnimatePresence,
  useDragControls,
} from "framer-motion";

import { ControlsGroup } from "./ControlsGroup";
import styles from "./ControlsPanel.module.scss";
import { useDebugCommand } from "../Kontrol/hooks";

import { MdClose, MdBackspace } from "react-icons/md";

import type { KontrolPlugin } from "../Kontrol/KontrolPluginAPI";

export const ControlsPanel: KontrolPlugin = ({
  controls,
  controlsValues,
  updateControlValue,
  resetControlsValues,
}) => {
  const [showPanel, setShowPanel] = useState(false);

  const dragControls = useDragControls();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useDebugCommand({
    group: "Debug",
    id: "debugcontrols_toggle",
    label: "Toggle Debug Controls",
    callback: () => setShowPanel(!showPanel),
    keyboardShortcut: "Ctrl+Shift+C",
  });

  return createPortal(
    <LazyMotion features={domMax} strict>
      <m.div ref={wrapperRef} className={styles.Container}>
        <AnimatePresence>
          {showPanel && (
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={styles.Panel}
              drag
              dragMomentum={false}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={wrapperRef}
              whileDrag={{ cursor: "grabbing" }}
            >
              <m.div
                onPointerDown={(e) => dragControls.start(e)}
                className={styles.PanelTitle}
              >
                Controls
                <div className={styles.PanelTitleButtons}>
                  <button onClick={resetControlsValues}>
                    <MdBackspace />
                  </button>
                  <button onClick={() => setShowPanel(false)}>
                    <MdClose />
                  </button>
                </div>
              </m.div>

              {controls.length > 0 ? (
                <ControlsGroup
                  controls={controls}
                  controlsValues={controlsValues}
                  updateControl={updateControlValue}
                />
              ) : (
                <div className={styles.NoControls}>No Controls</div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </LazyMotion>,
    document.body
  );
};