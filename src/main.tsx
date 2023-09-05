import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "material-icons/iconfont/material-icons.css";
import { KontrolProvider } from "./Kontrol";
import { CommandPalette } from "./CommandPalette";
import { ControlsPanel } from "./ControlsPanel";
import { App } from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KontrolProvider plugins={[CommandPalette, ControlsPanel]}>
      <App />
    </KontrolProvider>
  </React.StrictMode>
);
