/**
 * TypeScript definitions for Festive Snow
 *
 * Provides complete type safety for all exported classes, functions, and interfaces.
 *
 * @version 1.0.0
 * @license MIT
 */

/**
 * Configuration options for SnowEffect
 */
export interface SnowEffectOptions {
    /** Intensity level: 'light', 'medium', or 'heavy' (default: 'medium') */
    intensity?: 'light' | 'medium' | 'heavy';
    /** Whether the effect is enabled (default: false) */
    enabled?: boolean;
    /** Optional callback for date-based visibility (return true to display) */
    seasonCheck?: () => boolean;
    /** Whether to automatically start the effect (default: true) */
    autoStart?: boolean;
}

/**
 * Intensity configuration defining particle counts and ranges
 */
export interface IntensityConfig {
    /** Number of snowflake particles */
    count: number;
    /** Speed range for particles [min, max] */
    speedRange: [number, number];
    /** Size range for particles [min, max] */
    sizeRange: [number, number];
    /** Number of static Christmas trees */
    trees: number;
    /** Number of static wreaths */
    wreaths: number;
}

/**
 * Main snow effect class
 *
 * Manages canvas-based particle system with snowflakes, trees, wreaths, and Santa's sleigh.
 */
export class SnowEffect {
    /**
     * Create a new SnowEffect instance
     * @param options Configuration options
     */
    constructor(options?: SnowEffectOptions);

    /** Current intensity level */
    intensity: 'light' | 'medium' | 'heavy';

    /** Whether the effect is enabled */
    enabled: boolean;

    /** Optional season check callback */
    seasonCheck: (() => boolean) | null;

    /**
     * Check if the effect should be displayed based on season check callback
     * @returns True if effect should display
     */
    shouldDisplay(): boolean;

    /**
     * Initialize the canvas and particles
     */
    init(): void;

    /**
     * Start the animation loop
     */
    start(): void;

    /**
     * Pause the animation loop
     */
    pause(): void;

    /**
     * Stop the animation and clean up resources
     */
    stop(): void;

    /**
     * Set the intensity level
     * @param level Intensity level: 'light', 'medium', or 'heavy'
     */
    setIntensity(level: 'light' | 'medium' | 'heavy'): void;
}

/**
 * Configuration options for SnowToggle UI component
 */
export interface SnowToggleOptions extends SnowEffectOptions {
    /** Container to append toggle to (default: document.body) */
    container?: HTMLElement;
    /** Position: 'top-right', 'top-left', 'bottom-right', 'bottom-left' (default: 'bottom-right') */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    /** Custom icon HTML or 'default' for built-in tree icon (default: 'default') */
    icon?: string;
    /** localStorage key prefix (default: 'festive-snow') */
    storageKey?: string;
    /** Available intensity levels (default: ['light', 'medium', 'heavy']) */
    intensities?: string[];
    /** Default intensity level (default: 'medium') */
    defaultIntensity?: string;
}

/**
 * UI toggle component with intensity slider
 *
 * Provides a button to enable/disable snow effect and slider to adjust intensity.
 * Automatically saves state to localStorage.
 */
export class SnowToggle {
    /**
     * Create a new SnowToggle instance
     * @param SnowEffectClass The SnowEffect class to instantiate
     * @param options Configuration options
     */
    constructor(SnowEffectClass: typeof SnowEffect, options?: SnowToggleOptions);

    /**
     * Enable the snow effect
     * @param intensity Intensity level (default: 'medium')
     */
    enable(intensity?: string): void;

    /**
     * Disable the snow effect
     */
    disable(): void;

    /**
     * Set the intensity level
     * @param level Intensity level
     */
    setIntensity(level: string): void;

    /**
     * Destroy the toggle and clean up resources
     */
    destroy(): void;
}

/**
 * Simple localStorage wrapper with automatic JSON serialization
 */
export class SimpleStorage {
    /**
     * Create a new SimpleStorage instance
     * @param prefix Key prefix for namespacing (default: 'festive-snow')
     */
    constructor(prefix?: string);

    /**
     * Get a value from localStorage
     * @param key The key to retrieve
     * @param defaultValue Default value if key doesn't exist (default: null)
     * @returns The stored value or defaultValue
     */
    get<T = any>(key: string, defaultValue?: T): T;

    /**
     * Set a value in localStorage
     * @param key The key to store under
     * @param value The value to store (will be JSON serialized)
     * @returns True if successful, false otherwise
     */
    set(key: string, value: any): boolean;

    /**
     * Remove a value from localStorage
     * @param key The key to remove
     * @returns True if successful, false otherwise
     */
    remove(key: string): boolean;

    /**
     * Check if localStorage is available
     * @returns True if localStorage is supported and enabled
     */
    isAvailable(): boolean;
}

/**
 * Create and initialize a snow effect
 * @param options Configuration options
 * @returns The created SnowEffect instance
 *
 * @example
 * ```typescript
 * const snow = createSnowEffect({ intensity: 'heavy' });
 * ```
 */
export function createSnowEffect(options?: SnowEffectOptions): SnowEffect;

/**
 * Create a snow toggle UI with intensity controls
 * @param options Configuration options
 * @returns The created SnowToggle instance
 *
 * @example
 * ```typescript
 * createSnowToggle({ position: 'top-right' });
 * ```
 */
export function createSnowToggle(options?: SnowToggleOptions): SnowToggle;

/**
 * Helper function to check if it's the festive season (December 1 - January 3)
 * @returns True if within festive season
 *
 * @example
 * ```typescript
 * if (isFestiveSeason()) {
 *   createSnowToggle();
 * }
 * ```
 */
export function isFestiveSeason(): boolean;

/**
 * Default export containing all exports
 */
declare const FestiveSnow: {
    SnowEffect: typeof SnowEffect;
    SnowToggle: typeof SnowToggle;
    SimpleStorage: typeof SimpleStorage;
    createSnowEffect: typeof createSnowEffect;
    createSnowToggle: typeof createSnowToggle;
    isFestiveSeason: typeof isFestiveSeason;
};

export default FestiveSnow;
