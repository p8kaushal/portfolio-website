import React, { useState, useRef } from 'react';
import { useAnimus } from '../context/AnimusContext';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { playClick, playHover } from '../utils/audio';

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
      category: 'DYNAMIC SKILLS EXCHANGE PLATFORM',
      stack: 'React // Tailwind // Firebase Auth // Cloud Firestore',
      desc: 'An interactive web platform enabling peers to trade professional developer skills in real time. Features live skills directories, user matrices, and instant messaging.',
      link: 'https://github.com',
      codeLink: 'https://github.com',
    },
    {
      id: 'rentwheels',
      name: 'RENTWHEELS',
      category: 'P2P TRANSPORT LOGISTICS HUB',
      stack: 'React // Node.js // Express // PostgreSQL // JWT',
      desc: 'A full-stack peer-to-peer vehicle sharing portal. Features real-time rental booking calendars, secure reservation histories, and automated payment receipts.',
      link: 'https://github.com',
      codeLink: 'https://github.com',
    },
    {
      id: 'locked_1',
      name: 'STANDBY',
      category: 'COMMISSION INDEX...',
      stack: 'SYSTEM CORE // UNALLOCATED',
      desc: 'Additional development archives will be indexed in future sequences.',
      link: '#',
      codeLink: '#',
      isEmpty: true,
    },
    {
      id: 'locked_2',
      name: 'STANDBY',
      category: 'COMMISSION INDEX...',
      stack: 'SYSTEM CORE // UNALLOCATED',
      desc: 'Additional development archives will be indexed in future sequences.',
      link: '#',
      codeLink: '#',
      isEmpty: true,
    },
  ];

  const activeProject = projects[lockedIndex !== null ? lockedIndex : activeIndex];
  const isLocked = lockedIndex !== null;

  const handleSegmentClick = (index: number, p: Project) => {
    if (p.isEmpty) return;
    playClick();
    setLockedIndex(lockedIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    playHover();
    if (lockedIndex === null) {
      setActiveIndex(index);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '12%',
        left: 0,
        width: '100%',
        height: '80%',
        zIndex: 4,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8%',
        transition: 'all 0.5s ease',
      }}
    >
      {/* Top Left Header */}
      <div 
        className="transparent-text-block interactive" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: '8%',
          zIndex: 10
        }}
      >
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
          // INDEXED BUILDS
        </span>
        <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
          PROJECTS
        </h2>
      </div>

      {/* LEFT COLUMN: Project Details */}
      <div
        className="transparent-text-block interactive"
        style={{
          width: isLocked ? '45%' : '0px',
          opacity: isLocked ? 1 : 0,
          transform: isLocked ? 'translateY(0px)' : 'translateY(25px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.2rem',
          transition: 'all 0.5s ease',
          pointerEvents: isLocked ? 'auto' : 'none',
          height: '100%',
        }}
      >
        {isLocked && (
          <>
            <div>
              <h3 className="serif-font" style={{ fontSize: '2.2rem', color: '#fff', lineHeight: '1.2' }}>
                {activeProject.name}
              </h3>
              <div className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.85rem', marginTop: '6px', letterSpacing: '0.1em' }}>
                CATEGORY: {activeProject.category}
              </div>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2f4f7' }}>
              {activeProject.desc}
            </p>

            <div style={{ borderTop: '1px solid rgba(61,231,255,0.2)', paddingTop: '12px', marginTop: '8px' }}>
              <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                DEVELOPMENT STACK:
              </span>
              <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
                {activeProject.stack}
              </span>
            </div>
          </>
        )}
      </div>

      {/* RIGHT COLUMN: Interactive Selector */}
      <div
        className="interactive"
        style={{
          width: isLocked ? '45%' : '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.5s ease',
          pointerEvents: 'auto',
          marginTop: '40px',
        }}
      >
        {/* Selector Wheel Container */}
        <div
          style={{
            width: '380px',
            height: '380px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Absolute Center Locked 3D Canvas (Remains unscaled to prevent aspect ratio WebGL center distortion) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 5,
            }}
          >
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.5} />
              <Central3DIcon activeIndex={isLocked ? lockedIndex! : activeIndex} />
            </Canvas>
          </div>

          {/* Absolute Center Locked Radial Wheel Segments (Scales natively via CSS scale transform) */}
          <svg
            width="380"
            height="380"
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: isLocked
                ? 'translate(-50%, -50%) rotate(-45deg) scale(1.0)'
                : 'translate(-50%, -50%) rotate(-45deg) scale(1.22)',
              filter: 'drop-shadow(0 0 12px var(--animus-cyan-glow))',
              pointerEvents: 'auto',
              transition: 'transform 0.4s ease',
            }}
          >
            <defs>
              {projects.map((_, index) => {
                const startAngle = index * 90 + 18;
                const endAngle = (index + 1) * 90 - 18;
                const radStart = (startAngle * Math.PI) / 180;
                const radEnd = (endAngle * Math.PI) / 180;
                
                const ax1 = 50 + 34 * Math.cos(radStart);
                const ay1 = 50 + 34 * Math.sin(radStart);
                const ax2 = 50 + 34 * Math.cos(radEnd);
                const ay2 = 50 + 34 * Math.sin(radEnd);

                return (
                  <path
                    key={`text-path-${index}`}
                    id={`arc-text-${index}`}
                    d={`M ${ax1} ${ay1} A 34 34 0 0 1 ${ax2} ${ay2}`}
                  />
                );
              })}
            </defs>

            {projects.map((p, index) => {
              const startAngle = index * 90;
              const endAngle = (index + 1) * 90;

              const radStart = (startAngle * Math.PI) / 180;
              const radEnd = (endAngle * Math.PI) / 180;

              const x1 = 50 + 44 * Math.cos(radStart);
              const y1 = 50 + 44 * Math.sin(radStart);
              const x2 = 50 + 44 * Math.cos(radEnd);
              const y2 = 50 + 44 * Math.sin(radEnd);

              const ix1 = 50 + 26 * Math.cos(radStart);
              const iy1 = 50 + 26 * Math.sin(radStart);
              const ix2 = 50 + 26 * Math.cos(radEnd);
              const iy2 = 50 + 26 * Math.sin(radEnd);

              const isHovered = activeIndex === index && lockedIndex === null;
              const isSegmentLocked = lockedIndex === index;
              const isCurrent = isHovered || isSegmentLocked;

              return (
                <g key={p.id}>
                  {/* Quadrant Slice */}
                  <path
                    d={`M ${ix1} ${iy1} L ${x1} ${y1} A 44 44 0 0 1 ${x2} ${y2} L ${ix2} ${iy2} A 26 26 0 0 0 ${ix1} ${iy1} Z`}
                    fill={p.isEmpty ? 'rgba(7, 13, 20, 0.3)' : isCurrent ? 'rgba(61, 231, 255, 0.28)' : 'rgba(7, 13, 20, 0.75)'}
                    stroke={p.isEmpty ? 'rgba(61, 231, 255, 0.08)' : isCurrent ? 'var(--animus-cyan)' : 'rgba(61, 231, 255, 0.22)'}
                    strokeWidth="0.8"
                    style={{ cursor: p.isEmpty ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease' }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleSegmentClick(index, p)}
                  />
                  {/* Curved Text aligned inside sector */}
                  <text
                    fontSize="3.8"
                    fontFamily="var(--font-hud)"
                    fill={isCurrent ? 'var(--animus-gold)' : 'rgba(255,255,255,0.7)'}
                    style={{ pointerEvents: 'none' }}
                  >
                    <textPath href={`#arc-text-${index}`} startOffset="50%" textAnchor="middle">
                      {p.name}
                    </textPath>
                  </text>
                </g>
              );
            })}
            <circle cx="50" cy="50" r="25.5" fill="none" stroke="var(--animus-cyan)" strokeWidth="0.5" opacity="0.3" />
            <circle cx="50" cy="50" r="44.5" fill="none" stroke="var(--animus-cyan)" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        {/* GitHub & Live Links directly below the wheel */}
        {isLocked && !activeProject.isEmpty && (
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '1.5rem',
              animation: 'fadeInUp 0.4s ease'
            }}
          >
            <button
              className="hud-font"
              style={{
                background: 'none',
                border: '1px solid var(--animus-white)',
                color: '#fff',
                padding: '8px 20px',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                playClick();
                window.open(activeProject.codeLink, '_blank');
              }}
            >
              [ GITHUB REPO ]
            </button>
            <button
              className="hud-font"
              style={{
                background: 'none',
                border: '1px solid var(--animus-cyan)',
                color: 'var(--animus-cyan)',
                padding: '8px 20px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(61,231,255,0.1)',
              }}
              onClick={() => {
                playClick();
                window.open(activeProject.link, '_blank');
              }}
            >
              [ LAUNCH LIVE ]
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
