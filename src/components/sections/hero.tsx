'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Settings, Database } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 lg:pt-20"
      aria-label="Apresentação inicial"
    >
      {/* Background partition (dark and subtle green lights) */}
      <div className="absolute inset-0 -z-20 bg-bg-primary" aria-hidden="true" />
      
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

          {/* Portrait Mask/Graphic Box */}
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-mint-400/20 bg-bg-card shadow-[0_0_50px_rgba(16,185,129,0.06)] group hover:border-mint-400/40 transition-all duration-500">
            {/* Portrait inner background */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-card to-bg-secondary -z-10" />
            
            {/* Split backdrop accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-mint-500/10 -z-10" />

            {/* Custom vector silhouette mockup representing professional */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 select-none pointer-events-none text-center">
              <div className="size-20 rounded-full bg-mint-500/10 border border-mint-500/20 flex items-center justify-center text-mint-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Database className="size-10" />
              </div>
              <span className="font-display font-bold text-lg text-text-primary tracking-wide">
                CAIO SOBRINHO
              </span>
              <p className="text-[10px] text-mint-400 font-bold uppercase tracking-wider mt-1">
                Fullstack Developer &amp; Project Manager
              </p>
              
              <div className="flex gap-2.5 mt-8 opacity-40 group-hover:opacity-65 transition-opacity">
                <div className="size-8 rounded-lg bg-bg-secondary border border-border flex items-center justify-center text-text-muted">
                  <Terminal className="size-4" />
                </div>
                <div className="size-8 rounded-lg bg-bg-secondary border border-border flex items-center justify-center text-text-muted">
                  <Settings className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
