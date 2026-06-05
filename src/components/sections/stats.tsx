'use client';

import { STATS_DEFAULT } from '@/lib/constants';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export default function Stats() {
  return (
    <section
      className="py-20 bg-bg-secondary border-y border-border px-6"
      aria-label="Estatísticas de impacto"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {STATS_DEFAULT.map((stat, index) => {
            const targetNum = parseInt(stat.value, 10) || 0;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center justify-center p-4 ${
                  index % 2 === 0 ? '' : 'pt-12 lg:pt-4'
                } ${index >= 2 ? 'pt-12 lg:pt-4' : ''}`}
              >
                <ScrollReveal delay={index * 0.1}>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-gold">
                    <AnimatedCounter
                      target={targetNum}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-3 text-text-muted text-xs md:text-sm tracking-wider uppercase font-medium max-w-[200px]">
                    {stat.label}
                  </p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
