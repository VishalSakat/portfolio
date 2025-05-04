/**
 * Theme color system based on Tailwind CSS color scales
 * This file serves as the single source of truth for all color values
 */

// Base color scales using Tailwind's default color palette
// These can be used directly in Tailwind classes (e.g., bg-primary-500)
export const baseColors = {
  // Primary colors - Blue scale
  // Used for main actions, links, and primary UI elements
  primary: {
    50: '#eff6ff', // Lightest - backgrounds
    100: '#dbeafe', // Light hover states
    200: '#bfdbfe', // Subtle backgrounds
    300: '#93c5fd', // Hover states
    400: '#60a5fa', // Disabled states
    500: '#3b82f6', // Default state
    600: '#2563eb', // Hover state
    700: '#1d4ed8', // Active state
    800: '#1e40af', // Text on light backgrounds
    900: '#1e3a8a', // Darkest - emphasised text
  },

  // Secondary colors - Slate scale
  // Used for text, backgrounds, and neutral UI elements
  secondary: {
    50: '#f8fafc', // Page backgrounds
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Accent colors - Indigo scale
  // Used for highlights, accents, and secondary actions
  accent: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
};

/**
 * Theme presets define complete color schemes for both light and dark modes
 * Each preset contains semantic color mappings that define how colors are used
 * in the application's UI components
 */
export const themePresets = {
  // Default theme
  // A balanced and versatile color scheme suitable for most modern web applications
  // Primary: Strong trustworthy blue - reliability & professionalism
  // Secondary: Lighter blue - subtle hierarchy and depth
  // Accent: Warm red - clear call-to-actions
  // Inspired by: Modern design systems like Material Design, Tailwind
  default: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      primary: '#2563eb',
      primaryForeground: '#ffffff',
      secondary: '#60a5fa',
      secondaryForeground: '#ffffff',
      accent: '#f43f5e',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      primary: '#2563eb',
      primaryForeground: '#ffffff',
      secondary: '#60a5fa',
      secondaryForeground: '#ffffff',
      accent: '#f43f5e',
      accentForeground: '#ffffff',
    },
  },

  // SaaS Platform Theme
  // Professional and trustworthy design for software-as-a-service applications
  // Primary: Sky blue - trust & reliability
  // Secondary: Lighter sky blue - visual hierarchy
  // Accent: Vibrant purple - innovation & creativity
  // Inspired by: Successful SaaS platforms like Slack, Dropbox, Asana
  saas: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f0f9ff',
      mutedForeground: '#64748b',
      border: '#e0f2fe',
      primary: '#0ea5e9',
      primaryForeground: '#ffffff',
      secondary: '#38bdf8',
      secondaryForeground: '#ffffff',
      accent: '#a855f7',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0c1929',
      foreground: '#e2e8f0',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      primary: '#0ea5e9',
      primaryForeground: '#ffffff',
      secondary: '#38bdf8',
      secondaryForeground: '#ffffff',
      accent: '#a855f7',
      accentForeground: '#ffffff',
    },
  },

  // FinTech Theme
  // Professional and secure design for financial technology applications
  // Primary: Deep blue - security & stability
  // Secondary: Navy - professionalism & trust
  // Accent: Emerald - success & growth
  // Inspired by: Modern banking apps, trading platforms, payment services
  fintech: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      primary: '#0f172a',
      primaryForeground: '#ffffff',
      secondary: '#1e293b',
      secondaryForeground: '#ffffff',
      accent: '#10b981',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      primary: '#0f172a',
      primaryForeground: '#ffffff',
      secondary: '#1e293b',
      secondaryForeground: '#ffffff',
      accent: '#10b981',
      accentForeground: '#ffffff',
    },
  },

  // E-commerce Theme
  // Conversion-focused design for online shopping platforms
  // Primary: Trustworthy blue - security & confidence
  // Secondary: Lighter blue - navigation & structure
  // Accent: Pure red - urgency & calls-to-action
  // Inspired by: Leading e-commerce platforms like Amazon, Shopify, PayPal
  commerce: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f5f7fa',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      primary: '#0066cc',
      primaryForeground: '#ffffff',
      secondary: '#3b82f6',
      secondaryForeground: '#ffffff',
      accent: '#ef4444',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      primary: '#0066cc',
      primaryForeground: '#ffffff',
      secondary: '#3b82f6',
      secondaryForeground: '#ffffff',
      accent: '#ef4444',
      accentForeground: '#ffffff',
    },
  },

  // Social Platform Theme
  // Engaging and interactive design for social media applications
  // Primary: Vibrant purple - creativity & community
  // Secondary: Lighter purple - engagement & interaction
  // Accent: Energetic orange - activity & enthusiasm
  // Inspired by: Modern social platforms like Discord, Instagram
  social: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#faf5ff',
      mutedForeground: '#64748b',
      border: '#f3e8ff',
      primary: '#8b5cf6',
      primaryForeground: '#ffffff',
      secondary: '#a78bfa',
      secondaryForeground: '#ffffff',
      accent: '#f97316',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0c0a0f',
      foreground: '#e2e8f0',
      muted: '#1a1625',
      mutedForeground: '#94a3b8',
      border: '#2d2438',
      primary: '#8b5cf6',
      primaryForeground: '#ffffff',
      secondary: '#a78bfa',
      secondaryForeground: '#ffffff',
      accent: '#f97316',
      accentForeground: '#ffffff',
    },
  },

  // Analytics Dashboard Theme
  // Clean and focused design for data visualization interfaces
  // Primary: Dark slate - professionalism & focus
  // Secondary: Mid slate - hierarchy & organization
  // Accent: Royal blue - data highlights & insights
  // Inspired by: Data platforms like Tableau, Google Analytics
  analytics: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      primary: '#1e293b',
      primaryForeground: '#ffffff',
      secondary: '#475569',
      secondaryForeground: '#ffffff',
      accent: '#2563eb',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      primary: '#1e293b',
      primaryForeground: '#ffffff',
      secondary: '#475569',
      secondaryForeground: '#ffffff',
      accent: '#2563eb',
      accentForeground: '#ffffff',
    },
  },

  // Healthcare Platform Theme
  // Calming and professional design for medical applications
  // Primary: Teal - healing & care
  // Secondary: Lighter teal - clarity & cleanliness
  // Accent: Deep blue - trust & professionalism
  // Inspired by: Modern healthcare platforms, medical dashboards
  medical: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f0fdfa',
      mutedForeground: '#64748b',
      border: '#ccfbf1',
      primary: '#0d9488',
      primaryForeground: '#ffffff',
      secondary: '#14b8a6',
      secondaryForeground: '#ffffff',
      accent: '#0369a1',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f1b1b',
      foreground: '#e2e8f0',
      muted: '#1a2727',
      mutedForeground: '#94a3b8',
      border: '#234242',
      primary: '#0d9488',
      primaryForeground: '#ffffff',
      secondary: '#14b8a6',
      secondaryForeground: '#ffffff',
      accent: '#0369a1',
      accentForeground: '#ffffff',
    },
  },

  // Education Platform Theme
  // Engaging and focused design for learning platforms
  // Primary: Deep purple - wisdom & knowledge
  // Secondary: Bright purple - creativity & engagement
  // Accent: Bright blue - progress & achievement
  // Inspired by: E-learning platforms like Coursera, Udemy, Khan Academy
  education: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#faf5ff',
      mutedForeground: '#64748b',
      border: '#f3e8ff',
      primary: '#6d28d9',
      primaryForeground: '#ffffff',
      secondary: '#8b5cf6',
      secondaryForeground: '#ffffff',
      accent: '#3b82f6',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f1129',
      foreground: '#e2e8f0',
      muted: '#1e1b4b',
      mutedForeground: '#94a3b8',
      border: '#312e81',
      primary: '#6d28d9',
      primaryForeground: '#ffffff',
      secondary: '#8b5cf6',
      secondaryForeground: '#ffffff',
      accent: '#3b82f6',
      accentForeground: '#ffffff',
    },
  },

  // Productivity App Theme
  // Clean and focused design for task management tools
  // Primary: Slate - focus & clarity
  // Secondary: Light slate - organization & structure
  // Accent: Cyan - energy & progress
  // Inspired by: Tools like Notion, Todoist, Monday.com
  productivity: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      primary: '#334155',
      primaryForeground: '#ffffff',
      secondary: '#64748b',
      secondaryForeground: '#ffffff',
      accent: '#0891b2',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      primary: '#334155',
      primaryForeground: '#ffffff',
      secondary: '#64748b',
      secondaryForeground: '#ffffff',
      accent: '#0891b2',
      accentForeground: '#ffffff',
    },
  },

  // Creative Platform Theme
  // Bold and expressive design for creative tools
  // Primary: Deep pink - creativity & innovation
  // Secondary: Bright pink - expression & energy
  // Accent: Gold - artistic & premium
  // Inspired by: Creative tools like Figma, Adobe CC, Canva
  creative: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#fdf2f8',
      mutedForeground: '#64748b',
      border: '#fce7f3',
      primary: '#be185d',
      primaryForeground: '#ffffff',
      secondary: '#ec4899',
      secondaryForeground: '#ffffff',
      accent: '#eab308',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#18051e',
      foreground: '#e2e8f0',
      muted: '#3b0764',
      mutedForeground: '#94a3b8',
      border: '#581c87',
      primary: '#be185d',
      primaryForeground: '#ffffff',
      secondary: '#ec4899',
      secondaryForeground: '#ffffff',
      accent: '#eab308',
      accentForeground: '#ffffff',
    },
  },

  // Minimal Interface Theme
  // Clean and distraction-free design
  // Primary: Near black - focus & clarity
  // Secondary: Mid gray - subtle hierarchy
  // Accent: Light gray - minimal emphasis
  // Inspired by: Minimalist apps like Bear, iA Writer, Things
  minimal: {
    light: {
      background: '#ffffff',
      foreground: '#18181b',
      muted: '#f4f4f5',
      mutedForeground: '#71717a',
      border: '#e4e4e7',
      primary: '#18181b',
      primaryForeground: '#ffffff',
      secondary: '#3f3f46',
      secondaryForeground: '#ffffff',
      accent: '#71717a',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#18181b',
      foreground: '#f4f4f5',
      muted: '#27272a',
      mutedForeground: '#a1a1aa',
      border: '#3f3f46',
      primary: '#18181b',
      primaryForeground: '#ffffff',
      secondary: '#3f3f46',
      secondaryForeground: '#ffffff',
      accent: '#71717a',
      accentForeground: '#ffffff',
    },
  },

  // Modern Web App Theme
  // Contemporary and vibrant design for modern applications
  // Primary: Indigo - contemporary & professional
  // Secondary: Lighter indigo - depth & interaction
  // Accent: Rose - energy & modernity
  // Inspired by: Modern web apps like Linear, Vercel, Raycast
  modern: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f5f3ff',
      mutedForeground: '#64748b',
      border: '#ede9fe',
      primary: '#4f46e5',
      primaryForeground: '#ffffff',
      secondary: '#6366f1',
      secondaryForeground: '#ffffff',
      accent: '#e11d48',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#0f1129',
      foreground: '#e2e8f0',
      muted: '#1e1b4b',
      mutedForeground: '#94a3b8',
      border: '#312e81',
      primary: '#4f46e5',
      primaryForeground: '#ffffff',
      secondary: '#6366f1',
      secondaryForeground: '#ffffff',
      accent: '#e11d48',
      accentForeground: '#ffffff',
    },
  },

  // Nature Theme
  // Fresh and organic design for environmental and wellness applications
  // Primary: Vibrant green - growth & sustainability
  // Secondary: Sage green - balance & harmony
  // Accent: Sky blue - freshness & clarity
  // Inspired by: Eco-friendly apps, wellness platforms, nature-focused services
  nature: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#f0fdf4',
      mutedForeground: '#64748b',
      border: '#dcfce7',
      primary: '#16a34a',
      primaryForeground: '#ffffff',
      secondary: '#4ade80',
      secondaryForeground: '#ffffff',
      accent: '#0ea5e9',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#052e16',
      foreground: '#e2e8f0',
      muted: '#14532d',
      mutedForeground: '#94a3b8',
      border: '#166534',
      primary: '#22c55e',
      primaryForeground: '#ffffff',
      secondary: '#4ade80',
      secondaryForeground: '#ffffff',
      accent: '#0ea5e9',
      accentForeground: '#ffffff',
    },
  },

  // Energy Theme
  // Vibrant and energetic design for dynamic applications
  // Primary: Warm yellow - optimism & energy
  // Secondary: Light amber - warmth & positivity
  // Accent: Orange - enthusiasm & creativity
  // Inspired by: Energy apps, fitness platforms, activity trackers
  energy: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#fefce8',
      mutedForeground: '#64748b',
      border: '#fef9c3',
      primary: '#eab308',
      primaryForeground: '#1a1a1a',
      secondary: '#facc15',
      secondaryForeground: '#1a1a1a',
      accent: '#f97316',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#1c1917',
      foreground: '#e2e8f0',
      muted: '#292524',
      mutedForeground: '#94a3b8',
      border: '#44403c',
      primary: '#facc15',
      primaryForeground: '#1a1a1a',
      secondary: '#fbbf24',
      secondaryForeground: '#1a1a1a',
      accent: '#f97316',
      accentForeground: '#ffffff',
    },
  },

  // Passion Theme
  // Bold and dynamic design for high-energy applications
  // Primary: Vibrant red - passion & excitement
  // Secondary: Rose red - energy & emotion
  // Accent: Purple - creativity & luxury
  // Inspired by: Entertainment apps, gaming platforms, media services
  passion: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#fef2f2',
      mutedForeground: '#64748b',
      border: '#fee2e2',
      primary: '#dc2626',
      primaryForeground: '#ffffff',
      secondary: '#ef4444',
      secondaryForeground: '#ffffff',
      accent: '#a855f7',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#450a0a',
      foreground: '#e2e8f0',
      muted: '#7f1d1d',
      mutedForeground: '#94a3b8',
      border: '#991b1b',
      primary: '#ef4444',
      primaryForeground: '#ffffff',
      secondary: '#f87171',
      secondaryForeground: '#ffffff',
      accent: '#a855f7',
      accentForeground: '#ffffff',
    },
  },

  // Sunset Theme
  // Warm and inviting design for lifestyle applications
  // Primary: Vibrant orange - creativity & adventure
  // Secondary: Light orange - warmth & friendliness
  // Accent: Deep pink - energy & passion
  // Inspired by: Lifestyle apps, travel platforms, social sharing
  sunset: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#fff7ed',
      mutedForeground: '#64748b',
      border: '#ffedd5',
      primary: '#f97316',
      primaryForeground: '#ffffff',
      secondary: '#fb923c',
      secondaryForeground: '#ffffff',
      accent: '#e11d48',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#431407',
      foreground: '#e2e8f0',
      muted: '#7c2d12',
      mutedForeground: '#94a3b8',
      border: '#9a3412',
      primary: '#fb923c',
      primaryForeground: '#ffffff',
      secondary: '#fdba74',
      secondaryForeground: '#ffffff',
      accent: '#e11d48',
      accentForeground: '#ffffff',
    },
  },

  // Forest Theme
  // Deep and rich design for environmental applications
  // Primary: Forest green - nature & growth
  // Secondary: Emerald - vitality & freshness
  // Accent: Amber - warmth & organic
  // Inspired by: Nature apps, sustainability platforms, outdoor services
  forest: {
    light: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      muted: '#ecfdf5',
      mutedForeground: '#64748b',
      border: '#d1fae5',
      primary: '#15803d',
      primaryForeground: '#ffffff',
      secondary: '#10b981',
      secondaryForeground: '#ffffff',
      accent: '#d97706',
      accentForeground: '#ffffff',
    },
    dark: {
      background: '#052e16',
      foreground: '#e2e8f0',
      muted: '#14532d',
      mutedForeground: '#94a3b8',
      border: '#166534',
      primary: '#22c55e',
      primaryForeground: '#ffffff',
      secondary: '#34d399',
      secondaryForeground: '#ffffff',
      accent: '#f59e0b',
      accentForeground: '#ffffff',
    },
  },
};
