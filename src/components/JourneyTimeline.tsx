import React, { useState } from 'react';
import { useAnimus } from '../context/AnimusContext';

interface NodeData {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  stats: string;
}

export const JourneyTimeline: React.FC = () => {
  const { currentSection } = useAnimus();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('vit'); // default active node
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  if (currentSection !== 'timeline') return null;

  const nodes: NodeData[] = [
    {
      id: 'cbse',
      name: 'Memory Sequence 01: High School Synchronization',
      location: 'Pune',
      date: '2025',
      description: 'Acquired foundational logic and science principles under CBSE syllabus. Graduated with honors, establishing an analytical academic baseline.',
      stats: '90.8% Score // Rank 3 School-wide',
    },
    {
      id: 'vit',
      name: 'Memory Sequence 02: B.Tech in Computer Science Engineering',
      location: 'Pune',
      date: '2025 - 2029',
      description: 'Specializing in Cyber Security, IoT, and Blockchain at Vishwakarma Institute of Technology. Exploring systems programming, cryptography, and real-time physical-digital links.',
      stats: 'Current SGPA: 9.07 (First Year Matrix)',
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

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
      {/* Left Area: Main Journey Grid & Node Selectors */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '58%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2.5rem',
        }}
      >
        <div>
          <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
            // MEMORY CORRIDORS
          </span>
          <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
            JOURNEY TIMELINE
          </h2>
        </div>

        {/* 2D Flat Timeline Line Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            transform: `scale(${scaleFactor})`,
            transition: 'transform 0.3s ease',
            margin: '2rem 0',
          }}
        >
          {/* Horizontal connecting vector */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: '3px',
              backgroundColor: 'rgba(61, 231, 255, 0.2)',
              borderBottom: '1px solid rgba(61,231,255,0.4)',
              zIndex: 1,
            }}
          />

          {nodes.map((node) => {
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
                }}
                onClick={() => setSelectedNodeId(node.id)}
              >
                {/* viewpoint dot */}
                <div
                  className="hud-font"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: isSelected ? '2px solid var(--animus-gold)' : '2px solid var(--animus-cyan)',
                    background: isSelected ? 'var(--animus-gold)' : 'rgba(7, 13, 20, 0.9)',
                    boxShadow: isSelected ? '0 0 15px var(--animus-gold-glow)' : '0 0 10px var(--animus-cyan-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#000' : 'var(--animus-cyan)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {node.date === '2025' ? '01' : '02'}
                </div>

                {/* Node descriptor title */}
                <div
                  className="hud-font"
                  style={{
                    marginTop: '12px',
                    fontSize: '0.9rem',
                    color: isSelected ? 'var(--animus-gold)' : 'rgba(226,244,247,0.7)',
                    fontWeight: 600,
                    textShadow: isSelected ? '0 0 8px var(--animus-gold-glow)' : 'none',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {node.location.toUpperCase()} ({node.date})
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Zoom Buttons */}
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

      {/* Right Area: Large unified Details Panel */}
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
            border: '1px solid var(--animus-gold)',
            borderRight: '4px solid var(--animus-gold)',
            padding: '28px',
            background: 'rgba(7, 13, 20, 0.95)',
            boxShadow: '0 0 30px rgba(255, 200, 59, 0.25)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.3s ease',
          }}
        >
          <div>
            <span className="hud-font" style={{ color: 'var(--animus-gold)', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
              // VIEWPOINT DATA SYNCHRONIZED
            </span>
            <h3 className="serif-font" style={{ fontSize: '1.9rem', color: '#fff', marginTop: '6px', lineHeight: '1.3' }}>
              {activeNode.name}
            </h3>
          </div>

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
              ACADEMIC TELEMETRY:
            </span>
            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
              {activeNode.stats}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
