import React, { useState, useEffect } from 'react';
import { useAnimus } from '../context/AnimusContext';
import { playClick, playHover, playSequenceSynth } from '../utils/audio';
import { School, GraduationCap } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  stats: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

export const JourneyTimeline: React.FC = () => {
  const { currentSection } = useAnimus();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(1.05);

  useEffect(() => {
    if (currentSection === 'timeline') {
      playSequenceSynth(); // Play game-like ascending beeps on entry
    }
  }, [currentSection]);

  if (currentSection !== 'timeline') return null;

  const nodes: NodeData[] = [
    {
      id: 'cbse',
      name: 'High School Graduation',
      location: 'Pune',
      date: '2025',
      label: 'Class XII',
      subtext: '2025',
      icon: <School size={20} />,
      description: 'Acquired foundational science and mathematical coding logic under the CBSE syllabus. Graduated school-wide with academic honors.',
      stats: '90.8% Score // Rank 3 School-wide',
    },
    {
      id: 'vit',
      name: 'Undergraduate Program',
      location: 'Pune',
      date: '2025 - 2029',
      label: 'BTech VIT Pune',
      subtext: '2025-29 // SGPA 9.07',
      icon: <GraduationCap size={20} />,
      description: 'Pursuing a Bachelor of Technology in Computer Science Engineering (Specialization: Cyber Security, IoT, Blockchain) at VIT Pune. Collaborating on systems programming, cryptography, and IoT deployments.',
      stats: 'Academic Sync: 9.07 SGPA (First Year Matrix)',
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId);

  const zoomIn = () => {
    playClick();
    setScaleFactor((prev) => Math.min(1.4, prev + 0.1));
  };
  
  const zoomOut = () => {
    playClick();
    setScaleFactor((prev) => Math.max(0.7, prev - 0.1));
  };

  const handleNodeClick = (nodeId: string) => {
    playClick();
    setSelectedNodeId(selectedNodeId === nodeId ? null : nodeId);
  };

  const hasSelection = selectedNodeId !== null;

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
      {/* Timeline Column */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: hasSelection ? '58%' : '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2.5rem',
          transition: 'width 0.4s ease',
        }}
      >
        <div>
          <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
            // HISTORY LOG
          </span>
          <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
            ACADEMIC JOURNEY
          </h2>
        </div>

        {/* 2D Flat Timeline Line Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            transform: `scale(${scaleFactor})`,
            transition: 'transform 0.3s ease',
            margin: '2rem 0',
          }}
        >
          {/* SVG Glowing horizontal pathway drawing */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            {/* Background path line */}
            <line
              x1="8%"
              y1="50%"
              x2="92%"
              y2="50%"
              stroke="rgba(61, 231, 255, 0.12)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Animated drawing pathway */}
            <line
              x1="8%"
              y1="50%"
              x2="92%"
              y2="50%"
              stroke="var(--animus-cyan)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{
                filter: 'drop-shadow(0 0 6px var(--animus-cyan-glow))',
                animation: 'drawPathway 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            />
          </svg>

          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 2,
                  cursor: 'pointer',
                  opacity: 0,
                  transform: 'translateY(15px)',
                  animation: 'timelineNodeFadeIn 0.75s ease forwards',
                  animationDelay: `${index * 0.35}s`,
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={playHover}
              >
                {/* Node icon circle */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: isSelected ? '2px solid var(--animus-gold)' : '2px solid var(--animus-cyan)',
                    background: isSelected ? 'var(--animus-gold)' : 'rgba(7, 13, 20, 0.95)',
                    boxShadow: isSelected ? '0 0 15px var(--animus-gold-glow)' : '0 0 8px var(--animus-cyan-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#000' : 'var(--animus-cyan)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {node.icon}
                </div>

                {/* Node labels (Class XII / BTech VIT Pune) */}
                <div
                  className="hud-font"
                  style={{
                    marginTop: '12px',
                    fontSize: '1.1rem',
                    color: isSelected ? 'var(--animus-gold)' : '#fff',
                    fontWeight: 700,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {node.label}
                </div>

                {/* Subtext */}
                <div
                  style={{
                    marginTop: '4px',
                    fontSize: '0.85rem',
                    color: 'rgba(226,244,247,0.5)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {node.subtext}
                </div>
              </div>
            );
          })}
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

      {/* Right Column: details panel */}
      {hasSelection && activeNode && (
        <div 
          className="transparent-text-block interactive"
          style={{
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'fadeInTimelineRight 0.3s ease',
          }}
        >
          <div
            style={{
              padding: '28px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
                // RECORD DATA VERIFIED
              </span>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                }}
                onClick={() => handleNodeClick(activeNode.id)}
              >
                ×
              </button>
            </div>
            <h3 className="serif-font" style={{ fontSize: '1.9rem', color: '#fff', marginTop: '6px', lineHeight: '1.3' }}>
              {activeNode.name}
            </h3>

            <div className="hud-font" style={{ fontSize: '0.85rem', color: 'rgba(226,244,247,0.5)' }}>
              LOCATION: {activeNode.location} // PERIOD: {activeNode.date}
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2f4f7' }}>
              {activeNode.description}
            </p>

            <div
              style={{
                borderTop: '1px solid rgba(255,200,59,0.2)',
                paddingTop: '12px',
                marginTop: '8px',
              }}
            >
              <span className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                ACADEMIC PERFORMANCE:
              </span>
              <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                {activeNode.stats}
              </span>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes timelineNodeFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInTimelineRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes drawPathway {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};
