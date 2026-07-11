# Project Theme & Design Scheme Analysis

This document provides a comprehensive analysis of the design system, theming, and stylistic choices for the `pphat.me` portfolio project.

## 1. Tech Stack & Styling Architecture
- **Framework:** Next.js (App Router), React 19
- **Styling Engine:** Tailwind CSS v4 (configured via `@tailwindcss/postcss`)
- **Theme Management:** `next-themes` (Dark/Light mode support via the `class` strategy)
- **Component Primitives:** Radix UI (`@radix-ui/react-*`), Framer Motion, and Lucide React icons.

## 2. Typography
The project leverages `next/font/google` to load fonts optimally as CSS variables. These are then exposed to Tailwind.
- **Sans-serif (Body & UI):** `Poppins`, `Roboto`, `Open Sans`, and `Kantumruy Pro` (which offers Khmer language support).
- **Display / Stylistic Fonts:** `Aladin` and `Srisakdi`.
- **Implementation:** The fonts are injected via the root layout (`<body className={cn(poppins.variable, kantumruyPro.variable, aladin.variable, ...)}>`).

## 3. Color Palette
Colors are managed through HSL variables in `src/shared/styles/globals.css` and exposed natively to Tailwind v4 via the `@theme inline` directive.

### Base Colors
- **Light Mode:**
  - Background: `hsl(0 0% 100%)` (White)
  - Foreground (Text): `hsl(240 10% 11%)` (Deep Slate / Off-Black)
- **Dark Mode:**
  - Background: `hsl(240 10% 11%)` (Deep Slate / Off-Black)
  - Foreground (Text): `hsl(0 0% 100%)` (White)

### Brand & Intent Colors (Consistent across modes)
- **Primary:** `hsl(163 96% 25%)` (A rich, deep Teal/Green). Used for primary actions and accents.
- **Secondary:** `hsl(240 4.8% 95.9%)` (Light grayish white).
- **Destructive:** `hsl(0 84.2% 60.2%)` (Vibrant Red) for errors or destructive actions.
- **Accents/Muted:** Various slate shades (e.g., `hsl(240 5.9% 10%)`, `hsl(240 3.8% 46.1%)`) used for borders, muted text, and secondary backgrounds.

### Custom Gradients & Highlights
- The CSS defines a series of vibrant colors (`--color-1` to `--color-5`): Red, Purple, Blue, Cyan, Green. All are configured at `100%` saturation and `63%` lightness. These are likely utilized for animated gradients, border glowing effects, or text gradients.

## 4. Visual Effects & Animations
The design leans heavily into micro-interactions, motion, and dynamic backgrounds to create a "premium" feel.
- **Backgrounds:** A custom `<GridPattern>` is rendered globally behind the content. It utilizes a radial gradient mask (`mask-[radial-gradient(...)]`) to fade out the grid around the edges, producing a modern, tech-focused depth effect.
- **CSS Keyframes:** Custom animations are declared globally:
  - `orbit`: Rotates elements around a central point (like a planetary system).
  - `meteor`: Creates diagonal shooting star effects.
  - `ripple`: Concentric expanding circles.
  - `background-position-spin`: Continuously rotates background gradients.
- **Particles & Carousels:** The inclusion of `@tsparticles/react` and `embla-carousel-react` points to dynamic, interactive sections (e.g., a hero section with particle nodes or a project showcase carousel).
- **Smooth Scrolling:** Enforced at the document level via `scroll-smooth`.

## 5. Summary
The `pphat.me` design system is built to be modern, highly interactive, and visually striking. The high-contrast dark/light modes pair elegantly with the signature Teal (`#027d54` approx) primary color. The typography creates a distinct personality by mixing clean, geometric sans-serifs with expressive display fonts. The heavy emphasis on motion (Framer Motion, CSS animations, particles, and masking) ensures the portfolio feels alive and responsive.
