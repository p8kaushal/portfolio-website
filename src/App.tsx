import React from 'react';
import { AnimusProvider } from './context/AnimusContext';
import { SceneContainer } from './components/SceneContainer';
import { Navbar } from './components/Navbar';
import { GlitchOverlay } from './components/GlitchOverlay';
import { LoadingScreen } from './components/LoadingScreen';
import { CharacterMenu } from './components/CharacterMenu';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ProjectsWeaponWheel } from './components/ProjectsWeaponWheel';
import { SkillsTree } from './components/SkillsTree';
import { ArtifactsEden } from './components/ArtifactsEden';
import { BrotherhoodContact } from './components/BrotherhoodContact';

const AppContent: React.FC = () => {
  return (
    <>
      {/* 3D background WebGL simulation */}
      <SceneContainer />

      {/* Global CSS overlays for immersion: scanlines & vignette */}
      <div className="animus-overlay scanlines" />
      <div className="animus-overlay vignette" />

      {/* Dynamic digital glitch transition overlay */}
      <GlitchOverlay />

      {/* HUD Layer containing DOM UI overlays */}
      <div className="hud-layer">
        <Navbar />
        
        {/* Sections overlays */}
        <LoadingScreen />
        <CharacterMenu />
        <JourneyTimeline />
        <ProjectsWeaponWheel />
        <SkillsTree />
        <ArtifactsEden />
        <BrotherhoodContact />
      </div>
    </>
  );
};

function App() {
  return (
    <AnimusProvider>
      <AppContent />
    </AnimusProvider>
  );
}

export default App;
