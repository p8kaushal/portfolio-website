import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimus } from '../context/AnimusContext';
import { CharacterModel } from './CharacterModel';
import { QuestTimelineMap } from './QuestTimelineMap';
import { SkillConstellation } from './SkillConstellation';
import { PieceOfEden } from './PieceOfEden';
import { BrotherhoodNetwork } from './BrotherhoodNetwork';

// Custom camera controller to animate camera position/target based on active section
const CameraController: React.FC = () => {
  const { currentSection, timelineZoom, skillsZoom, selectedProfilePart } = useAnimus();
  const { camera } = useThree();

  const targetPos = useRef(new THREE.Vector3(0, 0, 10));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    switch (currentSection) {
      case 'loading':
        targetPos.current.set(0, 0, 12);
        targetLook.current.set(0, 0, 0);
        break;
      case 'character':
        if (!selectedProfilePart) {
          // Model on the right of the screen
          targetPos.current.set(-1.2, 0.4, 4.8);
          targetLook.current.set(-1.2, 0.4, 0);
        } else if (selectedProfilePart === 'head') {
          // Zoom in on head, model shifted to the left
          targetPos.current.set(1.2, 1.3, 1.9);
          targetLook.current.set(1.2, 1.3, 0);
        } else {
          // Heart or Hands: model shifted to the left without zooming in
          targetPos.current.set(1.2, 0.4, 4.8);
          targetLook.current.set(1.2, 0.4, 0);
        }
        break;
      case 'timeline':
        // Top-down/isometric view looking at the holographic path, scaled by timelineZoom
        targetPos.current.set(0, 8 * timelineZoom, 12 * timelineZoom);
        targetLook.current.set(0, 0.5, -2);
        break;
      case 'projects':
        // Close-up on the projects Weapon Wheel center area
        targetPos.current.set(0, 0, 4.8);
        targetLook.current.set(0, 0, 0);
        break;
      case 'skills':
        // High, looking at the cosmic skills sky, scaled by skillsZoom
        targetPos.current.set(0, 15 * skillsZoom, 15 * skillsZoom);
        targetLook.current.set(0, 10, -5);
        break;
      case 'artifacts':
        // Move camera left to push stacked gems to the right side of the screen
        targetPos.current.set(-0.8, 0, 5.2);
        targetLook.current.set(-0.8, 0, 0);
        break;
      case 'contact':
        // Tilting down to see hex network, no rotation on network mesh itself
        targetPos.current.set(0, 3.5, 6);
        targetLook.current.set(0, -0.2, 0);
        break;
      default:
        break;
    }
  }, [currentSection, timelineZoom, skillsZoom, selectedProfilePart]);

  useFrame(() => {
    // Smoothly lerp camera position
    camera.position.lerp(targetPos.current, 0.05);

    // Smoothly lerp camera lookAt target
    // We can create a dummy 3D object to hold current lookAt and lerp it
    const currentLook = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLook.lerp(targetLook.current, 0.05);
    camera.lookAt(currentLook);
  });

  return null;
};

// Atmospheric background particles
const Particles: React.FC = () => {
  const count = 300;
  const meshRef = useRef<THREE.Points>(null);

  const [positions] = React.useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z
    }
    return arr;
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = time * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3de7ff"
        size={0.06}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
};

// Glowing Faint Animus Grid
const AnimusGrid: React.FC = () => {
  return (
    <gridHelper
      args={[40, 40, '#00f0ff', '#1a3340']}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

export const SceneContainer: React.FC = () => {
  const { currentSection } = useAnimus();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050a10', 1);
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3de7ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffc83b" />
        
        {/* Environment / Background */}
        <Particles />
        <AnimusGrid />
        
        {/* Dynamic Camera Control */}
        <CameraController />

        {/* Conditional rendering / active state visualization of 3D entities */}
        <CharacterModel active={currentSection === 'character'} />
        <QuestTimelineMap active={currentSection === 'timeline'} />
        <SkillConstellation active={currentSection === 'skills'} />
        <PieceOfEden active={currentSection === 'artifacts'} />
        <BrotherhoodNetwork active={currentSection === 'contact'} />
      </Canvas>
    </div>
  );
};
