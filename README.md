# Serin AI Showcase

This project is a modern web showcase for the Serin AI platform, built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. It features a visually striking hero section with a multi-layered orb, interactive text effects, and a beautiful gradient background. The design emphasizes clarity, accessibility, and a cohesive blue/violet color palette.

## Features
- **Multi-layered Orb**: Centerpiece visual rendered with WebGL (OGL), using theme-matching blue and violet shades
- **Animated Gradient Background**: Smooth, theme-consistent gradients
- **Text Effects**: Dynamic, readable hero text with glow and blur effects
- **Responsive Layout**: Works well on desktop and mobile
- **Component-based Architecture**: Easily extendable and maintainable

## Technologies Used
- React & TypeScript
- Vite (fast development/build tool)
- Tailwind CSS (utility-first styling)
- shadcn/ui (UI component library)
- OGL (WebGL rendering for orb)
- Framer Motion (for text transitions)

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Blink-Analytics/serin-ai-showcase.git
   cd serin-ai-showcase
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Website
Start the development server:
```sh
npm run dev
```

- The site will be available at `http://localhost:8080/` (or another port if 8080 is in use).
- Open the URL in your browser to view the Serin AI Showcase.

### Building for Production
To create an optimized production build:
```sh
npm run build
```

The output will be in the `dist` folder, ready to be deployed to any static hosting service.

## Project Structure
- `src/components/` - Main React components (Hero, multi-layered orb, text effects, etc.)
- `src/lib/` - Shared constants and utility functions
- `public/` - Static assets (favicon, audio samples, etc.)
- `index.html` - Main HTML entry point
- `package.json` - Project metadata and scripts

## License
This project is licensed under the MIT License.

---
For questions or contributions, please open an issue or pull request on GitHub.
