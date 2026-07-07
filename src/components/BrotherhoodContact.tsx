import React, { useState } from 'react';
import { useAnimus } from '../context/AnimusContext';
import { playClick, playHover } from '../utils/audio';

export const BrotherhoodContact: React.FC = () => {
  const { currentSection } = useAnimus();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  if (currentSection !== 'contact') return null;

  const links = [
    {
      id: 'github',
      name: 'GITHUB LINK',
      url: 'https://github.com/p8kaushal',
      label: 'Repository Uplink',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      description: 'Access version repositories and open source projects.',
      style: { left: '50%', top: '15%', transform: 'translate(-50%, -50%)' },
      dockLine: { x1: 250, y1: 150, x2: 250, y2: 50 },
    },
    {
      id: 'linkedin',
      name: 'LINKEDIN LINK',
      url: 'https://www.linkedin.com/in/parth-kaushal-0b3518386/',
      label: 'Professional Link',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      description: 'Connect with Parth for job postings, messages, and networks.',
      style: { left: '20%', top: '70%', transform: 'translate(-50%, -50%)' },
      dockLine: { x1: 250, y1: 150, x2: 100, y2: 210 },
    },
    {
      id: 'x',
      name: 'X LINK',
      url: 'https://x.com/_ParthKaushal',
      label: 'Developer Log',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
      description: 'Check active tech feeds, blogs, and dev tweets.',
      style: { left: '80%', top: '70%', transform: 'translate(-50%, -50%)' },
      dockLine: { x1: 250, y1: 150, x2: 400, y2: 210 },
    },
  ];

  const handleNodeClick = (url: string) => {
    playClick();
    window.open(url, '_blank');
  };

  const handleMouseEnter = (nodeId: string) => {
    playHover();
    setHoveredNode(nodeId);
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8%',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      {/* Header section */}
      <div className="transparent-text-block interactive" style={{ marginBottom: '1rem', zIndex: 10 }}>
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
          // CONNECT CHANNELS
        </span>
        <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
          CONTACT
        </h2>
      </div>

      {/* Orbital Spheres Layout */}
      <div
        className="interactive"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '550px',
          height: '380px',
          margin: '0 auto',
        }}
      >
        {/* SVG Orbital rings and ISS style docking vectors */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 300"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 10px var(--animus-cyan-glow))',
          }}
        >
          {/* Orbital path rings */}
          <circle cx="250" cy="150" r="100" fill="none" stroke="rgba(61, 231, 255, 0.12)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="250" cy="150" r="120" fill="none" stroke="rgba(61, 231, 255, 0.06)" strokeWidth="0.8" />

          {/* Converging coordinates target marker */}
          <circle cx="250" cy="150" r="4" fill="none" stroke="var(--animus-cyan)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="250" cy="150" r="1.5" fill="var(--animus-cyan)" opacity="0.8" />

          {/* Docking connection lines (ISS style with ticks) */}
          {links.map((link) => {
            const isHover = hoveredNode === link.id;
            return (
              <g key={`lines-${link.id}`}>
                <line
                  x1={link.dockLine.x1}
                  y1={link.dockLine.y1}
                  x2={link.dockLine.x2}
                  y2={link.dockLine.y2}
                  stroke={isHover ? 'var(--animus-gold)' : 'var(--animus-cyan)'}
                  strokeWidth={isHover ? '2' : '1'}
                  opacity={isHover ? '0.85' : '0.4'}
                  strokeDasharray="2 3"
                />
                {/* Connecting node points */}
                <circle cx={link.dockLine.x2} cy={link.dockLine.y2} r="3" fill={isHover ? 'var(--animus-gold)' : 'var(--animus-cyan)'} />
              </g>
            );
          })}
        </svg>

        {/* Clickable Satellite Node Spheres */}
        {links.map((link) => {
          const isCurrent = hoveredNode === link.id;
          return (
            <div
              key={link.id}
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                zIndex: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ...link.style,
              }}
              onClick={() => handleNodeClick(link.url)}
              onMouseEnter={() => handleMouseEnter(link.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Floating sphere core */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: isCurrent ? '2.5px solid var(--animus-gold)' : '2.5px solid var(--animus-cyan)',
                  background: isCurrent ? 'var(--animus-gold)' : 'rgba(7, 13, 20, 0.95)',
                  boxShadow: isCurrent ? '0 0 22px var(--animus-gold-glow)' : '0 0 12px var(--animus-cyan-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCurrent ? '#000' : 'var(--animus-cyan)',
                  transition: 'all 0.3s ease',
                }}
              >
                {link.icon}
              </div>

              {/* Title */}
              <div
                className="hud-font"
                style={{
                  fontSize: '0.9rem',
                  color: isCurrent ? 'var(--animus-gold)' : '#fff',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  textShadow: isCurrent ? '0 0 8px var(--animus-gold-glow)' : 'none',
                }}
              >
                {link.name}
              </div>

              {/* Enhanced Frosted Tooltip */}
              {isCurrent && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    background: 'rgba(7, 13, 20, 0.92)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--animus-cyan)',
                    borderBottom: '3px solid var(--animus-cyan)',
                    padding: '10px 14px',
                    borderRadius: '4px',
                    width: '210px',
                    fontSize: '0.85rem',
                    color: '#e2f4f7',
                    textAlign: 'center',
                    boxShadow: '0 5px 20px rgba(7,13,20,0.8), 0 0 15px rgba(61,231,255,0.2)',
                    animation: 'fadeInUp 0.3s ease',
                  }}
                >
                  <span className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>
                    {link.label.toUpperCase()}
                  </span>
                  {link.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
};
