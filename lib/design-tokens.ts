/**
 * Design Tokens
 * 
 * This file contains design tokens for the portfolio website.
 * These tokens are used to maintain consistency across the design system.
 */

// Color palette
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
    50: "#faf5e1",
    100: "#f5ebc3",
    200: "#f0e1a5",
    300: "#ebd787",
    400: "#e5cd69",
    500: "#e5ba49", // Primary color
    600: "#d1a73c",
    700: "#bd942f",
    800: "#a98122",
    900: "#956e15",
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
    50: "#edf5fd",
    100: "#dbeafb",
    200: "#c9e0f9",
    300: "#b7d5f7",
    400: "#a5caf5",
    500: "#92bef1", // Secondary color
    600: "#7fa9d8",
    700: "#6c94bf",
    800: "#597fa6",
    900: "#466a8d",
  },
  
  // Accent colors
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
    50: "#fdf9f0",
    100: "#fbf3e1",
    200: "#f9edd2",
    300: "#f7e7c3",
    400: "#f5e1b4",
    500: "#f4ebd5", // Accent color
    600: "#dbd4c0",
    700: "#c2bdab",
    800: "#a9a696",
    900: "#908f81",
  },
  
  // Muted colors
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
    50: "#f5f5f6",
    100: "#ebebed",
    200: "#e1e1e4",
    300: "#d7d7db",
    400: "#cdced2",
    500: "#b6b8bf", // Muted color
    600: "#a4a6ac",
    700: "#92949a",
    800: "#808287",
    900: "#6e7075",
  },
  
  // Background and foreground
  background: "var(--background)",
  foreground: "var(--foreground)",
  
  // UI colors
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
};

// Typography
export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
    "6xl": "3.75rem", // 60px
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

// Spacing
export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem",    // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem",     // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem",    // 12px
  3.5: "0.875rem", // 14px
  4: "1rem",       // 16px
  5: "1.25rem",    // 20px
  6: "1.5rem",     // 24px
  7: "1.75rem",    // 28px
  8: "2rem",       // 32px
  9: "2.25rem",    // 36px
  10: "2.5rem",    // 40px
  11: "2.75rem",   // 44px
  12: "3rem",      // 48px
  14: "3.5rem",    // 56px
  16: "4rem",      // 64px
  20: "5rem",      // 80px
  24: "6rem",      // 96px
  28: "7rem",      // 112px
  32: "8rem",      // 128px
  36: "9rem",      // 144px
  40: "10rem",     // 160px
  44: "11rem",     // 176px
  48: "12rem",     // 192px
  52: "13rem",     // 208px
  56: "14rem",     // 224px
  60: "15rem",     // 240px
  64: "16rem",     // 256px
  72: "18rem",     // 288px
  80: "20rem",     // 320px
  96: "24rem",     // 384px
};

// Border radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem",     // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem",     // 6px
  lg: "0.5rem",       // 8px
  xl: "0.75rem",      // 12px
  "2xl": "1rem",      // 16px
  "3xl": "1.5rem",    // 24px
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
};

// Transitions
export const transitions = {
  DEFAULT: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  fast: "all 0.1s cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  easings: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  properties: {
    DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform",
  },
};

// Z-index
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
};

// Export all tokens
export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
};