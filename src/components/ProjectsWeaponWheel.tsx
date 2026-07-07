import React, { useState, useRef } from 'react';
import { useAnimus } from '../context/AnimusContext';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Project {
  id: string;
  name: string;
  category: string;
  stack: string;
  desc: string;
  link: string;
  codeLink: string;
  isEmpty?: boolean;
}

// 3D mesh displaying inside the selector center
const Central3DIcon: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.position.y = Math.sin(time * 2.2) * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      {activeIndex === 0 && <torusGeometry args={[0.8, 0.26, 12, 32]} />}
      {activeIndex === 1 && <icosahedronGeometry args={[0.9, 0]} />}
      {activeIndex >= 2 && <octahedronGeometry args={[0.7, 0]} />}
      <meshBasicMaterial 
        color={activeIndex >= 2 ? 'rgba(61, 231, 255, 0.2)' : 'var(--animus-cyan)'} 
        wireframe 
        transparent 
        opacity={activeIndex >= 2 ? 0.3 : 0.85} 
      />
    </mesh>
  );
};

export const ProjectsWeaponWheel: React.FC = () => {
  const { currentSection } = useAnimus();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);

  if (currentSection !== 'projects') return null;

  const projects: Project[] = [
    {
      id: 'skillswap',
      name: 'SKILLSWAP',
      category: 'DYNAMIC EXCHANGE UTILITY',
      stack: 'React // TailwindCSS // Firebase Auth // Cloud Firestore',
      desc: 'Web App framework mapping user capability matrices. Enables users to trade professional competencies in real time, featuring interactive skills catalogs and secure direct routing communications.',
      link: 'https://github.com',
      codeLink: 'https://github.com',
    },
    {
      id: 'rentwheels',
      name: 'RENTWHEELS',
      category: 'LOGISTICS & TRANSPORT ASSET',
      stack: 'React // Node.js // Express // PostgreSQL // JWT',
      desc: 'Streamlined transactional vehicle platform facilitating modern peer-to-peer fleet leasing. Provides real-time rental availability matrices and clean, encrypted reservation logs.',
      link: 'https://github.com',
      codeLink: 'https://github.com',
    },
    {
      id: 'locked_1',
      name: '[LOCKED SLOT]',
      category: 'INDEXING MEMORY...',
      stack: 'SYSTEM DISK CORRIDOR // ERROR 404',
      desc: 'This project slot is currently unindexed in the Animus core archive. Synchronize additional memory nodes to reveal details.',
      link: '#',
      codeLink: '#',
      isEmpty: true,
    },
    {
      id: 'locked_2',
      name: '[LOCKED SLOT]',
      category: 'INDEXING MEMORY...',
      stack: 'SYSTEM DISK CORRIDOR // ERROR 404',
      desc: 'This project slot is currently unindexed in the Animus core archive. Synchronize additional memory nodes to reveal details.',
      link: '#',
      codeLink: '#',
      isEmpty: true,
    },
  ];

  const activeProject = projects[lockedIndex !== null ? lockedIndex : activeIndex];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Central Interactive Weapon Wheel */}
      <div
        className="interactive"
        style={{
          width: '380px',
          height: '380px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 3D Canvas in center */}
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 5,
          }}
        >
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <Central3DIcon activeIndex={lockedIndex !== null ? lockedIndex : activeIndex} />
          </Canvas>
        </div>

        {/* Radial Wheel Segments (SVG) */}
        <svg
          width="380"
          height="380"
          viewBox="0 0 100 100"
          style={{
            transform: 'rotate(-45deg)',
            filter: 'drop-shadow(0 0 12px var(--animus-cyan-glow))',
          }}
        >
          {projects.map((p, index) => {
            const startAngle = index * 90;
            const endAngle = (index + 1) * 90;
            const radStart = (startAngle * Math.PI) / 180;
            const radEnd = (endAngle * Math.PI) / 180;

            const x1 = 50 + 44 * Math.cos(radStart);
            const y1 = 50 + 44 * Math.sin(radStart);
            const x2 = 50 + 44 * Math.cos(radEnd);
            const y2 = 50 + 44 * Math.sin(radEnd);

            const ix1 = 50 + 28 * Math.cos(radStart);
            const iy1 = 50 + 28 * Math.sin(radStart);
            const ix2 = 50 + 28 * Math.cos(radEnd);
            const iy2 = 50 + 28 * Math.sin(radEnd);

            const isHovered = activeIndex === index && lockedIndex === null;
            const isLocked = lockedIndex === index;
            const isCurrent = isHovered || isLocked;

            return (
              <path
                key={p.id}
                d={`M ${ix1} ${iy1} L ${x1} ${y1} A 44 44 0 0 1 ${x2} ${y2} L ${ix2} ${iy2} A 28 28 0 0 0 ${ix1} ${iy1} Z`}
                fill={p.isEmpty ? 'rgba(7, 13, 20, 0.3)' : isCurrent ? 'rgba(61, 231, 255, 0.28)' : 'rgba(7, 13, 20, 0.7)'}
                stroke={p.isEmpty ? 'rgba(61, 231, 255, 0.08)' : isCurrent ? 'var(--animus-cyan)' : 'rgba(61, 231, 255, 0.22)'}
                strokeWidth="0.8"
                style={{ cursor: p.isEmpty ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={() => {
                  if (lockedIndex === null) {
                    setActiveIndex(index);
                  }
                }}
                onClick={() => {
                  if (!p.isEmpty) {
                    setLockedIndex(lockedIndex === index ? null : index);
                  }
                }}
              />
            );
          })}
          <circle cx="50" cy="50" r="27.5" fill="none" stroke="var(--animus-cyan)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="50" cy="50" r="44.5" fill="none" stroke="var(--animus-cyan)" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Screen Corners: Project Stats (Top-Left and Bottom-Right HUD displays) */}
      <div
        className="transparent-text-block interactive"
        style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          width: '360px',
        }}
      >
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
          // ARSENAL ARCHIVE
        </span>
        <h2 className="serif-font" style={{ fontSize: '2.4rem', color: '#fff', marginTop: '6px', letterSpacing: '0.05rem', lineHeight: '1.2' }}>
          {activeProject.name}
        </h2>
        <div className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.9rem', marginTop: '6px', letterSpacing: '0.1em' }}>
          CLASSIFICATION: {activeProject.category}
        </div>
        <div style={{ marginTop: '1.5rem', fontSize: '1.05rem', lineHeight: '1.5', color: '#e2f4f7' }}>
          {activeProject.desc}
        </div>
      </div>

      <div
        className="transparent-text-block interactive"
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '8%',
          width: '380px',
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.2em' }}>
          // INTEGRATION BLUEPRINT
        </span>
        <div 
          className="hud-font"
          style={{ 
            fontSize: '1.1rem', 
            color: '#fff', 
            marginTop: '8px',
            letterSpacing: '0.08em',
          }}
        >
          {activeProject.stack}
        </div>
        
        {/* Action prompts layout */}
        {!activeProject.isEmpty && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '1.8rem' }}>
            <button
              className="hud-font"
              style={{
                background: 'none',
                border: '1px solid var(--animus-white)',
                color: '#fff',
                padding: '10px 24px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => window.open(activeProject.codeLink, '_blank')}
            >
              [E] INSPECT BLUEPRINT
            </button>
            <button
              className="hud-font"
              style={{
                background: 'none',
                border: '1px solid var(--animus-cyan)',
                color: 'var(--animus-cyan)',
                padding: '10px 24px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(61,231,255,0.1)',
                transition: 'all 0.3s ease',
              }}
              onClick={() => window.open(activeProject.link, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(61, 231, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--animus-cyan-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(61,231,255,0.1)';
              }}
            >
              [LEFT CLICK] DEPLOY LIVE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
