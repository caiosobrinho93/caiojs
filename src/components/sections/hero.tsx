'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Shared easing curve
const EASE = [0.16, 1, 0.3, 1] as const;

// Decorative floating shapes that give the hero depth
function FloatingShape({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, delay: delay + 1, ease: EASE as any }}
      style={{ animation: `float ${6 + delay * 2}s ease-in-out infinite ${delay}s` }}
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      aria-label="Seção principal"
    >
      {/* ── Background: Radial gold glow ── */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-bg-primary" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)',
          }}
        />
        {/* Subtle grain */}
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* ── Decorative floating shapes ── */}
      <FloatingShape
        delay={0}
        className="absolute top-[15%] left-[10%] w-16 h-16 border border-border-gold rounded-sm rotate-12 opacity-[0.12] hidden md:block"
      />
      <FloatingShape
        delay={0.5}
        className="absolute top-[20%] right-[12%] w-10 h-10 border border-border-gold rounded-full opacity-[0.1] hidden md:block"
      />
      <FloatingShape
        delay={1}
        className="absolute bottom-[25%] left-[18%] w-8 h-8 border border-border-gold rounded-full opacity-[0.08] hidden lg:block"
      />
      <FloatingShape
        delay={1.5}
        className="absolute bottom-[30%] right-[8%] w-14 h-14 border border-border-gold rounded-sm -rotate-6 opacity-[0.1] hidden md:block"
      />
      <FloatingShape
        delay={0.8}
        className="absolute top-[40%] right-[25%] w-6 h-6 border border-gold-500/30 rounded-sm rotate-45 opacity-[0.15] hidden lg:block"
      />
      <FloatingShape
        delay={1.2}
        className="absolute bottom-[40%] left-[8%] w-12 h-12 border border-gold-500/20 rounded-sm rotate-[20deg] opacity-[0.07] hidden lg:block"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge / Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE as any }}
        >
          <span className="inline-flex items-center px-4 py-1.5 mb-8 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
            Soluções Digitais &amp; Projetos
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-gradient-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE as any }}
        >
          CAIO SOBRINHO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE as any }}
        >
          Transformando ideias em soluções digitais, sistemas inteligentes e
          projetos reais.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE as any }}
        >
          <Button variant="primary" size="lg" href="/projetos">
            Explorar Projetos
          </Button>
          <Button variant="secondary" size="lg" href="/contato">
            Entrar em Contato
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <span className="text-text-subtle text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="size-5 text-gold-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
