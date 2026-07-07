import React, { Suspense } from 'react';
import { Html } from '@react-three/drei';
import { ParthAvatar } from './ParthAvatar';
import { useAnimus } from '../context/AnimusContext';

interface CharacterModelProps {
  active: boolean;
}

export const CharacterModel: React.FC<CharacterModelProps> = ({ active }) => {
  const { setSelectedProfilePart } = useAnimus();

  if (!active) return null;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Lighting for ParthAvatar character layout */}
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1.5} position={[5, 5, 5]} />

      {/* Suspense boundary for model loading */}
      <Suspense
        fallback={
          <Html center distanceFactor={6}>
            <div
              className="hud-font cyan-glow-text"
              style={{
                fontSize: '1.25rem',
                color: 'var(--animus-cyan)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.2em',
                animation: 'pulse 1.5s infinite',
              }}
            >
              SYNCHRONIZING ANIMA LINK...
            </div>
          </Html>
        }
      >
        <ParthAvatar onSelectPart={setSelectedProfilePart} />
      </Suspense>
    </group>
  );
};
