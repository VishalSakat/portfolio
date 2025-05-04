/**
 * Theme Manager
 * Handles theme state management, persistence, and system preference detection
 */

import { baseColors, themePresets } from './colors.js';
import { env } from '../env.js';
class ThemeManager {
  /**
   * Initialize the theme manager with optional configuration
   * @param {Object} options - Configuration options
   * @param {string} options.defaultPreset - Default theme preset to use
   * @param {string} options.defaultTheme - Default theme mode (light/dark)
   * @param {string} options.storageKey - LocalStorage key for theme preference
   */
  constructor(options = {}) {
    this.options = {
      defaultPreset: env?.app?.themePreset ?? 'default',
      defaultTheme: 'light',
      storageKey: 'theme-preference',
      ...options,
    };

    this.currentPreset = this.loadPreset();
    this.currentTheme = this.loadTheme();

    this.init();
  }

  /**
   * Initialize theme system
   * Applies initial theme and sets up system theme listeners
   */
  init() {
    this.applyTheme();
    this.setupSystemThemeListener();
  }

  /**
   * Load saved theme preset from localStorage
   * @returns {string} Theme preset name
   */
  loadPreset() {
    const stored = localStorage.getItem('theme-preset');
    return stored || this.options.defaultPreset;
  }

  /**
   * Load theme preference from storage or system
   * Checks localStorage first, then system preference
   * @returns {string} Theme mode (light/dark)
   */
  loadTheme() {
    // Check local storage first
    const stored = localStorage.getItem(this.options.storageKey);
    if (stored) return stored;

    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'light'; // TODO: defaulting to light theme for now, but we should use system theme in future dark
    }

    return this.options.defaultTheme;
  }

  /**
   * Set up listener for system theme changes
   * Only applies if user hasn't set a manual preference
   */
  setupSystemThemeListener() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (localStorage.getItem(this.options.storageKey)) return;
        this.setTheme(e.matches ? 'dark' : 'light');
      });
  }

  /**
   * Change the current theme preset
   * @param {string} preset - Name of the preset to apply
   */
  setPreset(preset) {
    if (!themePresets[preset]) return;
    this.currentPreset = preset;
    localStorage.setItem('theme-preset', preset);
    this.applyTheme();
  }

  /**
   * Change the current theme mode
   * @param {string} theme - Theme mode to apply (light/dark)
   */
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    this.currentTheme = theme;
    localStorage.setItem(this.options.storageKey, theme);
    this.applyTheme();
  }

  /**
   * Apply the current theme to the document
   * Sets CSS variables and updates class names
   */
  applyTheme() {
    const colors =
      themePresets?.[this.currentPreset]?.[this.currentTheme] ??
      themePresets.default.light;

    // Add transition class before changing theme
    document.documentElement.classList.add('theme-transition');

    // Set CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });

    // Update Tailwind dark mode class
    document.documentElement.classList.toggle(
      'dark',
      this.currentTheme === 'dark',
    );

    // Remove transition class after changes are complete
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 200);

    // Notify theme change listeners
    window.dispatchEvent(
      new CustomEvent('themechange', {
        detail: { theme: this.currentTheme, preset: this.currentPreset },
      }),
    );
  }

  /**
   * Get current theme state
   * @returns {Object} Current theme configuration
   */
  getCurrentTheme() {
    return {
      preset: this.currentPreset,
      theme: this.currentTheme,
      colors: themePresets[this.currentPreset][this.currentTheme],
    };
  }
}

// Export singleton instance and types
export const themeManager = new ThemeManager();
export { baseColors, themePresets };
