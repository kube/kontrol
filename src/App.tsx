import React, { useState } from "react";
import { useDebugCommand, useDebugControl } from "./Kontrol/hooks";

export const App: React.FC = () => {
  const [count, setCount] = useState(0);

  useDebugCommand({
    group: "Count",
    label: "Increment",
    callback: () => setCount(count + 1),
    keyboardShortcut: "Ctrl+Shift++",
  });

  useDebugCommand({
    group: "Count",
    label: "Decrement",
    callback: () => setCount(count - 1),
    keyboardShortcut: "Ctrl+Shift+_",
  });

  const fontFamily = useDebugControl({
    group: ["Global"],
    label: "Font family",
    type: "Select",
    default: "Arial",
    options: {
      "Helvetica, sans-serif": "Helvetica",
      "Arial, sans-serif": "Arial",
      "Times New Roman, serif": "Times New Roman",
      "Courier New, monospace": "Courier New",
      "Inter, sans-serif": "Inter",
    },
  });

  const blueBackground = useDebugControl({
    group: ["Global"],
    label: "Blue Background",
    type: "Toggle",
    default: false,
  });

  const initialValue = useDebugControl({
    group: ["Count"],
    label: "Initial value",
    type: "Number",
    default: 0,
    min: 0,
    max: 1000,
  });

  const color = useDebugControl({
    group: ["Count"],
    label: "Color",
    type: "Color",
    default: "#FFFFFF",
  });

  const fontSize = useDebugControl({
    group: ["Count"],
    label: "Font size",
    type: "Number",
    default: 16,
    min: 0,
    max: 100,
  });

  const fontWeight = useDebugControl({
    group: ["Count"],
    label: "Font weight",
    type: "Number",
    default: 400,
    min: 100,
    max: 900,
  });

  const textShadowOffsetX = useDebugControl({
    group: ["Count", "Text Shadow"],
    label: "Offset X",
    type: "Number",
    default: 0,
    min: -100,
    max: 100,
  });

  const textShadowOffsetY = useDebugControl({
    group: ["Count", "Text Shadow"],
    label: "Offset Y",
    type: "Number",
    default: 0,
    min: -100,
    max: 100,
  });

  const textShadowBlur = useDebugControl({
    group: ["Count", "Text Shadow"],
    label: "Blur",
    type: "Number",
    default: 0,
    min: 0,
    max: 100,
  });

  const textShadowColor = useDebugControl({
    group: ["Count", "Text Shadow"],
    label: "Color",
    type: "Color",
    default: "#000000",
  });

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: blueBackground ? "blue" : "transparent",
        fontFamily,
      }}
    >
      <span
        style={{
          color,
          fontSize,
          fontWeight,
          textShadow: `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`,
        }}
      >
        {initialValue + count}
      </span>
    </div>
  );
};
