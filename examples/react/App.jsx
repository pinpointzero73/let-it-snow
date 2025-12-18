/**
 * Example React App using Festive Snow
 *
 * Install dependencies:
 * npm install react react-dom festive-snow
 *
 * Run with Vite:
 * npm create vite@latest my-app -- --template react
 * cd my-app
 * npm install festive-snow
 * # Copy this file to src/App.jsx and SnowComponent.jsx to src/
 * npm run dev
 */

import {useState} from 'react';
import Snow from './SnowComponent';
import 'festive-snow/dist/festive-snow.css';

function App() {
  const [showSnow, setShowSnow] = useState(true);
  const [intensity, setIntensity] = useState('medium');
  const [useSeasonCheck, setUseSeasonCheck] = useState(false);

  const seasonCheck = useSeasonCheck
    ? () => {
      const now = new Date();
      const month = now.getMonth();
      const day = now.getDate();
      return (month === 11) || (month === 0 && day <= 3);
    }
    : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          🎄 Festive Snow React Demo 🎄
        </h1>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          Control the snow effect using React state and props!
        </p>

        {/* Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Toggle Snow */}
          <div>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={showSnow}
                onChange={(e) => setShowSnow(e.target.checked)}
                style={{width: '20px', height: '20px', cursor: 'pointer'}}
              />
              <span>Enable Snow Effect</span>
            </label>
          </div>

          {/* Intensity */}
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>
              Intensity: <strong>{intensity}</strong>
            </label>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              {['light', 'medium', 'heavy'].map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  style={{
                    background: intensity === level ? '#667eea' : 'white',
                    color: intensity === level ? 'white' : '#667eea',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Season Check */}
          <div>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={useSeasonCheck}
                onChange={(e) => setUseSeasonCheck(e.target.checked)}
                style={{width: '20px', height: '20px', cursor: 'pointer'}}
              />
              <span>Only show during festive season (Dec 1 - Jan 3)</span>
            </label>
          </div>
        </div>

        {/* Info */}
        <div style={{
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <p style={{marginBottom: '0.5rem'}}><strong>Component Props:</strong></p>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            overflow: 'auto',
            fontSize: '0.75rem'
          }}>
                        {`<Snow
  intensity="${intensity}"
  enabled={${showSnow}}
  seasonCheck={${useSeasonCheck ? 'callback' : 'null'}}
/>`}
                    </pre>
        </div>
      </div>

      {/* Render Snow component with current props */}
      <Snow
        intensity={intensity}
        enabled={showSnow}
        seasonCheck={seasonCheck}
      />
    </div>
  );
}

export default App;
