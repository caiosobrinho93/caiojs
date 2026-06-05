'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Hammer, Briefcase, Calendar, Phone } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getWhatsAppUrl } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export default function AboutPreview() {
  const whatsappUrl = getWhatsAppUrl(
    SITE.whatsapp,
    'Olá Caio! Acessei o seu site e gostaria de conversar sobre um projeto.'
  );

  return (
    <section
      className="py-24 lg:py-32 px-6 bg-bg-secondary/40 border-y border-border"
      aria-label="Sobre Caio Sobrinho"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* ── Left Column: Circular Avatar & Floating Stats ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            {/* Abstract green circle backdrop */}
            <div 
              className="absolute size-64 sm:size-80 rounded-full border border-mint-500/20 bg-mint-500/5 -z-10" 
              aria-hidden="true"
            />
            
            {/* Professional profile avatar card */}
            <div className="relative size-48 sm:size-56 rounded-full border-2 border-mint-500 bg-bg-card flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              {/* Silhouette Vector avatar */}
              <div className="flex flex-col items-center text-center p-4">
                <Briefcase className="size-12 text-mint-400 mb-2" />
                <span className="font-display font-bold text-sm text-text-primary">CAIO</span>
              </div>
            </div>

            {/* Floating Stat 1: Marcenaria */}
            <div className="absolute top-[10%] right-[5%] sm:right-[10%] bg-bg-card/90 backdrop-blur border border-border hover:border-mint-500/40 px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors shadow-lg shadow-black/40">
              <div className="size-8 rounded-lg bg-mint-500/10 flex items-center justify-center text-mint-400">
                <Hammer className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">8+ Anos</p>
                <p className="text-[9px] text-text-muted font-medium uppercase tracking-wider">Marcenaria</p>
              </div>
            </div>

            {/* Floating Stat 2: Projetos */}
            <div className="absolute bottom-[10%] left-[5%] sm:left-[10%] bg-bg-card/90 backdrop-blur border border-border hover:border-mint-500/40 px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors shadow-lg shadow-black/40">
              <div className="size-8 rounded-lg bg-mint-500/10 flex items-center justify-center text-mint-400">
                <Briefcase className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">50+ Entregas</p>
                <p className="text-[9px] text-text-muted font-medium uppercase tracking-wider">Projetos Ativos</p>
              </div>
            </div>

            {/* Floating Stat 3: Gestão */}
            <div className="absolute bottom-[40%] right-[0%] bg-bg-card/90 backdrop-blur border border-border hover:border-mint-500/40 px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors shadow-lg shadow-black/40">
              <div className="size-8 rounded-lg bg-mint-500/10 flex items-center justify-center text-mint-400">
                <Calendar className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">6+ Anos</p>
                <p className="text-[9px] text-text-muted font-medium uppercase tracking-wider">Gestão Projetos</p>
              </div>
            </div>
          </div>

          {/* ── Right Column: Text content ── */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-mint-400 bg-mint-500/8 border border-border-gold rounded-full">
                Quem Sou Eu
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Sobre <span className="text-gradient-gold">Mim</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-text-secondary text-sm md:text-base leading-relaxed">
                Sou um profissional multifuncional que atua na intersecção entre design digital, tecnologia web e gestão. Com 8 anos de experiência consolidada em marcenaria planejada física e 6 anos coordenando projetos, trago a mentalidade de precisão milimétrica e planejamento rigoroso para o ambiente de software.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-4 text-text-muted text-xs md:text-sm leading-relaxed">
                Desenvolvo sistemas de alta performance, painéis dinâmicos e fluxos automatizados inteligentes focados no resultado real do negócio. Meu compromisso é alinhar design polido e código limpo para entregar produtos que resolvem problemas com excelência de ponta a ponta.
              </p>
            </ScrollReveal>

            {/* Buttons row */}
            <ScrollReveal delay={0.2}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="md"
                  href={whatsappUrl}
                  className="flex items-center gap-2 justify-center"
                >
                  <Phone className="size-4" />
                  Falar Comigo
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href="/sobre"
                  className="flex items-center gap-2 justify-center"
                >
                  <span>Conhecer Trajetória</span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
