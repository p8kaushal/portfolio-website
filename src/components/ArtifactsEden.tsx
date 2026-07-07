import React from 'react';
import { useAnimus } from '../context/AnimusContext';

export const ArtifactsEden: React.FC = () => {
  const { currentSection, relicShattered, setRelicShattered } = useAnimus();

  if (currentSection !== 'artifacts') return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '12%',
        left: 0,
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 8%',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      {/* Left Column: Relic Instructions */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <div>
          <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
            // ANOMALOUS RELICS
          </span>
          <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
            AWARDS &amp; ACHIEVEMENTS
          </h2>
        </div>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(226,244,247,0.85)' }}>
          Floating Isu data spheres contain encrypted operational records mapping system performance achievements. Click to activate the pulse array and synchronize data.
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="hud-font"
            style={{
              background: relicShattered ? 'rgba(255, 200, 59, 0.15)' : 'none',
              border: '1px solid var(--animus-gold)',
              color: 'var(--animus-gold)',
              padding: '8px 18px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              boxShadow: relicShattered ? '0 0 10px var(--animus-gold-glow)' : 'none',
            }}
            onClick={() => setRelicShattered(!relicShattered)}
          >
            {relicShattered ? '[ RE-ENCRYPT RELIC ]' : '[ MANUAL DECRYPT ]'}
          </button>
        </div>

        <div 
          className="hud-font" 
          style={{ 
            fontSize: '0.85rem', 
            color: 'rgba(226,244,247,0.4)',
            marginTop: '1.5rem',
          }}
        >
          [CONTROL: CLICK THE FLOATING RELIC IN CENTER TO EXTRACT RECORD DATA]
        </div>
      </div>

      {/* Right Column: Dynamic Relic Details Panel (matches layout of timeline/skills) */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '38%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: relicShattered ? 1 : 0.4,
          transition: 'all 0.5s ease',
        }}
      >
        <div
          style={{
            border: '1px solid var(--animus-gold)',
            borderRight: '4px solid var(--animus-gold)',
            padding: '28px',
            background: 'rgba(7, 13, 20, 0.95)',
            boxShadow: '0 0 30px rgba(255, 200, 59, 0.25)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <span className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
              // ARCHIVE DECRYPTED
            </span>
            <h3 className="serif-font" style={{ fontSize: '1.9rem', color: '#fff', marginTop: '6px' }}>
              RELIC DATA FRAGMENT
            </h3>
          </div>

          <div className="hud-font" style={{ fontSize: '0.85rem', color: 'rgba(226,244,247,0.5)' }}>
            SOURCE ID: ISU_FRAGMENT_001
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2f4f7' }}>
            {relicShattered ? (
              'System Record: Hackathon Operational File (Placeholder text simulating an encrypted achievement unlock to be updated upon further validation).'
            ) : (
              'RELIC FILE CORRUPTED OR ACCESS PRIVILEGE NOT ESTABLISHED. Synchronize the central core to bypass simulation ciphers.'
            )}
          </p>

          <div
            style={{
              borderTop: '1px solid rgba(255,200,59,0.2)',
              paddingTop: '12px',
              marginTop: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }} className="hud-font">
              <span>DECRYPTION PROGRESS:</span>
              <span style={{ color: 'var(--animus-gold)', fontWeight: 'bold' }}>
                {relicShattered ? '100% SUCCESS' : '0% STANDBY'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
