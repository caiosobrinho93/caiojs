'use client';

import { PROCESS_STEPS } from '@/lib/constants';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Compass, Layers, Code, Settings, Rocket } from 'lucide-react';

const ICON_MAP = {
  Compass,
  Layers,
  Code,
  Settings,
  Rocket,
} as const;

export default function Process() {
  return (
    <section
      className="py-24 lg:py-32 px-6 overflow-hidden"
      aria-label="Metodologia de trabalho"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <ScrollReveal>
            <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
              Metodologia
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
              Como <span className="text-gradient-gold">Trabalho</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-text-muted text-base md:text-lg max-w-2xl mx-auto">
              Um processo estruturado de ponta a ponta para garantir que cada projeto seja executado com a máxima excelência.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical connecting line (hidden on mobile, centered on desktop) */}
          <div
            className="absolute left-[31px] md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-gold-500/30 via-border to-transparent -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = ICON_MAP[step.icon as keyof typeof ICON_MAP] || Code;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                    <ScrollReveal
                      direction={isEven ? 'left' : 'right'}
                      delay={0.15}
                    >
                      <div
                        className={`p-8 bg-bg-card border border-border hover:border-border-gold rounded-[var(--radius-card)] transition-all duration-300 relative group hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] ${
                          isEven ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        {/* Mobile Icon placement */}
                        <div className="flex md:hidden items-center justify-between mb-4">
                          <div className="size-10 rounded-full border border-border-gold flex items-center justify-center bg-bg-primary text-gold-400">
                            <IconComponent className="size-5" />
                          </div>
                          <span className="font-display text-sm font-semibold text-gold-500">
                            0{step.step}
                          </span>
                        </div>

                        <div className={`hidden md:flex items-center gap-3 mb-3 justify-end ${
                          isEven ? 'justify-end' : 'flex-row-reverse'
                        }`}>
                          <span className="font-display text-sm font-semibold text-gold-500/60 group-hover:text-gold-400 transition-colors">
                            Etapa 0{step.step}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                          {step.title}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Centered marker (timeline circle) */}
                  <div className="absolute left-[31px] md:left-1/2 top-6 md:top-auto md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <ScrollReveal delay={0.05} duration={0.4}>
                      <div className="size-16 rounded-full border-2 border-gold-600/50 bg-bg-primary hover:border-gold-500 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] scale-90 md:scale-100">
                        <IconComponent className="size-6 text-gold-400" />
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Spacer for empty side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
