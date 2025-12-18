# 🎄 Festive Snow

A lightweight, zero-dependency JavaScript library that adds a beautiful canvas-based festive snow effect to your web
pages. Perfect for adding holiday cheer to your website!

## ✨ Features

- **Canvas-Based Animation** - Smooth 60fps particle system with realistic physics
- **Festive Elements**:
    - 6-pointed crystalline snowflakes with rotation
    - Decorated Christmas trees with twinkling lights, baubles, tinsel, and gold star
    - Christmas wreaths with bows and ornaments
    - Santa's sleigh with 5 reindeer (including Rudolph's glowing red nose!)
    - Smooth sine wave flight motion for sleighs
- **Zero Dependencies** - Pure vanilla JavaScript, no external libraries required
- **Framework Agnostic** - Works with React, Vue, Angular, or plain HTML/JS
- **Mobile Responsive** - Automatically reduces particles on smaller screens
- **Optional UI Controls** - Toggle button with intensity slider (Light, Medium, Heavy)
- **State Persistence** - Remembers user preferences using localStorage
- **TypeScript Support** - Full type definitions included
- **Tiny Bundle Size** - ~15-20KB minified
- **Seasonal Control** - Optional date-based visibility

## 📦 Installation

### NPM

```bash
npm install festive-snow
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/festive-snow/dist/festive-snow.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/festive-snow/dist/festive-snow.css">
```

## 🚀 Quick Start

### Drop-in with UI (Simplest)

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/festive-snow/dist/festive-snow.css">
</head>
<body>
    <h1>Happy Holidays!</h1>

    <script src="https://cdn.jsdelivr.net/npm/festive-snow/dist/festive-snow.min.js"></script>
    <script>
        // Create toggle button with default settings
        FestiveSnow.createSnowToggle();
    </script>
</body>
</html>
```

### ES6 Modules

```javascript
import { createSnowToggle } from 'festive-snow';
import 'festive-snow/dist/festive-snow.css';

// Create toggle with custom options
createSnowToggle({
    position: 'top-right',
    defaultIntensity: 'medium'
});
```

### Programmatic Control

```javascript
import { createSnowEffect } from 'festive-snow';

// Start snow immediately
const snow = createSnowEffect({ intensity: 'heavy' });

// Control manually
snow.pause();
snow.start();
snow.setIntensity('light');
snow.stop();
```

## 📖 API Reference

### `createSnowToggle(options)`

Create a toggle button with intensity controls.

**Options:**

- `container` (HTMLElement) - Container to append toggle to (default: `document.body`)
- `position` (string) - Position: `'top-right'`, `'top-left'`, `'bottom-right'`, `'bottom-left'` (default:
  `'bottom-right'`)
- `icon` (string) - Custom icon HTML or `'default'` for built-in tree icon
- `storageKey` (string) - localStorage key prefix (default: `'festive-snow'`)
- `intensities` (string[]) - Available intensity levels (default: `['light', 'medium', 'heavy']`)
- `defaultIntensity` (string) - Default intensity (default: `'medium'`)
- `seasonCheck` (Function) - Optional callback for date-based visibility

**Returns:** `SnowToggle` instance

**Example:**

```javascript
const toggle = createSnowToggle({
    position: 'top-right',
    seasonCheck: () => {
        const now = new Date();
        const month = now.getMonth();
        return month === 11 || month === 0; // December or January
    }
});
```

### `createSnowEffect(options)`

Create and initialise a snow effect.

**Options:**

- `intensity` (string) - Intensity level: `'light'`, `'medium'`, `'heavy'` (default: `'medium'`)
- `enabled` (boolean) - Whether effect is enabled (default: `false`)
- `seasonCheck` (Function) - Optional callback for date-based visibility
- `autoStart` (boolean) - Whether to automatically start (default: `true`)

**Returns:** `SnowEffect` instance

**Example:**

```javascript
const snow = createSnowEffect({
    intensity: 'heavy',
    autoStart: true,
    seasonCheck: () => isFestiveSeason()
});
```

### `SnowEffect` Class

**Methods:**

- `init()` - Initialise canvas and particles
- `start()` - Start animation loop
- `pause()` - Pause animation
- `stop()` - Stop animation and clean up
- `setIntensity(level)` - Change intensity (`'light'`, `'medium'`, `'heavy'`)
- `shouldDisplay()` - Check if effect should display based on season check

### `SnowToggle` Class

**Methods:**

- `enable(intensity)` - Enable snow effect with optional intensity
- `disable()` - Disable snow effect
- `setIntensity(level)` - Change intensity level
- `destroy()` - Remove toggle and clean up

### `isFestiveSeason()`

Helper function to check if it's the festive season (December 1 - January 3).

**Returns:** `boolean`

**Example:**

```javascript
if (isFestiveSeason()) {
    createSnowToggle();
}
```

## 🎨 Customisation

### Intensity Levels

Each intensity level controls the number of particles and decorations:

| Intensity | Snowflakes | Trees | Wreaths |
|-----------|------------|-------|---------|
| Light     | 50         | 5     | 3       |
| Medium    | 150        | 10    | 6       |
| Heavy     | 300        | 20    | 10      |

### Custom Positioning

```javascript
createSnowToggle({
    position: 'top-left', // or 'top-right', 'bottom-right', 'bottom-left'
});
```

### Custom Icon

```javascript
createSnowToggle({
    icon: '<svg>...</svg>', // Your custom SVG icon
});
```

### Season-Based Visibility

```javascript
createSnowToggle({
    seasonCheck: () => {
        const now = new Date();
        const month = now.getMonth();
        const day = now.getDate();
        // Show from December 1 to January 3
        return (month === 11) || (month === 0 && day <= 3);
    }
});
```

## 🎯 Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';
import { SnowEffect } from 'festive-snow';
import 'festive-snow/dist/festive-snow.css';

function Snow({ intensity = 'medium', enabled = true }) {
    const snowRef = useRef(null);

    useEffect(() => {
        if (enabled) {
            const snow = new SnowEffect({ intensity });
            snow.init();
            snow.start();
            snowRef.current = snow;

            return () => {
                snow.stop();
            };
        }
    }, [intensity, enabled]);

    return null;
}

// Usage
function App() {
    const [showSnow, setShowSnow] = useState(true);

    return (
        <div>
            <button onClick={() => setShowSnow(!showSnow)}>
                Toggle Snow
            </button>
            {showSnow && <Snow intensity="medium" />}
        </div>
    );
}
```

### Vue 3

```vue
<template>
    <div></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { SnowEffect } from 'festive-snow';
import 'festive-snow/dist/festive-snow.css';

const props = defineProps({
    intensity: {
        type: String,
        default: 'medium'
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

let snow = null;

onMounted(() => {
    if (props.enabled) {
        snow = new SnowEffect({ intensity: props.intensity });
        snow.init();
        snow.start();
    }
});

onUnmounted(() => {
    if (snow) {
        snow.stop();
    }
});

watch(() => props.intensity, (newIntensity) => {
    if (snow) {
        snow.setIntensity(newIntensity);
    }
});
</script>
```

### Angular

```typescript
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SnowEffect } from 'festive-snow';

@Component({
    selector: 'app-snow',
    template: ''
})
export class SnowComponent implements OnInit, OnDestroy {
    @Input() intensity: 'light' | 'medium' | 'heavy' = 'medium';
    @Input() enabled: boolean = true;

    private snow: SnowEffect | null = null;

    ngOnInit() {
        if (this.enabled) {
            this.snow = new SnowEffect({ intensity: this.intensity });
            this.snow.init();
            this.snow.start();
        }
    }

    ngOnDestroy() {
        if (this.snow) {
            this.snow.stop();
        }
    }
}
```

## 🌐 Browser Support

- Chrome/Edge: ✅ Latest 2 versions
- Firefox: ✅ Latest 2 versions
- Safari: ✅ Latest 2 versions
- Mobile browsers: ✅ iOS Safari, Chrome Mobile

**Requirements:**

- Canvas API support
- ES6+ (or transpilation)
- requestAnimationFrame API

## ⚡ Performance

- **60 FPS** animation using `requestAnimationFrame`
- **Automatic optimisation** on mobile devices (50% fewer particles)
- **Page Visibility API** - Pauses when tab is hidden
- **Efficient rendering** - Only redraws changed elements
- **Low memory footprint** - ~5-10MB typical usage

## 📝 License

MIT © Darryl Waterhouse

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Issues

Found a bug or have a feature request? Please open an issue on GitHub.

## 🎅 Credits

Inspired by the classic `xsnow` program. Built with love for the holiday season! 🎄❄️
