import React from 'react';
import { useAnimus } from '../context/AnimusContext';

export const BrotherhoodContact: React.FC = () => {
  const { currentSection } = useAnimus();

  if (currentSection !== 'contact') return null;

  const links = [
    {
      name: 'LINKEDIN GATEWAY',
      label: 'LinkedIn Uplink',
      url: 'https://www.linkedin.com/in/parth-kaushal-0b3518386/',
      description: 'Establish direct secure data link with Parth for professional queries, project collaboration, and networking.',
    },
    {
      name: 'GITHUB TERMINAL',
      label: 'GitHub Node',
      url: 'https://github.com/p8kaushal',
      description: 'Explore compiled codebase indexes, code repositories, full stack projects, and open source commits.',
    },
    {
      name: 'X NETWORK UPLINK',
      label: 'X (Twitter) Link',
      url: 'https://x.com/_ParthKaushal',
      description: 'Intercept feed messages and logs relating to technology prototyping, daily builds, and general development updates.',
    },
  ];

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
      <div className="transparent-text-block interactive" style={{ marginBottom: '3rem' }}>
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
          // CIPHER UPLINK
        </span>
        <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
          CONTACT ME
        </h2>
        <div style={{ color: 'rgba(226,244,247,0.5)', fontSize: '0.95rem', marginTop: '8px' }}>
          Secure routing protocols active. Select an interface gateway below to establish synchronization.
        </div>
      </div>

      {/* 2D Flat Full-Screen Grid Nodes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem',
          width: '100%',
        }}
      >
        {links.map((link) => (
          <div
            key={link.name}
            className="transparent-text-block interactive"
            style={{
              border: '1px solid rgba(61, 231, 255, 0.25)',
              borderBottom: '3px solid var(--animus-cyan)',
              padding: '24px',
              background: 'rgba(7, 13, 20, 0.7)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => window.open(link.url, '_blank')}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--animus-cyan)';
              e.currentTarget.style.boxShadow = '0 0 20px var(--animus-cyan-glow)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(61, 231, 255, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div>
              <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                {link.label.toUpperCase()}
              </span>
              <h3 className="serif-font" style={{ fontSize: '1.45rem', color: '#fff', marginTop: '6px' }}>
                {link.name}
              </h3>
            </div>
            
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#e2f4f7' }}>
              {link.description}
            </p>

            <div 
              className="hud-font"
              style={{
                fontSize: '0.85rem',
                color: 'var(--animus-cyan)',
                alignSelf: 'flex-start',
                marginTop: '10px'
              }}
            >
              [ CONNECT GATEWAY ]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
