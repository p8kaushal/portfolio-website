import React, { createContext, useContext, useState, useEffect } from 'react';

export type SectionType = 
  | 'loading'
  | 'character'
  | 'timeline'
  | 'projects'
  | 'skills'
  | 'artifacts'
  | 'contact';

export type ProfilePartType = 'head' | 'heart' | 'hands' | null;

interface AnimusContextProps {
  currentSection: SectionType;
  isSynchronized: boolean;
  glitchActive: boolean;
  timelineZoom: number;
  setTimelineZoom: React.Dispatch<React.SetStateAction<number>>;
  skillsZoom: number;
  setSkillsZoom: React.Dispatch<React.SetStateAction<number>>;
  selectedProfilePart: ProfilePartType;
  setSelectedProfilePart: React.Dispatch<React.SetStateAction<ProfilePartType>>;
  relicShattered: boolean;
  setRelicShattered: React.Dispatch<React.SetStateAction<boolean>>;
  synchronize: () => void;
  navigateTo: (section: SectionType) => void;
  resetSync: () => void;
}

const AnimusContext = createContext<AnimusContextProps | undefined>(undefined);

export const AnimusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<SectionType>('loading');
  const [isSynchronized, setIsSynchronized] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Zoom control states for 2D/3D navigation
  const [timelineZoom, setTimelineZoom] = useState<number>(0.75);
  const [skillsZoom, setSkillsZoom] = useState<number>(0.75);

  // Active clicked part for Character stats page
  const [selectedProfilePart, setSelectedProfilePart] = useState<ProfilePartType>('heart');

  // Relic/Artifact state for Awards page
  const [relicShattered, setRelicShattered] = useState<boolean>(false);

  const triggerGlitch = (callback: () => void) => {
    setGlitchActive(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setGlitchActive(false);
      }, 300); // end glitch after some time
    }, 250); // change content midway
  };

  const synchronize = () => {
    triggerGlitch(() => {
      setIsSynchronized(true);
      setCurrentSection('character');
    });
  };

  const navigateTo = (section: SectionType) => {
    if (!isSynchronized && section !== 'loading') return;
    triggerGlitch(() => {
      setCurrentSection(section);
    });
  };

  const resetSync = () => {
    triggerGlitch(() => {
      setIsSynchronized(false);
      setCurrentSection('loading');
    });
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      if (!isSynchronized && key === 'enter') {
        synchronize();
        return;
      }

      if (!isSynchronized) return;

      switch (key) {
        case 'h':
          navigateTo('character');
          break;
        case 'm':
          navigateTo('timeline');
          break;
        case 'i':
          navigateTo('projects');
          break;
        case 't':
          navigateTo('skills');
          break;
        case 'a':
          navigateTo('artifacts');
          break;
        case 'b':
          navigateTo('contact');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSynchronized]);

  // Scroll wheel event handling to cycle sections with a snap threshold
  useEffect(() => {
    if (!isSynchronized) return;

    let accumulatedDelta = 0;
    let lastScrollTime = 0;
    const cooldown = 1100; // longer cooldown matching glitch animation
    const threshold = 120; // wheel delta accumulation before snap triggering

    const sections: SectionType[] = ['character', 'timeline', 'projects', 'skills', 'artifacts', 'contact'];

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < cooldown) {
        accumulatedDelta = 0;
        return;
      }

      accumulatedDelta += e.deltaY;

      if (Math.abs(accumulatedDelta) >= threshold) {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex === -1) return;

        if (accumulatedDelta > 0) {
          // Scroll down -> next section
          const nextIndex = (currentIndex + 1) % sections.length;
          lastScrollTime = now;
          accumulatedDelta = 0;
          navigateTo(sections[nextIndex]);
        } else {
          // Scroll up -> previous section
          const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
          lastScrollTime = now;
          accumulatedDelta = 0;
          navigateTo(sections[prevIndex]);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isSynchronized, currentSection]);

  return (
    <AnimusContext.Provider
      value={{
        currentSection,
        isSynchronized,
        glitchActive,
        timelineZoom,
        setTimelineZoom,
        skillsZoom,
        setSkillsZoom,
        selectedProfilePart,
        setSelectedProfilePart,
        relicShattered,
        setRelicShattered,
        synchronize,
        navigateTo,
        resetSync,
      }}
    >
      {children}
    </AnimusContext.Provider>
  );
};

export const useAnimus = () => {
  const context = useContext(AnimusContext);
  if (!context) {
    throw new Error('useAnimus must be used within an AnimusProvider');
  }
  return context;
};
