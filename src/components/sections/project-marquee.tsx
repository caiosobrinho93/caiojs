import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';

const marqueeProjects = [...PORTFOLIO_PROJECTS, ...PORTFOLIO_PROJECTS];

export default function ProjectMarquee() {
  return (
    <section className="overflow-hidden border-y border-border bg-bg-secondary/55 py-24 lg:py-32" aria-labelledby="project-marquee-title">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-end md:justify-between">
        <ScrollReveal>
          <div>
            <span className="mb-5 inline-flex rounded-full border border-border-gold bg-mint-500/8 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mint-400">
              Projetos reais
            </span>
            <h2 id="project-marquee-title" className="max-w-2xl font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              Ideias que ganharam <span className="text-gradient-gold">forma.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-text-muted md:text-right">
            Uma seleção de ambientes planejados que traduzem minha experiência com execução, detalhe e uso inteligente do espaço.
          </p>
        </ScrollReveal>
      </div>

      <div className="project-marquee" aria-label="Galeria contínua de projetos de marcenaria">
        <div className="project-marquee__track">
          {marqueeProjects.map((project, index) => (
            <article className="project-marquee__card" key={`${project.name}-${index}`} aria-hidden={index >= PORTFOLIO_PROJECTS.length}>
              <div className="project-marquee__image-wrap">
                <Image
                  src={project.image}
                  alt={index < PORTFOLIO_PROJECTS.length ? project.alt : ''}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 30vw"
                  className="project-marquee__image"
                />
                <div className="project-marquee__shade" />
                <span className="project-marquee__number">{project.number}</span>
                <div className="project-marquee__caption">
                  <p>{project.category}</p>
                  <h3>{project.name}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}