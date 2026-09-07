import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Trust } from '@/sections/Trust';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Services } from '@/sections/Services';
import { Projects } from '@/sections/Projects';
import { Process } from '@/sections/Process';
import { WhyWorkWithMe } from '@/sections/WhyWorkWithMe';
import { CTA } from '@/sections/CTA';
import { Contact } from '@/sections/Contact';

export function Home() {
  const [presetProjectType, setPresetProjectType] = useState<string | null>(null);

  const handleSelectService = (projectType: string) => {
    setPresetProjectType(projectType);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <About />
        <Skills />
        <Services onSelectService={handleSelectService} />
        <Projects />
        <Process />
        <WhyWorkWithMe />
        <CTA />
        <Contact presetProjectType={presetProjectType} />
      </main>
      <Footer />
    </>
  );
}
