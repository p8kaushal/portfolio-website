import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useAnimus } from '../context/AnimusContext';

interface PieceOfEdenProps {
  active: boolean;
}

export const PieceOfEden: React.FC<PieceOfEdenProps> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { relicShattered, setRelicShattered } = useAnimus();
  const [hovered, setHovered] = useState<boolean>(false);

  useFrame((state) => {
    if (!active || !groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time) * 0.08;
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Relic Sphere Base Grid */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 1.8, 16]} />
        <meshBasicMaterial color="#ffc83b" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Gem Mesh */}
      {!relicShattered && (
        <GemMesh
          isHovered={hovered}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setRelicShattered(true)}
        />
      )}

      {/* Shattered Shards */}
      {relicShattered && <ShatterEffect />}

      {/* Floating Tag */}
      <Html distanceFactor={5.5} center position={[0, -0.9, 0]}>
        <div
          className="hud-font transparent-text-block"
          style={{
            color: relicShattered ? 'var(--animus-gold)' : 'var(--animus-cyan)',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            cursor: 'pointer',
            letterSpacing: '0.2em',
            textShadow: '0 0 10px rgba(61,231,255,0.4)',
          }}
          onClick={() => setRelicShattered(!relicShattered)}
        >
          {relicShattered ? '[ACCESS SYNCHRONIZED]' : '[CLICK TO DECRYPT DATA]'}
        </div>
      </Html>
    </group>
  );
};

const GemMesh: React.FC<{
  isHovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}> = ({ isHovered, onPointerOver, onPointerOut, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = time * 0.15;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      <icosahedronGeometry args={[0.55, 0]} />
      <meshBasicMaterial
        color={isHovered ? 'var(--animus-gold)' : 'var(--animus-cyan)'}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ShatterEffect: React.FC = () => {
  const count = 40;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      const radius = 0.15 + Math.random() * 0.3;
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
        color="var(--animus-gold)"
        size={0.07}
        transparent
        opacity={0.85}
      />
    </points>
  );
};
