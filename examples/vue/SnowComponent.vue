<template>
  <!-- This component renders nothing, it only manages the snow effect -->
</template>

<script setup>
/**
 * Vue 3 component for Festive Snow (Composition API)
 *
 * Usage:
 * ```vue
 * <template>
 *   <Snow intensity="medium" :enabled="true" />
 * </template>
 *
 * <script setup>
 * import Snow from './SnowComponent.vue';
 * </script>
* ```
*/

import { onMounted, onUnmounted, watch } from 'vue';
import { SnowEffect } from 'festive-snow';

const props = defineProps({
intensity: {
type: String,
default: 'medium',
validator: (value) => ['light', 'medium', 'heavy'].includes(value)
},
enabled: {
type: Boolean,
default: true
},
seasonCheck: {
type: Function,
default: null
}
});

let snow = null;

// Create snow effect on mount if enabled
onMounted(() => {
if (props.enabled) {
snow = new SnowEffect({
intensity: props.intensity,
enabled: true,
seasonCheck: props.seasonCheck
});
snow.init();
snow.start();
}
});

// Clean up on unmount
onUnmounted(() => {
if (snow) {
snow.stop();
snow = null;
}
});

// Watch for intensity changes
watch(() => props.intensity, (newIntensity) => {
if (snow && props.enabled) {
snow.setIntensity(newIntensity);
}
});

// Watch for enabled changes
watch(() => props.enabled, (newEnabled) => {
if (newEnabled && !snow) {
// Create and start snow
snow = new SnowEffect({
intensity: props.intensity,
enabled: true,
seasonCheck: props.seasonCheck
});
snow.init();
snow.start();
} else if (!newEnabled && snow) {
// Stop and destroy snow
snow.stop();
snow = null;
}
});
</script>
