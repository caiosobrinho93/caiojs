'use client';

import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { MessageCircle, Mail } from 'lucide-react';
import { SITE } from '@/lib/constants';

export default function CTA() {
  const whatsappUrl = getWhatsAppUrl(
    SITE.whatsapp,
    'Olá Caio! Acessei o seu site e gostaria de conversar sobre um projeto.'
  );

  return (
    <section
      className="py-24 lg:py-32 px-6 relative overflow-hidden"
      aria-label="Chamada para ação"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.02) 50%, transparent 80%)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="relative p-12 md:p-16 lg:p-20 bg-bg-secondary border border-border-gold/30 rounded-[var(--radius-card)] text-center overflow-hidden group hover:border-border-gold/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.06)]">
            {/* Subtle light reflection sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
                Vamos Conversar?
              </span>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Pronto para transformar sua{' '}
                <span className="text-gradient-gold">ideia em realidade?</span>
              </h2>

              <p className="mt-6 text-text-muted text-base md:text-lg leading-relaxed">
                Seja para criar um sistema web de alto nível, automatizar processos da sua empresa,
                ou desenvolver um projeto especial — estou pronto para ajudar.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  size="lg"
                  href={whatsappUrl}
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-5" />
                  Conversar no WhatsApp
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/contato"
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Mail className="size-5" />
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
