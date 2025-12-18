/**
 * SnowToggle - UI controller for festive snow effect
 *
 * Provides a toggle button with intensity slider for controlling the snow effect.
 * Includes state persistence using localStorage.
 *
 * @license MIT
 */

import {SimpleStorage} from '../utils/storage.js';
import './styles.css';

// Default Christmas tree icon SVG
const DEFAULT_TREE_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 4h-1l2 4h-1.5l2.5 5h-2l3 6H7l3-6H8l2.5-5H9l2-4h-1l2-4z"/></svg>`;

export class SnowToggle {
  /**
   * Create a new SnowToggle instance
   * @param {class} SnowEffectClass - The SnowEffect class to instantiate
   * @param {Object} options - Configuration options
   * @param {HTMLElement} options.container - Container to append toggle to (default: document.body)
   * @param {string} options.position - Position: 'top-right', 'top-left', 'bottom-right', 'bottom-left' (default: 'bottom-right')
   * @param {string} options.icon - Custom icon HTML or 'default' for built-in tree icon
   * @param {string} options.storageKey - localStorage key prefix (default: 'festive-snow')
   * @param {string[]} options.intensities - Available intensity levels (default: ['light', 'medium', 'heavy'])
   * @param {string} options.defaultIntensity - Default intensity level (default: 'medium')
   * @param {Function} options.seasonCheck - Optional callback for date-based visibility
   */
  constructor(SnowEffectClass, options = {}) {
    this.SnowEffect = SnowEffectClass;
    this.options = {
      container: options.container || document.body,
      position: options.position || 'bottom-right',
      icon: options.icon || 'default',
      storageKey: options.storageKey || 'festive-snow',
      intensities: options.intensities || ['light', 'medium', 'heavy'],
      defaultIntensity: options.defaultIntensity || 'medium',
      seasonCheck: options.seasonCheck || null,
      ...options
    };

    this.storage = new SimpleStorage(this.options.storageKey);
    this.snowEffect = null;
    this.elements = {};

    this.init();
  }

  /**
   * Initialize the toggle UI and event handlers
   */
  init() {
    this.createUI();
    this.attachEvents();
    this.restoreState();
  }

  /**
   * Create the toggle button and intensity slider UI
   */
  createUI() {
    // Determine icon HTML
    const iconHtml = this.options.icon === 'default' ? DEFAULT_TREE_ICON : this.options.icon;

    // Create container element
    const container = document.createElement('div');
    container.className = 'festive-snow-toggle-container';
    container.dataset.position = this.options.position;

    // Build intensity buttons
    const intensityButtons = this.options.intensities
      .map(intensity => {
        const label = intensity.charAt(0).toUpperCase() + intensity.slice(1);
        return `<button class="festive-snow-intensity-btn" data-intensity="${intensity}">${label}</button>`;
      })
      .join('');

    // Create HTML
    container.innerHTML = `
            <button class="festive-snow-toggle" id="festive-snow-toggle" data-tooltip="Snow effect">
                ${iconHtml}
            </button>
            <div class="festive-snow-slider" id="festive-snow-slider">
                ${intensityButtons}
            </div>
        `;

    // Append to container
    this.options.container.appendChild(container);

    // Store references to elements
    this.elements.container = container;
    this.elements.toggleBtn = container.querySelector('.festive-snow-toggle');
    this.elements.slider = container.querySelector('.festive-snow-slider');
    this.elements.intensityButtons = container.querySelectorAll('.festive-snow-intensity-btn');
  }

  /**
   * Attach event listeners
   */
  attachEvents() {
    // Toggle button click handler
    this.elements.toggleBtn.addEventListener('click', () => {
      const isActive = this.elements.toggleBtn.classList.contains('active');

      if (isActive) {
        this.disable();
      } else {
        const intensity = this.storage.get('intensity', this.options.defaultIntensity);
        this.enable(intensity);
      }
    });

    // Intensity button click handlers
    this.elements.intensityButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const intensity = btn.dataset.intensity;
        this.setIntensity(intensity);
      });
    });
  }

  /**
   * Restore saved state from localStorage
   */
  restoreState() {
    const enabled = this.storage.get('enabled', false);
    const intensity = this.storage.get('intensity', this.options.defaultIntensity);

    if (enabled) {
      this.enable(intensity);
    }

    this.updateSliderState();
  }

  /**
   * Enable snow effect
   * @param {string} intensity - Intensity level (light, medium, heavy)
   */
  enable(intensity = 'medium') {
    // Check season if callback provided
    if (typeof this.options.seasonCheck === 'function' && !this.options.seasonCheck()) {
      console.log('[FestiveSnow] Not enabling - outside festive season');
      return;
    }

    // Stop existing effect
    if (this.snowEffect) {
      this.snowEffect.stop();
    }

    // Create and start new effect
    this.snowEffect = new this.SnowEffect({
      intensity,
      enabled: true,
      seasonCheck: this.options.seasonCheck
    });
    this.snowEffect.init();
    this.snowEffect.start();

    // Update UI
    this.elements.toggleBtn.classList.add('active');

    // Save state
    this.storage.set('enabled', true);
    this.storage.set('intensity', intensity);

    this.updateSliderState();
  }

  /**
   * Disable snow effect
   */
  disable() {
    // Stop effect
    if (this.snowEffect) {
      this.snowEffect.stop();
      this.snowEffect = null;
    }

    // Update UI
    this.elements.toggleBtn.classList.remove('active');

    // Save state
    this.storage.set('enabled', false);
  }

  /**
   * Set intensity level
   * @param {string} level - Intensity level (light, medium, heavy)
   */
  setIntensity(level) {
    if (!this.options.intensities.includes(level)) {
      console.warn(`[FestiveSnow] Invalid intensity level: ${level}`);
      return;
    }

    // Save intensity
    this.storage.set('intensity', level);

    // Update existing effect if running
    if (this.snowEffect) {
      this.snowEffect.setIntensity(level);
    }

    this.updateSliderState();
  }

  /**
   * Update slider button active states
   */
  updateSliderState() {
    const current = this.storage.get('intensity', this.options.defaultIntensity);
    this.elements.intensityButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.intensity === current);
    });
  }

  /**
   * Destroy the toggle and clean up
   */
  destroy() {
    // Stop effect
    if (this.snowEffect) {
      this.snowEffect.stop();
      this.snowEffect = null;
    }

    // Remove UI
    if (this.elements.container && this.elements.container.parentNode) {
      this.elements.container.parentNode.removeChild(this.elements.container);
    }

    // Clear references
    this.elements = {};
  }
}
