import { baseColors } from './colors.js';

if (window.tailwind && tailwind)
  tailwind.config = {
    // Enable dark mode via class strategy
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Include all base color scales
          ...baseColors,

          // Semantic color mapping to CSS variables
          // These map to the theme colors defined in colors.js
          background: 'var(--color-background)', // Page background
          foreground: 'var(--color-foreground)', // Default text color
          muted: 'var(--color-muted)', // Subtle backgrounds
          'muted-foreground': 'var(--color-mutedForeground)', // Secondary text
          border: 'var(--color-border)', // Border colors

          // Primary colors with foreground text colors
          primary: {
            DEFAULT: 'var(--color-primary)', // Primary elements
            foreground: 'var(--color-primaryForeground)', // Text on primary
          },

          // Secondary colors with foreground text colors
          secondary: {
            DEFAULT: 'var(--color-secondary)', // Secondary elements
            foreground: 'var(--color-secondaryForeground)', // Text on secondary
          },

          // Accent colors with foreground text colors
          accent: {
            DEFAULT: 'var(--color-accent)', // Accent elements
            foreground: 'var(--color-accentForeground)', // Text on accent
          },
        },
      },
    },
  };
