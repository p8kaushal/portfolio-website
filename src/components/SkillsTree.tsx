import React, { useState, useEffect } from 'react';
import { useAnimus } from '../context/AnimusContext';
import { playClick, playHover, playSequenceSynth } from '../utils/audio';

interface SkillNode {
  id: string;
  name: string;
  x: number;
  y: number;
  category: 'web' | 'system' | 'game' | 'root' | 'hub';
  subtext?: string;
}

export const SkillsTree: React.FC = () => {
  const { currentSection } = useAnimus();
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  useEffect(() => {
    if (currentSection === 'skills') {
      playSequenceSynth(); // Play ascending beeps on section mount
    }
  }, [currentSection]);

  if (currentSection !== 'skills') return null;

  const nodes: SkillNode[] = [
    // Root Hub
    { id: 'root', name: 'DEV STACK', x: 400, y: 195, category: 'root' },

    // Hubs
    { id: 'web_hub', name: 'WEB DEVELOPMENT', x: 220, y: 195, category: 'hub' },
    { id: 'system_hub', name: 'SYSTEM CORE', x: 400, y: 105, category: 'hub' },
    { id: 'game_hub', name: 'GAME DEVELOPMENT', x: 580, y: 195, category: 'hub' },

    // Web Development Leaves
    { id: 'js', name: 'JavaScript', x: 75, y: 65, category: 'web' },
    { id: 'ts', name: 'TypeScript', x: 75, y: 130, category: 'web' },
    { id: 'node', name: 'Node.js', x: 75, y: 195, category: 'web' },
    { id: 'nuxt', name: 'Nuxt.js', x: 75, y: 260, category: 'web' },
    { id: 'prisma', name: 'Prisma ORM', x: 75, y: 325, category: 'web', subtext: 'Backend' },

    // System Core Leaves
    { id: 'c_lang', name: 'C Language', x: 300, y: 40, category: 'system' },
    { id: 'python', name: 'Python', x: 500, y: 40, category: 'system' },

    // Game Development Leaves
    { id: 'unity', name: 'Unity Engine', x: 715, y: 130, category: 'game' },
    { id: 'unreal', name: 'Unreal Engine', x: 715, y: 260, category: 'game' },
  ];

  const zoomIn = () => {
    playClick();
    setScaleFactor((prev) => Math.min(1.3, prev + 0.1));
  };
  
  const zoomOut = () => {
    playClick();
    setScaleFactor((prev) => Math.max(0.7, prev - 0.1));
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
      {/* Header */}
      <div className="transparent-text-block interactive" style={{ marginBottom: '1rem', zIndex: 10 }}>
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
          // COMPETENCIES INDEX
        </span>
        <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
          SKILLS TREE
        </h2>
      </div>

      {/* SVG Connected Tree container */}
      <div
        className="interactive"
        style={{
          position: 'relative',
          width: '800px',
          height: '380px',
          margin: '0 auto',
          transform: `scale(${scaleFactor})`,
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Connection Lines (SVG) with progressive drawing animation */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 380"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 5px var(--animus-cyan-glow))',
          }}
        >
          {/* Central Root connections to Category Hubs */}
          <line className="tree-line line-root" x1="400" y1="195" x2="220" y2="195" stroke="var(--animus-cyan)" strokeWidth="2.5" opacity="0.8" />
          <line className="tree-line line-root" x1="400" y1="195" x2="400" y2="105" stroke="var(--animus-cyan)" strokeWidth="2.5" opacity="0.8" />
          <line className="tree-line line-root" x1="400" y1="195" x2="580" y2="195" stroke="var(--animus-cyan)" strokeWidth="2.5" opacity="0.8" />

          {/* Web Hub Connections */}
          <path className="tree-line line-branch" d="M 220 195 H 150 V 65 H 75" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
          <path className="tree-line line-branch" d="M 220 195 H 150 V 130 H 75" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
          <path className="tree-line line-branch" d="M 220 195 H 75" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
          <path className="tree-line line-branch" d="M 220 195 H 150 V 260 H 75" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
          <path className="tree-line line-branch" d="M 220 195 H 150 V 325 H 75" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />

          {/* System Hub Connections */}
          <path className="tree-line line-branch" d="M 400 105 V 70 H 300 V 40" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
          <path className="tree-line line-branch" d="M 400 105 V 70 H 500 V 40" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />

          {/* Game Hub Connections */}
          <path className="tree-line line-branch" d="M 580 195 H 650 V 130 H 715" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
          <path className="tree-line line-branch" d="M 580 195 H 650 V 260 H 715" fill="none" stroke="rgba(61,231,255,0.4)" strokeWidth="1.5" />
        </svg>

        {/* Nodes mapping */}
        {nodes.map((node) => {
          const isSpecialNode = node.category === 'root' || node.category === 'hub';
          
          // Progressive animation delay mapping (slower reveal)
          let delay = 0;
          if (node.category === 'hub') delay = 0.45;
          if (node.category === 'web' || node.category === 'system' || node.category === 'game') delay = 0.9;

          return (
            <div
              key={node.id}
              className="hud-font"
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                background: isSpecialNode
                  ? (node.category === 'root' ? 'var(--animus-cyan)' : 'rgba(7, 13, 20, 0.95)')
                  : 'rgba(7, 13, 20, 0.85)',
                color: node.category === 'root' ? '#000' : 'var(--animus-cyan)',
                border: isSpecialNode
                  ? `2px solid ${node.category === 'root' ? 'var(--animus-cyan)' : 'var(--animus-gold)'}`
                  : '1px solid rgba(61, 231, 255, 0.5)',
                boxShadow: isSpecialNode
                  ? `0 0 10px ${node.category === 'root' ? 'var(--animus-cyan-glow)' : 'var(--animus-gold-glow)'}`
                  : 'none',
                padding: isSpecialNode ? '8px 16px' : '6px 12px',
                borderRadius: '4px',
                fontSize: isSpecialNode ? '0.85rem' : '0.8rem',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                opacity: 0,
                animation: 'skillsNodeFadeIn 0.75s ease forwards',
                animationDelay: `${delay}s`,
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={() => {
                if (!isSpecialNode) {
                  playHover();
                }
              }}
            >
              {node.name}
              {node.subtext && (
                <span style={{ color: 'var(--animus-gold)', marginLeft: '4px', fontSize: '0.65rem' }}>
                  ({node.subtext})
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Zoom Controls */}
      <div className="transparent-text-block interactive" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '1.5rem', pointerEvents: 'auto', position: 'relative', zIndex: 20 }}>
        <button
          className="hud-font"
          style={{
            background: 'none',
            border: '1px solid var(--animus-cyan)',
            color: 'var(--animus-cyan)',
            padding: '6px 14px',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
          onClick={zoomIn}
        >
          [+] ZOOM IN
        </button>
        <button
          className="hud-font"
          style={{
            background: 'none',
            border: '1px solid var(--animus-cyan)',
            color: 'var(--animus-cyan)',
            padding: '6px 14px',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
          onClick={zoomOut}
        >
          [-] ZOOM OUT
        </button>
        <span className="hud-font" style={{ fontSize: '0.75rem', color: 'rgba(226,244,247,0.4)', marginLeft: '10px' }}>
          SCALE: {(scaleFactor * 100).toFixed(0)}%
        </span>
      </div>
      <style>{`
        @keyframes skillsNodeFadeIn {
          to { opacity: 1; }
        }
        .tree-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawTreeLine 0.95s ease forwards;
        }
        .line-root {
          animation-delay: 0s;
        }
        .line-branch {
          animation-delay: 0.45s;
        }
        @keyframes drawTreeLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};
