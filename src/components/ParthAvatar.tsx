import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ParthAvatarProps {
  onSelectPart: (part: 'head' | 'heart' | 'hands') => void;
}

export const ParthAvatar: React.FC<ParthAvatarProps> = ({ onSelectPart }) => {
  // Load model from exactly "/models/parth_avatar.glb"
  const { scene } = useGLTF('/models/parth_avatar.glb');

  const headRef = useRef<THREE.Object3D | null>(null);
  const torsoRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        const nameLower = child.name.toLowerCase();
        // Head / Neck node mapping
        if (nameLower === 'head' || nameLower === 'neck' || nameLower.includes('head_bone')) {
          headRef.current = child;
        }
        // Spine / Torso node mapping
        if (nameLower.includes('spine') || nameLower === 'torso' || nameLower === 'hips') {
          if (!torsoRef.current) {
            torsoRef.current = child;
          }
        }
      });
    }

    // Cleanup model assets from cache on unmount to prevent leaks
    return () => {
      useGLTF.clear('/models/parth_avatar.glb');
    };
  }, [scene]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Idle breathing: subtle y-axis sin-wave on torso
    if (torsoRef.current) {
      torsoRef.current.position.y = Math.sin(time * 2) * 0.02;
    } else if (scene) {
      // Fallback breathing applied to root scene y-coordinate
      scene.position.y = -1.4 + Math.sin(time * 2) * 0.04;
    }

    // Mouse tracking: head bone rotates to look at state.mouse
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, state.mouse.x * 0.45, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -state.mouse.y * 0.35, 0.1);
    }
  });

  return (
    <group position={[0, -1.2, 0]} scale={[1.8, 1.8, 1.8]}>
      {/* Loaded GLB Avatar Scene */}
      <primitive object={scene} />

      {/* Invisible Interactive Hitboxes centered around key joints */}
      
      {/* Head Hitbox */}
      <mesh 
        position={[0, 1.4, 0]} 
        onClick={(e) => {
          e.stopPropagation();
          onSelectPart('head');
        }}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#3de7ff" transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Heart / Torso Hitbox */}
      <mesh 
        position={[0, 0.7, 0]} 
        onClick={(e) => {
          e.stopPropagation();
          onSelectPart('heart');
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#3de7ff" transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Hands Hitbox */}
      <mesh 
        position={[0.7, 0.4, 0]} 
        onClick={(e) => {
          e.stopPropagation();
          onSelectPart('hands');
        }}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#3de7ff" transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh 
        position={[-0.7, 0.4, 0]} 
        onClick={(e) => {
          e.stopPropagation();
          onSelectPart('hands');
        }}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#3de7ff" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};
