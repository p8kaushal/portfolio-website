import React from 'react';
import { useAnimus, type SectionType } from '../context/AnimusContext';

export const Navbar: React.FC = () => {
  const { currentSection, navigateTo, resetSync, isSynchronized } = useAnimus();

  // Show navbar only when synchronized or on sections
  if (!isSynchronized) return null;

  const navItems: { label: string; keyLabel: string; type: SectionType }[] = [
    { label: 'About me', keyLabel: 'H', type: 'character' },
    { label: 'Journey', keyLabel: 'M', type: 'timeline' },
    { label: 'Projects', keyLabel: 'I', type: 'projects' },
    { label: 'Skills', keyLabel: 'T', type: 'skills' },
    { label: 'Awards', keyLabel: 'A', type: 'artifacts' },
    { label: 'Contact', keyLabel: 'B', type: 'contact' },
  ];

  return (
    <nav className="hud-navbar interactive">
      <div 
        className="hud-font cyan-glow-text"
        style={{
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '0.22em',
          cursor: 'pointer',
        }}
        onClick={resetSync}
      >
        PARTH KAUSHAL
      </div>

      <div className="hud-nav-links">
        {navItems.map((item) => {
          const isActive = currentSection === item.type;
          return (
            <button
              key={item.type}
              className={`hud-nav-item hud-font ${isActive ? 'active' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => navigateTo(item.type)}
            >
              <span className="shortcut">[{item.keyLabel}]</span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div 
        className="hud-font"
        style={{
          fontSize: '0.8rem',
          color: 'rgba(226, 244, 247, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span 
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--animus-cyan)',
            borderRadius: '50%',
            boxShadow: '0 0 8px var(--animus-cyan)',
          }}
        />
        SYNC STATUS: 100%
      </div>
    </nav>
  );
};
