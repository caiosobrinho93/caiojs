import Hero from '@/components/sections/hero';
import AboutPreview from '@/components/sections/about-preview';
import Areas from '@/components/sections/areas';
import Stats from '@/components/sections/stats';
import ProjectMarquee from '@/components/sections/project-marquee';
import Process from '@/components/sections/process';
import CTA from '@/components/sections/cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Areas />
      <Stats />
      <ProjectMarquee />
      <Process />
      <CTA />
    </>
  );
}
