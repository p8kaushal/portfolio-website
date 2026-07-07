import React, { useEffect, useState } from 'react';
import { useAnimus } from '../context/AnimusContext';

export const GlitchOverlay: React.FC = () => {
  const { glitchActive } = useAnimus();
  const [glitchPhase, setGlitchPhase] = useState(0);

  useEffect(() => {
    if (!glitchActive) return;

    const interval = setInterval(() => {
      setGlitchPhase((prev) => (prev + 1) % 4);
    }, 40);

    return () => clearInterval(interval);
  }, [glitchActive]);

  if (!glitchActive) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Toned down RGB Split overlay */}
      <div
        className="glitch-active"
        style={{
          position: 'absolute',
          top: 0,
          left: glitchPhase === 1 ? '-4px' : '0px',
          width: '100%',
          height: '100%',
          background: 'rgba(61, 231, 255, 0.05)',
          mixBlendMode: 'screen',
          opacity: 0.4,
        }}
      />
      
      {/* Subtle single horizontal sweep line */}
      <div
        style={{
          position: 'absolute',
          top: `${glitchPhase * 25}%`,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: 'var(--animus-cyan)',
          boxShadow: '0 0 8px var(--animus-cyan)',
          opacity: 0.35,
        }}
      />

      {/* Toned down scan filters */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(7, 13, 20, 0.08)',
          backdropFilter: 'brightness(1.15) contrast(1.05)',
        }}
      />
    </div>
  );
};
