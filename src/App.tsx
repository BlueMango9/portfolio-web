import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useAudioSfx } from './hooks/useAudioSfx';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { TerminalModal } from './components/TerminalModal';
import { ProjectModal } from './components/ProjectModal';
import { BackgroundParticles } from './scenes/BackgroundParticles';

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SystemsSection } from './sections/SystemsSection';
import { VenturesSection } from './sections/VenturesSection';
import { PhotographySection } from './sections/PhotographySection';
import { InterestsSection } from './sections/InterestsSection';
import { ContactSection } from './sections/ContactSection';
import { SystemProject } from './data/portfolioData';

export function App() {
  // Initialize Lenis Smooth Scroll
  useSmoothScroll();

  // Web Audio Micro-interaction Sound FX
  const {
    soundEnabled,
    toggleSound,
    playClick,
    playHover,
    playWatchTick,
    playEngineRev,
    playSuccess
  } = useAudioSfx();

  // Modals state
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<SystemProject | null>(null);

  const scrollToSection = (sectionId: string) => {
    playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-ds-abyss text-ds-white selection:bg-ds-sky selection:text-ds-abyss font-sans">
      {/* Custom Spring Physics Cursor System */}
      <CustomCursor />

      {/* Persistent Ambient Particles Background */}
      <BackgroundParticles />

      {/* Floating Glass Navigation Island & HUD */}
      <Navigation
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenTerminal={() => {
          playClick();
          setTerminalOpen(true);
        }}
        onPlayClick={playClick}
      />

      {/* Main Page Narrative Sections */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section — The 3-Beat Scroll-Scrub Movie Open */}
        <HeroSection
          onExplore={scrollToSection}
          onOpenTerminal={() => {
            playClick();
            setTerminalOpen(true);
          }}
          onPlayClick={playClick}
        />

        {/* Section 01: About Me & Systems Philosophy */}
        <AboutSection onPlayClick={playClick} />

        {/* Section 02: Systems Hub & ARIA AI HUD Simulator */}
        <SystemsSection
          onSelectProject={(project) => {
            playClick();
            setSelectedProject(project);
          }}
          onPlayClick={playClick}
        />

        {/* Section 03: Ventures — Kápi Cartel (kapicartel.com) & Content Channels */}
        <VenturesSection onPlayClick={playClick} />

        {/* Section 04: Photography & Visuals — VSCO Journal, EXIF Telemetry & Craft Matrix */}
        <PhotographySection onPlayClick={playClick} />

        {/* Section 05: Interests — Horology, Simgot EW200 IEM Lab, F1 Telemetry & Polymath Grid */}
        <InterestsSection
          onPlayClick={playClick}
          onEngineRev={playEngineRev}
        />

        {/* Section 06: Contact & Direct Dispatch Console */}
        <ContactSection
          onOpenTerminal={() => {
            playClick();
            setTerminalOpen(true);
          }}
          onPlayClick={playClick}
          onPlaySuccess={playSuccess}
        />
      </main>

      {/* Interactive Subsystem Modals */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onPlayClick={playClick}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPlayClick={playClick}
      />
    </div>
  );
}

export default App;
