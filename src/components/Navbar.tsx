import React from 'react';
import { useAnimus, type SectionType } from '../context/AnimusContext';
import { playClick } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { currentSection, navigateTo, resetSync, isSynchronized } = useAnimus();

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
        onClick={() => {
          playClick();
          resetSync();
        }}
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
              onClick={() => {
                playClick();
                navigateTo(item.type);
              }}
            >
              <span className="shortcut">[{item.keyLabel}]</span>
              {item.label}
            </button>
          );
        })}
      </div>


    </nav>
  );
};
