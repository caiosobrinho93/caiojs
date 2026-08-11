'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 lg:pt-20"
      aria-label="Apresentação inicial"
    >
      {/* Background partition (dark and subtle green lights) */}
      <div className="absolute inset-0 -z-20 bg-transparent" aria-hidden="true" />
      
      {/* Split background layout on desktop */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[45%] -z-10 bg-gradient-to-br from-mint-500/10 to-transparent lg:bg-mint-500 opacity-20 lg:opacity-100 transition-all"
        style={{
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* ── Left Column: Text content ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Small Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-mint-400 bg-mint-500/8 border border-border-gold rounded-full">
            <Terminal className="size-3.5" />
            Olá, Eu Sou Caio Sobrinho
          </span>

          {/* Large Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-text-primary">
            Desenvolvedor de
            <br />
            <span className="text-gradient-gold">Sistemas &amp; Projetos.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
            Unindo visão sistêmica, tecnologia avançada e atenção milimétrica aos detalhes para estruturar automações, criar sistemas web e dar vida a projetos físicos sob medida.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="primary" size="md" href="/projetos" className="group">
              Ver Portfólio
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button variant="secondary" size="md" href="/contato">
              Entrar em Contato
            </Button>
          </div>
        </div>

        {/* ── Right Column: Photo/Graphics Placeholder ── */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[500px]">
          {/* Geometric floating outline decorations */}
          <div className="absolute inset-0 -z-10 opacity-30 select-none pointer-events-none" aria-hidden="true">
            {/* Hexagon shape outlines */}
            <div className="absolute top-[10%] left-[5%] size-16 border border-mint-400/40 rounded-lg rotate-12" />
            <div className="absolute bottom-[15%] right-[10%] size-24 border border-mint-500/30 rounded-full" />
            <div className="absolute top-[50%] right-[5%] size-12 border border-mint-400/20 rounded-lg -rotate-45" />
          </div>

          {/* Portrait card */}
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-mint-400/20 bg-bg-card shadow-[0_0_50px_rgba(16,185,129,0.06)] group hover:border-mint-400/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-card to-bg-secondary -z-10" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-mint-500/10" />
            <Image
              src="/images/caiosobrinho.png"
              alt="Retrato de Caio Sobrinho"
              fill
              priority
              sizes="(max-width: 1024px) 360px, 30vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/10 bg-bg-primary/65 px-4 py-3 backdrop-blur-md">
              <span className="font-display text-sm font-bold tracking-wide text-text-primary">CAIO SOBRINHO</span>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-mint-400">
                Fullstack Developer &amp; Projetista
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
