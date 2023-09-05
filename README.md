# Kontrol

```sh
npm install @kube/kontrol
```

[![](https://dcbadge.vercel.app/api/server/Gg2QMCWX9h)](https://discord.gg/Gg2QMCWX9h)

## Setup

```ts
import { KontrolProvider } from "@kube/kontrol";

import { CommandPalette } from "@kube/kontrol/CommandPalette";
import { ControlsPanel } from "@kube/kontrol/ControlsPanel";

export const App = () => (
  <KontrolProvider plugins={[CommandPalette, ControlsPanel]}>
    <App />
  </KontrolProvider>
);
```

## Usage

```ts
import { useMotionKontrol } from "@kube/kontrol/framer-motion";

export const App = () => {
  // This returns a Framer MotionValue
  const  = useMotionKontrol({
   type: "Number",
   label: "Scale",
   min: 0,
   max: 100,
   default: 1,
   step: 0.1,
  });

  return (
    <motion.div >
      <App />
    </motion.div>
  );
};

```

## Goals

## Next

- Integrate with Signals Libraries (particularly Preact/Signals)
- Integrate with other Frameworks (Vue, Svelte, Solid, etc)
- Integrate on the Backend Side

## Contribution and Help

Join our Discord:
[![](https://dcbadge.vercel.app/api/server/Gg2QMCWX9h)](https://discord.gg/Gg2QMCWX9h)
