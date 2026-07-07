import React, { useEffect, useState } from 'react';
import { useAnimus } from '../context/AnimusContext';

export const GlitchOverlay: React.FC = () => {
  const { glitchActive } = useAnimus();
  const [glitchPhase, setGlitchPhase] = useState(0);

  useEffect(() => {
    if (!glitchActive) return;

    const interval = setInterval(() => {
      setGlitchPhase((prev) => (prev + 1) % 4);
    }, 60);

    return () => clearInterval(interval);
  }, [glitchActive]);

  if (!glitchActive) return null;

  // Let's create some glitch slices using CSS clip-path or overlay divs
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
      {/* Glitch block 1: RGB Split offset */}
      <div
        className="glitch-active"
        style={{
          position: 'absolute',
          top: 0,
          left: glitchPhase === 1 ? '-10px' : '0px',
          width: '100%',
          height: '100%',
          background: 'rgba(61, 231, 255, 0.1)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Glitch block 2: Horizontal split */}
      <div
        style={{
          position: 'absolute',
          top: `${glitchPhase * 25}%`,
          left: 0,
          width: '100%',
          height: '10px',
          backgroundColor: 'var(--animus-cyan)',
          boxShadow: '0 0 20px var(--animus-cyan)',
          opacity: 0.8,
        }}
      />

      {/* Glitch block 3: Screen overlay with skew */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderLeft: glitchPhase === 2 ? '4px solid var(--animus-red)' : 'none',
          borderRight: glitchPhase === 3 ? '4px solid var(--animus-cyan)' : 'none',
          transform: glitchPhase === 2 ? 'scale(1.02) skew(1deg)' : 'none',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'brightness(1.5) contrast(1.2)',
        }}
      />

      {/* Digital HUD scan text flickers */}
      <div
        className="hud-font"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '30px',
          color: 'var(--animus-cyan)',
          fontSize: '0.8rem',
          opacity: 0.7,
        }}
      >
        [ANIMUS_SIMULATION_STABILITY_ERROR_0x{glitchPhase}F]
      </div>
    </div>
  );
};
