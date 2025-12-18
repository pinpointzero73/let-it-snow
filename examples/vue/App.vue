<template>
  <div :style="containerStyle">
    <div :style="cardStyle">
      <h1 style="font-size: 3rem; margin-bottom: 1rem; text-align: center;">
        🎄 Festive Snow Vue Demo 🎄
      </h1>

      <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: 2rem; opacity: 0.9;">
        Control the snow effect using Vue reactive state!
      </p>

      <!-- Controls -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        <!-- Toggle Snow -->
        <div>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input
                type="checkbox"
                v-model="showSnow"
                style="width: 20px; height: 20px; cursor: pointer;"
            />
            <span>Enable Snow Effect</span>
          </label>
        </div>

        <!-- Intensity -->
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">
            Intensity: <strong>{{ intensity }}</strong>
          </label>
          <div style="display: flex; gap: 0.5rem;">
            <button
                v-for="level in ['light', 'medium', 'heavy']"
                :key="level"
                @click="intensity = level"
                :style="getButtonStyle(level)"
            >
              {{ level.charAt(0).toUpperCase() + level.slice(1) }}
            </button>
          </div>
        </div>

        <!-- Season Check -->
        <div>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input
                type="checkbox"
                v-model="useSeasonCheck"
                style="width: 20px; height: 20px; cursor: pointer;"
            />
            <span>Only show during festive season (Dec 1 - Jan 3)</span>
          </label>
        </div>
      </div>

      <!-- Info -->
      <div style="padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 0.5rem; font-size: 0.875rem;">
        <p style="margin-bottom: 0.5rem;"><strong>Component Props:</strong></p>
        <pre :style="codeStyle">{{ componentPropsDisplay }}</pre>
      </div>
    </div>

    <!-- Render Snow component with current props -->
    <Snow
        :intensity="intensity"
        :enabled="showSnow"
        :season-check="seasonCheckFunction"
    />
  </div>
</template>

<script setup>
/**
 * Example Vue App using Festive Snow
 *
 * Install dependencies:
 * npm create vue@latest my-app
 * cd my-app
 * npm install
 * npm install festive-snow
 * # Copy these files to src/components/
 * npm run dev
 */

import {computed, ref} from 'vue';
import Snow from './SnowComponent.vue';
import 'festive-snow/dist/festive-snow.css';

const showSnow = ref(true);
const intensity = ref('medium');
const useSeasonCheck = ref(false);

const seasonCheckFunction = computed(() => {
  if (!useSeasonCheck.value) return null;

  return () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    return (month === 11) || (month === 0 && day <= 3);
  };
});

const componentPropsDisplay = computed(() => {
  return `<Snow
  intensity="${intensity.value}"
  :enabled="${showSnow.value}"
  :season-check="${useSeasonCheck.value ? 'callback' : 'null'}"
/>`;
});

const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const cardStyle = {
  maxWidth: '600px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '1rem',
  padding: '3rem',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
};

const codeStyle = {
  background: 'rgba(0, 0, 0, 0.2)',
  padding: '0.5rem',
  borderRadius: '0.25rem',
  overflow: 'auto',
  fontSize: '0.75rem',
  margin: 0
};

function getButtonStyle(level) {
  return {
    background: intensity.value === level ? '#667eea' : 'white',
    color: intensity.value === level ? 'white' : '#667eea',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s'
  };
}
</script>
