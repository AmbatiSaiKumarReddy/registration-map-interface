# Registration Map Interface

A Vue.js application that replicates the registration interface with a US map selection component. The interface allows users to select states they serve either by clicking on the map or using the quick selection buttons.

## Features

- Multi-step registration progress indicator
- Interactive US map for state selection
- Options to select by state or radius
- Quick selection buttons (Contiguous 48, All 50 + DC, Clear All)
- Currently selected states list

## Project Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Implementation Details

This project is built with Vue 3 using the Composition API and Vite build system. The US map is implemented using SVG for better performance and interactivity.
