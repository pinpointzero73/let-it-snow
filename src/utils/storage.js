/**
 * SimpleStorage - Lightweight localStorage wrapper
 *
 * Provides a simple interface for storing and retrieving data from localStorage
 * with automatic JSON serialization/deserialization and error handling.
 *
 * @license MIT
 */

export class SimpleStorage {
  /**
   * Create a new SimpleStorage instance
   * @param {string} prefix - Key prefix for namespacing (default: 'festive-snow')
   */
  constructor(prefix = 'festive-snow') {
    this.prefix = prefix;
  }

  /**
   * Get a value from localStorage
   * @param {string} key - The key to retrieve
   * @param {*} defaultValue - Default value if key doesn't exist (default: null)
   * @returns {*} The stored value or defaultValue
   */
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(`${this.prefix}:${key}`);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Set a value in localStorage
   * @param {string} key - The key to store under
   * @param {*} value - The value to store (will be JSON serialized)
   * @returns {boolean} True if successful, false otherwise
   */
  set(key, value) {
    try {
      localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Remove a value from localStorage
   * @param {string} key - The key to remove
   * @returns {boolean} True if successful, false otherwise
   */
  remove(key) {
    try {
      localStorage.removeItem(`${this.prefix}:${key}`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if localStorage is available
   * @returns {boolean} True if localStorage is supported and enabled
   */
  isAvailable() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
