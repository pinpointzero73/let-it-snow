/**
 * React component for Festive Snow
 *
 * Usage:
 * ```jsx
 * import Snow from './SnowComponent';
 *
 * function App() {
 *   return <Snow intensity="medium" enabled={true} />;
 * }
 * ```
 */

import {useEffect, useRef} from 'react';
import {SnowEffect} from 'festive-snow';

export default function Snow({intensity = 'medium', enabled = true, seasonCheck = null}) {
  const snowRef = useRef(null);

  useEffect(() => {
    // Only create effect if enabled
    if (enabled) {
      const snow = new SnowEffect({
        intensity,
        enabled: true,
        seasonCheck
      });
      snow.init();
      snow.start();
      snowRef.current = snow;

      // Cleanup on unmount
      return () => {
        if (snowRef.current) {
          snowRef.current.stop();
          snowRef.current = null;
        }
      };
    } else {
      // If disabled and snow exists, stop it
      if (snowRef.current) {
        snowRef.current.stop();
        snowRef.current = null;
      }
    }
  }, [enabled, seasonCheck]);

  // Update intensity when it changes
  useEffect(() => {
    if (snowRef.current && enabled) {
      snowRef.current.setIntensity(intensity);
    }
  }, [intensity, enabled]);

  // This component renders nothing
  return null;
}
