import React from 'react';
import { useAnimus } from '../context/AnimusContext';

export const LoadingScreen: React.FC = () => {
  const { synchronize, isSynchronized } = useAnimus();

  if (isSynchronized) return null;

  return (
    <div
      className="interactive"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        zIndex: 10,
        background: 'transparent',
      }}
      onClick={synchronize}
    >
      {/* Top Header/Telemetry metadata (LOC removed) */}
      <div 
        className="hud-font" 
        style={{ 
          position: 'absolute',
          top: '40px',
          left: '40px',
          textAlign: 'left',
          fontSize: '0.85rem', 
          color: 'rgba(61, 231, 255, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div>SYS_STATUS: SYNCHRONIZING...</div>
        <div style={{ color: 'rgba(255,255,255,0.2)' }}>GENETIC SEED_ID: 0x4E9A28B1</div>
      </div>

      {/* Tagline above Name */}
      <div 
        className="hud-font"
        style={{
          fontSize: '1rem',
          color: 'var(--animus-cyan)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
          textShadow: '0 0 8px var(--animus-cyan-glow)',
        }}
      >
        Merging the digital and physical worlds to solve real problems
      </div>

      {/* Main Name branding */}
      <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
        <h1 
          className="cyan-glow-text"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '4.5rem',
            fontWeight: 900,
            lineHeight: '1.1',
            letterSpacing: '0.12em',
            color: '#fff',
            marginBottom: '1rem',
          }}
        >
          PARTH KAUSHAL
        </h1>
        <div 
          className="hud-font" 
          style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(226, 244, 247, 0.7)',
            letterSpacing: '0.4em',
          }}
        >
          BUILDER // LEARNER
        </div>
      </div>

      {/* Synchronization pulsing prompt */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div 
          className="hud-font cyan-glow-text"
          style={{
            fontSize: '1.2rem',
            color: 'var(--animus-cyan)',
            letterSpacing: '0.2em',
            cursor: 'pointer',
            animation: 'pulse 2s infinite',
            border: '1px solid var(--animus-cyan)',
            padding: '12px 30px',
            background: 'rgba(7, 13, 20, 0.4)',
            boxShadow: '0 0 15px rgba(61,231,255,0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          [ENTER] SYNCHRONIZE ANIMUS
        </div>
        <div style={{ width: '220px', height: '1px', background: 'rgba(61, 231, 255, 0.2)' }} />
      </div>

      {/* Embedded CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; box-shadow: 0 0 10px rgba(61,231,255,0.1); }
          50% { opacity: 1; text-shadow: 0 0 15px var(--animus-cyan); box-shadow: 0 0 25px var(--animus-cyan-glow); }
          100% { opacity: 0.5; box-shadow: 0 0 10px rgba(61,231,255,0.1); }
        }
      `}</style>
    </div>
  );
};
