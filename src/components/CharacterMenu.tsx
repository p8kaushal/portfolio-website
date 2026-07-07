import React from 'react';
import { useAnimus } from '../context/AnimusContext';

export const CharacterMenu: React.FC = () => {
  const { currentSection, selectedProfilePart, setSelectedProfilePart } = useAnimus();

  if (currentSection !== 'character') return null;

  // Render details based on active clicked model part
  const partDetails = {
    head: {
      title: 'COGNITIVE CORE',
      label: 'Intellect & Focus',
      description: 'Constantly absorbing system architecture, blockchain frameworks, and cryptographic logic. Passionate about threat mapping and zero-knowledge paradigms.',
      stats: 'IoT Networks // Security Architectures // Cryptography',
    },
    heart: {
      title: 'CORE DRIVE',
      label: 'Passion & Academics',
      description: 'Pursuing a B.Tech in Computer Science Engineering at VIT Pune. Driven by a desire to explore complex digital landscapes, architectural security, and immersive 3D/VR realities.',
      stats: 'Current Academic Sync: 9.07 SGPA (First Year Matrix)',
    },
    hands: {
      title: 'CREATIVE ARSENAL',
      label: 'Functional Builds',
      description: 'Translates high-level specifications into secure codebases. Proficient in low-level systems (C), automation scripts (Python), modern web stacks, and 3D simulation matrices (Unity/Unreal).',
      stats: 'Skills Index: JavaScript / TS // Python // C // Game Engines',
    },
  };

  const activePart = selectedProfilePart || 'heart';
  const data = partDetails[activePart];

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
      {/* Left Column: Biography Dossier */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.8rem',
        }}
      >
        <div>
          <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
            // CHARACTER DOSSIER
          </span>
          <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px', lineHeight: '1.2' }}>
            PARTH KAUSHAL
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
          <div>
            <span className="hud-font" style={{ color: 'rgba(226,244,247,0.5)' }}>ORGANIZATION:</span>
            <span style={{ marginLeft: '12px', color: '#fff' }}>VIT Pune (APAC Sector)</span>
          </div>
          <div>
            <span className="hud-font" style={{ color: 'rgba(226,244,247,0.5)' }}>LOCATION:</span>
            <span style={{ marginLeft: '12px', color: '#fff' }}>Pune</span>
          </div>
          <div>
            <span className="hud-font" style={{ color: 'rgba(226,244,247,0.5)' }}>SYNC INDEX:</span>
            <span style={{ marginLeft: '12px', color: 'var(--animus-gold)' }} className="gold-glow-text">
              9.07 SGPA [FIRST YEAR]
            </span>
          </div>
        </div>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(226,244,247,0.85)' }}>
          A relentless builder and learner currently pursuing a B.Tech in Computer Science Engineering, specializing in Cyber Security, IoT, and Blockchain.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }} className="hud-font">
          <button 
            style={{
              background: activePart === 'head' ? 'rgba(61,231,255,0.15)' : 'none',
              border: '1px solid var(--animus-cyan)',
              color: 'var(--animus-cyan)',
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
            onClick={() => setSelectedProfilePart('head')}
          >
            [ HEAD ]
          </button>
          <button 
            style={{
              background: activePart === 'heart' ? 'rgba(61,231,255,0.15)' : 'none',
              border: '1px solid var(--animus-cyan)',
              color: 'var(--animus-cyan)',
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
            onClick={() => setSelectedProfilePart('heart')}
          >
            [ HEART ]
          </button>
          <button 
            style={{
              background: activePart === 'hands' ? 'rgba(61,231,255,0.15)' : 'none',
              border: '1px solid var(--animus-cyan)',
              color: 'var(--animus-cyan)',
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
            onClick={() => setSelectedProfilePart('hands')}
          >
            [ HANDS ]
          </button>
        </div>
      </div>

      {/* Right Column: Dynamic details panel matching active clicked part */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <div
          style={{
            border: '1px solid var(--animus-cyan)',
            borderRight: '4px solid var(--animus-cyan)',
            padding: '24px',
            background: 'rgba(7, 13, 20, 0.95)',
            boxShadow: '0 0 25px rgba(61, 231, 255, 0.25)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div>
            <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
              // TELEMETRY UPLINK: {data.label.toUpperCase()}
            </span>
            <h3 className="serif-font" style={{ fontSize: '1.8rem', color: '#fff', marginTop: '6px' }}>
              {data.title}
            </h3>
          </div>

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
              RELEVANT TELEMETRY:
            </span>
            <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
              {data.stats}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
