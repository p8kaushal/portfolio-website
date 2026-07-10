import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useAnimus } from '../context/AnimusContext';
import { playClick, playHover } from '../utils/audio';

interface PieceOfEdenProps {
  active: boolean;
}

export const PieceOfEden: React.FC<PieceOfEdenProps> = ({ active }) => {
  const { relicShattered, setRelicShattered } = useAnimus();

  if (!active) return null;

  const awards = [
    { id: 'award_1', y: 0.0, label: 'CLASS XII', color: '#ffc83b', secondary: '#ffa500' },
  ];

  const handleSelect = (id: string) => {
    playClick();
    setRelicShattered(relicShattered === id ? null : id);
  };

  return (
    <group position={[1.8, 0, 0]}>
      {awards.map((award) => {
        const isShattered = relicShattered === award.id;
        return (
          <group key={award.id} position={[0, award.y, 0]}>
            {/* Base Grid Ring */}
            <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.6, 16]} />
              <meshBasicMaterial color={award.color} wireframe transparent opacity={0.06} />
            </mesh>

            {/* Rotating Gem */}
            {!isShattered && (
              <GemMesh
                color={award.color}
                onClick={() => handleSelect(award.id)}
              />
            )}

            {/* Shattered Particles */}
            {isShattered && <ShatterEffect color={award.color} />}

            {/* Clean HTML label positioned to the left of the gem */}
            <Html distanceFactor={5.5} center position={[-0.8, 0, 0]}>
              <div
                className="hud-font"
                style={{
                  color: isShattered ? 'var(--animus-gold)' : award.color,
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  cursor: 'pointer',
                  letterSpacing: '0.12em',
                  textShadow: `0 0 8px ${award.color}66`,
                  paddingRight: '10px',
                  borderRight: `1.5px solid ${isShattered ? 'var(--animus-gold)' : award.color}`,
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleSelect(award.id)}
              >
                {isShattered ? '[VERIFIED]' : award.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

const GemMesh: React.FC<{
  color: string;
  onClick: () => void;
}> = ({ color, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = time * 0.15;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        playHover();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <icosahedronGeometry args={[0.36, 0]} />
      <meshBasicMaterial
        color={hovered ? 'var(--animus-gold)' : color}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ShatterEffect: React.FC<{ color: string }> = ({ color }) => {
  const count = 30;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      const radius = 0.1 + Math.random() * 0.22;
      arr[i * 3] = Math.cos(angle) * Math.cos(pitch) * radius;
      arr[i * 3 + 1] = Math.sin(pitch) * radius;
      arr[i * 3 + 2] = Math.sin(angle) * Math.cos(pitch) * radius;
    }
    return arr;
  });

  useFrame(() => {
    if (!particlesRef.current) return;
    const positionsAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      positionsAttr.setX(i, positionsAttr.getX(i) * 1.04);
      positionsAttr.setY(i, positionsAttr.getY(i) * 1.04);
      positionsAttr.setZ(i, positionsAttr.getZ(i) * 1.04);
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.06}
        transparent
        opacity={0.85}
      />
    </points>
  );
};
