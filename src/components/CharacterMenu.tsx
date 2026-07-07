import React from 'react';
import { useAnimus } from '../context/AnimusContext';
import { playClick } from '../utils/audio';

export const CharacterMenu: React.FC = () => {
  const { currentSection, selectedProfilePart, setSelectedProfilePart } = useAnimus();

  if (currentSection !== 'character') return null;

  const partDetails = {
    head: {
      title: 'COGNITIVE CORE',
      label: 'Intellect & Focus',
      description: 'Constantly absorbing system architecture, blockchain frameworks, and cryptographic logic. Passionate about security audits and distributed ledger technologies.',
      stats: 'Systems & IoT // Cryptographic Auditing // Software Security',
    },
    heart: {
      title: 'CORE DRIVE',
      label: 'Passion & Academics',
      description: 'Pursuing a B.Tech in Computer Science Engineering at VIT Pune. Driven by a desire to explore complex programming domains, blockchain architectures, and immersive physical-digital structures.',
      stats: 'Academic Sync: 9.07 SGPA (First Year Matrix)',
    },
    hands: {
      title: 'CREATIVE BUILD LAB',
      label: 'Functional Engineering',
      description: 'Translates functional specifications into secure and modular codebases. Proficient in low-level compilation (C), automation scripts (Python), web platforms, and engine simulations (Unity/Unreal).',
      stats: 'Developer Index: Javascript/TS // Python // C // Game Engines',
    },
  };

  const activePart = selectedProfilePart;
  const data = activePart ? partDetails[activePart] : null;

  const handlePartSelect = (part: 'head' | 'heart' | 'hands') => {
    playClick();
    setSelectedProfilePart(selectedProfilePart === part ? null : part);
  };

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
      {/* Left Column: Biography (Hidden when details show up) */}
      {!activePart && (
        <div 
          className="transparent-text-block interactive"
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.8rem',
            animation: 'bioFadeIn 0.3s ease',
          }}
        >
          <div>
            <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
              // PROFILE INDEX
            </span>
            <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px', lineHeight: '1.2' }}>
              ABOUT ME
            </h2>
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(226,244,247,0.85)' }}>
            A relentless builder and learner currently pursuing a B.Tech in Computer Science Engineering, specializing in Cyber Security, IoT, and Blockchain at VIT Pune.
          </p>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(61,231,255,0.9)' }}>
            Driven by a passion for exploring complex digital landscapes, architectural security, and immersive realities.
          </p>
        </div>
      )}

      {/* Spacer to align right column when bio is hidden */}
      {activePart && <div style={{ width: '400px' }} />}

      {/* Right Column: Details Panel (Only shown when activePart is selected) */}
      {activePart && data && (
        <div 
          className="transparent-text-block interactive"
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2rem',
            animation: 'detailsFadeInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
                // VERIFIED LOGS: {data.label.toUpperCase()}
              </span>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                }}
                onClick={() => setSelectedProfilePart(null)}
              >
                ×
              </button>
            </div>
            
            <h3 className="serif-font" style={{ fontSize: '1.8rem', color: '#fff', marginTop: '6px' }}>
              {data.title}
            </h3>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2f4f7' }}>
              {data.description}
            </p>

            <div
              style={{
                borderTop: '1px solid rgba(61,231,255,0.2)',
                paddingTop: '12px',
                marginTop: '6px',
              }}
            >
              <span className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                RELEVANT MATRIX:
              </span>
              <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
                {data.stats}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* HUD Selector Tray (Fixed Bottom Center for permanent navigation) */}
      <div
        className="hud-font interactive"
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        <button 
          style={{
            background: activePart === 'head' ? 'rgba(61,231,255,0.15)' : 'rgba(7,13,20,0.6)',
            border: `1px solid ${activePart === 'head' ? 'var(--animus-gold)' : 'var(--animus-cyan)'}`,
            color: activePart === 'head' ? 'var(--animus-gold)' : 'var(--animus-cyan)',
            padding: '8px 18px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            boxShadow: activePart === 'head' ? '0 0 10px var(--animus-gold-glow)' : 'none',
            borderRadius: '2px',
            transition: 'all 0.25s ease',
          }}
          onClick={() => handlePartSelect('head')}
        >
          [ HEAD ]
        </button>
        <button 
          style={{
            background: activePart === 'heart' ? 'rgba(61,231,255,0.15)' : 'rgba(7,13,20,0.6)',
            border: `1px solid ${activePart === 'heart' ? 'var(--animus-gold)' : 'var(--animus-cyan)'}`,
            color: activePart === 'heart' ? 'var(--animus-gold)' : 'var(--animus-cyan)',
            padding: '8px 18px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            boxShadow: activePart === 'heart' ? '0 0 10px var(--animus-gold-glow)' : 'none',
            borderRadius: '2px',
            transition: 'all 0.25s ease',
          }}
          onClick={() => handlePartSelect('heart')}
        >
          [ HEART ]
        </button>
        <button 
          style={{
            background: activePart === 'hands' ? 'rgba(61,231,255,0.15)' : 'rgba(7,13,20,0.6)',
            border: `1px solid ${activePart === 'hands' ? 'var(--animus-gold)' : 'var(--animus-cyan)'}`,
            color: activePart === 'hands' ? 'var(--animus-gold)' : 'var(--animus-cyan)',
            padding: '8px 18px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            boxShadow: activePart === 'hands' ? '0 0 10px var(--animus-gold-glow)' : 'none',
            borderRadius: '2px',
            transition: 'all 0.25s ease',
          }}
          onClick={() => handlePartSelect('hands')}
        >
          [ HANDS ]
        </button>
      </div>

      <style>{`
        @keyframes bioFadeIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes detailsFadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
