# Custom Board Layer Demo

This demo demonstrates how to integrate custom multi-layer views into TCIC SDK's whiteboard area.

## Features

- **Custom Layer Component**: A code editor layer that can overlay the default whiteboard
- **Layer Switcher Tab**: A sidebar component for switching between whiteboard and custom layers
- **SDK Integration**: Properly configured states for seamless integration with TCIC SDK

## Quick Start

1. Build the demo:
   ```bash
   pnpm install
   pnpm build
   ```

2. In your TCIC classroom URL, append the debug parameter:
   ```
   &debugjs=http://localhost:3000/custom.js
   ```

3. The script will **auto-initialize** after loading. No manual initialization required.
   - It automatically detects when TCIC SDK is ready and configures custom layers.

## Project Structure

```
src/
├── main.js                        # Entry point, registers components and configures SDK
├── CodeEditorElement.ce.vue       # Custom layer: Code editor component
├── LayerSwitcherComponent.ce.vue  # Sidebar tab: Layer switcher component
└── types/global.d.ts              # TypeScript type definitions
```
