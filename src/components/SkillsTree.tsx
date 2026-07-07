import React, { useState } from 'react';
import { useAnimus } from '../context/AnimusContext';

interface SkillNode {
  id: string;
  name: string;
  category: 'Web Development' | 'Core Systems' | 'Immersive & Storage';
  points: number; // Max 100
  lore: string;
  label: string;
}

export const SkillsTree: React.FC = () => {
  const { currentSection } = useAnimus();
  const [selectedSkillId, setSelectedSkillId] = useState<string>('ts');
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  if (currentSection !== 'skills') return null;

  const skills: SkillNode[] = [
    // Web Development Modifiers
    {
      id: 'js',
      name: 'JavaScript',
      category: 'Web Development',
      points: 92,
      label: 'Base Node Client',
      lore: 'The baseline scripting engine of standard browser sandboxes. Core node for web interactions, asynchronous logic, and DOM scripting.',
    },
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'Web Development',
      points: 88,
      label: 'Interface Evolution',
      lore: 'Evolved interface validation layer, adding static type-checking and robust OOP structures to the JavaScript profile.',
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'Web Development',
      points: 85,
      label: 'Server Core Runtime',
      lore: 'High-performance runtime executing JavaScript routines outside web clients. Coordinates backend data flow.',
    },
    {
      id: 'nuxt',
      name: 'Nuxt.js',
      category: 'Web Development',
      points: 78,
      label: 'Application Framework',
      lore: 'Vibrant framework providing directory routing, hybrid server-side rendering, and unified project layout structures.',
    },

    // Core System Development
    {
      id: 'c_lang',
      name: 'C Language',
      category: 'Core Systems',
      points: 82,
      label: 'Low-Level Architect',
      lore: 'Direct systems programming node. Provides deep access to machine memory registers, pointer manipulations, and compilers.',
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Core Systems',
      points: 90,
      label: 'Automation Matrix',
      lore: 'Highly versatile scripting syntax optimized for threat scanning, machine learning sequences, automated scripts, and mathematical analysis.',
    },

    // Immersive Engines & Storage
    {
      id: 'unity',
      name: 'Unity Engine',
      category: 'Immersive & Storage',
      points: 80,
      label: '3D Simulation Sandbox',
      lore: 'Extensive game design environment optimized for compiling C# scripts, managing spatial coordinates, and deploying virtual scenes.',
    },
    {
      id: 'unreal',
      name: 'Unreal Engine',
      category: 'Immersive & Storage',
      points: 76,
      label: 'High-Fidelity Renderer',
      lore: 'Advanced graphics engine utilized for creating photorealistic landscapes, blueprints systems, and real-time ray-traced rendering.',
    },
    {
      id: 'prisma',
      name: 'Prisma ORM',
      category: 'Immersive & Storage',
      points: 85,
      label: 'Relational Database Pipeline',
      lore: 'Structured database object-relational mapping translates entity models into clean query sequences.',
    },
  ];

  const activeSkill = skills.find((s) => s.id === selectedSkillId) || skills[1];

  const zoomIn = () => setScaleFactor((prev) => Math.min(1.4, prev + 0.1));
  const zoomOut = () => setScaleFactor((prev) => Math.max(0.7, prev - 0.1));

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
      {/* Left Column: Skill Tree Matrix (Alpha, Beta, Gamma Branches) */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '58%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <div>
          <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
            // TRAIT BRANCHES
          </span>
          <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
            SKILLS TREE
          </h2>
        </div>

        {/* 2D Skill Tree Layout Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1.5rem',
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'left center',
            transition: 'transform 0.3s ease',
            margin: '1.5rem 0',
          }}
        >
          {/* Branch Alpha: Web Development Modifiers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '0.8rem', borderBottom: '1px solid rgba(61,231,255,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>
              ALPHA: WEB MODIFIERS
            </div>
            {skills.filter(s => s.category === 'Web Development').map(s => (
              <button
                key={s.id}
                className="hud-font"
                style={{
                  background: selectedSkillId === s.id ? 'var(--animus-cyan)' : 'rgba(7,13,20,0.6)',
                  border: '1px solid var(--animus-cyan)',
                  color: selectedSkillId === s.id ? '#000' : 'var(--animus-cyan)',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  boxShadow: selectedSkillId === s.id ? '0 0 10px var(--animus-cyan-glow)' : 'none',
                }}
                onClick={() => setSelectedSkillId(s.id)}
              >
                &gt; {s.name}
              </button>
            ))}
          </div>

          {/* Branch Beta: Core System Development */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="hud-font" style={{ color: 'rgba(226,244,247,0.7)', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px', marginBottom: '8px' }}>
              BETA: SYSTEM CORE
            </div>
            {skills.filter(s => s.category === 'Core Systems').map(s => (
              <button
                key={s.id}
                className="hud-font"
                style={{
                  background: selectedSkillId === s.id ? 'var(--animus-cyan)' : 'rgba(7,13,20,0.6)',
                  border: '1px solid rgba(226,244,247,0.4)',
                  color: selectedSkillId === s.id ? '#000' : 'rgba(226,244,247,0.8)',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  boxShadow: selectedSkillId === s.id ? '0 0 10px var(--animus-cyan-glow)' : 'none',
                }}
                onClick={() => setSelectedSkillId(s.id)}
              >
                &gt; {s.name}
              </button>
            ))}
          </div>

          {/* Branch Gamma: Immersive Engines & Storage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,200,59,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>
              GAMMA: IMMERSIVE &amp; DB
            </div>
            {skills.filter(s => s.category === 'Immersive & Storage').map(s => (
              <button
                key={s.id}
                className="hud-font"
                style={{
                  background: selectedSkillId === s.id ? 'var(--animus-cyan)' : 'rgba(7,13,20,0.6)',
                  border: '1px solid var(--animus-gold)',
                  color: selectedSkillId === s.id ? '#000' : 'var(--animus-gold)',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  boxShadow: selectedSkillId === s.id ? '0 0 10px var(--animus-cyan-glow)' : 'none',
                }}
                onClick={() => setSelectedSkillId(s.id)}
              >
                &gt; {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
      </div>

      {/* Right Column: Unified Details Panel */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '38%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid var(--animus-cyan)',
            borderRight: '4px solid var(--animus-cyan)',
            padding: '28px',
            background: 'rgba(7, 13, 20, 0.95)',
            boxShadow: '0 0 30px rgba(61, 231, 255, 0.22)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
              // TELEMETRY DETECTED: {activeSkill.category.toUpperCase()}
            </span>
            <h3 className="serif-font" style={{ fontSize: '1.9rem', color: '#fff', marginTop: '6px' }}>
              {activeSkill.name}
            </h3>
          </div>

          <div className="hud-font" style={{ fontSize: '0.85rem', color: 'rgba(226,244,247,0.5)' }}>
            CLASSIFICATION: {activeSkill.label.toUpperCase()}
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2f4f7' }}>
            {activeSkill.lore}
          </p>

          <div
            style={{
              borderTop: '1px solid rgba(61,231,255,0.2)',
              paddingTop: '12px',
              marginTop: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }} className="hud-font">
              <span style={{ color: 'var(--animus-gold)' }}>PROFICIENCY VALUE:</span>
              <span style={{ color: 'var(--animus-cyan)', fontWeight: 'bold' }}>{activeSkill.points} / 100</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
              <div style={{ width: `${activeSkill.points}%`, height: '100%', background: 'var(--animus-cyan)', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
