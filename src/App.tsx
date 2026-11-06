import React, { useState } from 'react';
import { LenisProvider } from './context/LenisContext';
import { BuildSystemProvider } from './context/BuildSystemContext';
import { GlobalLoader } from './components/GlobalLoader';
import { CursorAgentFleet } from './components/CursorAgentFleet';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ToolsMarquee } from './components/ToolsMarquee';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ServicesSection } from './components/ServicesSection';
import { ShowreelSection } from './components/ShowreelSection';
import { RawToRealSection } from './components/RawToRealSection';
import { AboutSkillsSection } from './components/AboutSkillsSection';
import { GitHubSection } from './components/GitHubSection';
import { ProjectJourneySection } from './components/ProjectJourneySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoPlayerOverlay } from './components/VideoPlayerOverlay';
import { BuildHUDDock } from './components/BuildHUDDock';
import { BlueprintOverlay } from './components/BlueprintOverlay';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [blueprintActive] = useState(false);

  return (
    <LenisProvider>
      <BuildSystemProvider>
        <div className="relative min-h-screen bg-[#07080D] text-text-primary selection:bg-coral selection:text-white">
          {/* Cinematic Minimal Intro Loader */}
          <GlobalLoader onComplete={() => setIsLoaded(true)} />

          {/* Real-time 24 AI Agent Fleet actively constructing page elements on scroll */}
          <CursorAgentFleet />

          {/* Optional Subtle Ruler Grid */}
          <BlueprintOverlay active={blueprintActive} />

          {/* Thin Red Vertical Scroll Progress Line on Left Edge */}
          <ScrollProgressBar />

          {/* Fixed Minimal Top Navigation */}
          <Navbar isLoaded={isLoaded} />

          {/* Main Content Sections */}
          <main>
            {/* Section 00: Hero (Cinematic Full Screen) */}
            <HeroSection
              isLoaded={isLoaded}
              onOpenShowreel={() => setShowreelOpen(true)}
            />

            {/* Continuous Real Tech Stack Logo Marquee Banner */}
            <ToolsMarquee />

            {/* Section 01: Cinematic Showreel (Autoplays as soon as cursors build it) */}
            <ShowreelSection onOpenShowreel={() => setShowreelOpen(true)} />

            {/* Section 02: Selected Work (Real projects revealed by cursors, zero fake slots) */}
            <SelectedWorkSection />

            {/* Section 03: Services I Offer (Local Business, Django, Flask) */}
            <ServicesSection />

            {/* Section 03: From Raw. To Real. (Before/After Slider) */}
            <RawToRealSection />

            {/* Section 04: Philosophy, Skills & Process */}
            <AboutSkillsSection />

            {/* Section 05: GitHub Repositories (Live API / Verified Fallback) */}
            <GitHubSection />

            {/* Section 06: Project Journey & Milestones */}
            <ProjectJourneySection />

            {/* Section 07: Contact & Interactive Finale Card */}
            <ContactSection onOpenShowreel={() => setShowreelOpen(true)} />
          </main>

          {/* Real Live Bottom Build HUD (Live active agents count, real built/total ratio, replay button) */}
          <BuildHUDDock />

          {/* Clean Minimal Footer */}
          <Footer />

          {/* Responsive Fullscreen Video Player Modal */}
          <VideoPlayerOverlay
            isOpen={showreelOpen}
            onClose={() => setShowreelOpen(false)}
          />
        </div>
      </BuildSystemProvider>
    </LenisProvider>
  );
};

export default App;
