/**
 * Festive Snow - Canvas-based festive snow animation library
 *
 * A lightweight, zero-dependency JavaScript library that adds a festive snow effect
 * to web pages with customizable intensity and UI controls.
 *
 * Features:
 * - Canvas-based particle system with 6-pointed crystalline snowflakes
 * - Decorated Christmas trees with lights, baubles, tinsel, and star
 * - Christmas wreaths with bows and ornaments
 * - Santa's sleigh with 5 reindeer (including Rudolph with glowing nose)
 * - Smooth sine wave flight motion for sleighs
 * - Wind gusts and realistic physics simulation
 * - Twinkling lights animation
 * - Depth layers for 3D parallax effect
 * - Mobile-responsive (automatically reduces particles on small screens)
 * - Optional UI toggle with intensity slider
 * - State persistence using localStorage
 *
 * @version 1.0.0
 * @license MIT
 * @author Darryl Waterhouse
 */

import {SnowEffect} from './core/SnowEffect.js';
import {SnowToggle} from './ui/SnowToggle.js';
import {SimpleStorage} from './utils/storage.js';

/**
 * Create and initialize a snow effect
 * @param {Object} options - Configuration options
 * @param {string} options.intensity - Intensity level: 'light', 'medium', 'heavy' (default: 'medium')
 * @param {boolean} options.enabled - Whether effect is enabled (default: false)
 * @param {Function} options.seasonCheck - Optional callback for date-based visibility
 * @param {boolean} options.autoStart - Whether to automatically start the effect (default: true)
 * @returns {SnowEffect} The created SnowEffect instance
 *
 * @example
 * // Basic usage
 * const snow = createSnowEffect({ intensity: 'heavy' });
 *
 * @example
 * // With season check
 * const snow = createSnowEffect({
 *   intensity: 'medium',
 *   seasonCheck: () => {
 *     const now = new Date();
 *     const month = now.getMonth();
 *     return month === 11 || month === 0; // December or January
 *   }
 * });
 *
 * @example
 * // Manual control
 * const snow = createSnowEffect({ autoStart: false });
 * // Later...
 * snow.start();
 */
export function createSnowEffect(options = {}) {
  const effect = new SnowEffect(options);
  effect.init();
  if (options.autoStart !== false) {
    effect.start();
  }
  return effect;
}

/**
 * Create a snow toggle UI with intensity controls
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.container - Container to append toggle to (default: document.body)
 * @param {string} options.position - Position: 'top-right', 'top-left', 'bottom-right', 'bottom-left' (default: 'bottom-right')
 * @param {string} options.icon - Custom icon HTML or 'default' for built-in tree icon
 * @param {string} options.storageKey - localStorage key prefix (default: 'festive-snow')
 * @param {string[]} options.intensities - Available intensity levels (default: ['light', 'medium', 'heavy'])
 * @param {string} options.defaultIntensity - Default intensity level (default: 'medium')
 * @param {Function} options.seasonCheck - Optional callback for date-based visibility
 * @returns {SnowToggle} The created SnowToggle instance
 *
 * @example
 * // Basic usage with default UI
 * createSnowToggle();
 *
 * @example
 * // Custom position and season check
 * createSnowToggle({
 *   position: 'top-right',
 *   seasonCheck: () => {
 *     const now = new Date();
 *     const month = now.getMonth();
 *     const day = now.getDate();
 *     return (month === 11) || (month === 0 && day <= 3);
 *   }
 * });
 *
 * @example
 * // Custom intensities
 * createSnowToggle({
 *   intensities: ['gentle', 'moderate', 'blizzard'],
 *   defaultIntensity: 'gentle'
 * });
 */
export function createSnowToggle(options = {}) {
  return new SnowToggle(SnowEffect, options);
}

/**
 * Helper function to check if it's the festive season (December 1 - January 3)
 * @returns {boolean} True if within festive season
 *
 * @example
 * if (isFestiveSeason()) {
 *   createSnowToggle();
 * }
 */
export function isFestiveSeason() {
  const now = new Date();
  const month = now.getMonth(); // 0 = January, 11 = December
  const day = now.getDate();

  // December (month 11) or January 1-3 (month 0, days 1-3)
  return (month === 11) || (month === 0 && day <= 3);
}

// Export individual components for advanced usage
export {SnowEffect, SnowToggle, SimpleStorage};

// Default export for convenience
export default {
  SnowEffect,
  SnowToggle,
  SimpleStorage,
  createSnowEffect,
  createSnowToggle,
  isFestiveSeason
};
