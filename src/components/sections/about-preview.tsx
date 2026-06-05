'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Button } from '@/components/ui/button';

// Skill areas displayed as overlapping cards on the right
const SKILL_AREAS = [
  { label: 'Sistemas Web', color: 'from-gold-500/20 to-gold-700/10' },
  { label: 'Projetos', color: 'from-gold-400/15 to-gold-600/10' },
  { label: 'Design', color: 'from-gold-300/20 to-gold-500/10' },
  { label: 'Marcenaria', color: 'from-gold-500/15 to-gold-700/5' },
  { label: 'Automações', color: 'from-gold-400/20 to-gold-600/10' },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutPreview() {
  return (
    <section
      className="py-24 lg:py-32 px-6"
      aria-label="Sobre Caio Sobrinho"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left: Text content ── */}
          <div>
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Quem está por trás
                <br />
                <span className="text-gradient-gold">dos projetos?</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                Sou um profissional multifuncional que pensa em sistemas e
                entrega resultados. Com mais de 8 anos em marcenaria planejada e
                6 anos em gestão de projetos, aprendi que a excelência está nos
                detalhes — e trouxe essa mentalidade para o mundo digital.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-text-muted text-base leading-relaxed">
                Hoje atuo na interseção entre design, tecnologia e estratégia.
                Desenvolvo sistemas web, dashboards empresariais, automações
                inteligentes e projetos sob medida — sempre com foco em
                resolver problemas reais e criar soluções que funcionam.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-text-muted text-base leading-relaxed">
                Minha abordagem combina visão sistêmica, execução disciplinada e
                atenção obsessiva à qualidade. Cada projeto é uma oportunidade
                de superar expectativas.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8">
                <Button variant="ghost" href="/sobre" className="group">
                  Conhecer mais
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: Stacked skill cards ── */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative flex items-center justify-center min-h-[360px] lg:min-h-[420px]">
              {SKILL_AREAS.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  className={`
                    absolute w-[260px] sm:w-[280px] h-[72px]
                    bg-gradient-to-r ${skill.color}
                    backdrop-blur-sm
                    border border-border-gold/40
                    rounded-[var(--radius-card)]
                    flex items-center justify-center
                    text-gold-400 font-display font-semibold text-sm tracking-wide
                    cursor-default select-none
                  `}
                  style={{
                    top: `${i * 60 + 20}px`,
                    rotate: `${(i - 2) * 3}deg`,
                    zIndex: SKILL_AREAS.length - i,
                  }}
                  initial={{ opacity: 0, x: 40, rotate: `${(i - 2) * 6}deg` }}
                  whileInView={{ opacity: 1, x: 0, rotate: `${(i - 2) * 3}deg` }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.1,
                    ease: EASE as any,
                  }}
                  whileHover={{
                    scale: 1.04,
                    rotate: '0deg',
                    zIndex: 10,
                    boxShadow: '0 0 30px rgba(212,175,55,0.15)',
                    transition: { duration: 0.3 },
                  }}
                >
                  {skill.label}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
