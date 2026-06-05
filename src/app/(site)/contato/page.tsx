'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Phone, Mail, Clock, ShieldCheck, MessageCircle, Send } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { contactFormSchema } from '@/lib/validations';
import { submitContactForm } from '@/app/actions/contact';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export default function ContatoPage() {
  const whatsappUrl = getWhatsAppUrl(
    SITE.whatsapp,
    'Olá Caio! Acessei o seu site e gostaria de solicitar um orçamento.'
  );

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setServerError('');
    setSuccess(false);

    // Validate fields client-side
    const validation = contactFormSchema.safeParse({
      name,
      email,
      subject,
      message,
      website,
    });

    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((err: any) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    // Call server action
    try {
      const response = await submitContactForm(validation.data);
      if (response.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setServerError(response.error || 'Ocorreu um erro ao enviar.');
      }
    } catch (err) {
      setServerError('Erro de conexão com o servidor. Verifique sua rede e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div className="text-center mb-16 md:mb-24">
        <ScrollReveal>
          <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
            Contato Directo
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            Vamos <span className="text-gradient-gold">Conversar</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Dúvidas, orçamentos, parcerias ou ideias de projetos. Escolha o canal mais adequado para você.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* ── Left Column: Contact details ── */}
        <div className="lg:col-span-5 space-y-8">
          <ScrollReveal direction="left">
            <div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                Informações de Contato
              </h2>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                Sinta-se à vontade para enviar um email direto ou entrar em contato pelo WhatsApp para um atendimento mais dinâmico.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.1}>
            <div className="space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-bg-secondary hover:bg-bg-hover border border-border hover:border-border-gold/50 rounded-[var(--radius-card)] transition-all duration-300 group"
              >
                <div className="size-12 rounded-full border border-border-gold bg-gold-500/5 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-text-subtle font-medium uppercase tracking-wider">
                    WhatsApp Comercial
                  </p>
                  <p className="text-sm font-semibold text-text-primary mt-1">
                    (17) 99744-8213
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 p-5 bg-bg-secondary hover:bg-bg-hover border border-border hover:border-border-gold/50 rounded-[var(--radius-card)] transition-all duration-300 group"
              >
                <div className="size-12 rounded-full border border-border-gold bg-gold-500/5 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-text-subtle font-medium uppercase tracking-wider">
                    Email Directo
                  </p>
                  <p className="text-sm font-semibold text-text-primary mt-1">
                    {SITE.email}
                  </p>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Quick info cards */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="default" className="p-6">
                <Clock className="size-5 text-gold-500 mb-3" />
                <h3 className="font-display text-sm font-bold text-text-primary mb-1">
                  Resposta Rápida
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  Retorno garantido em até 24 horas úteis para todas as mensagens.
                </p>
              </Card>

              <Card variant="default" className="p-6">
                <ShieldCheck className="size-5 text-gold-500 mb-3" />
                <h3 className="font-display text-sm font-bold text-text-primary mb-1">
                  Orçamento Livre
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  Análise de viabilidade e orçamento inicial sem compromisso financeiro.
                </p>
              </Card>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Right Column: Contact form ── */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="right" delay={0.15}>
            <Card variant="glass" className="p-8 md:p-10 border-border-gold/20">
              <h2 className="font-display text-xl font-bold text-text-primary mb-6">
                Envie uma mensagem
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-[var(--radius-card)] text-sm leading-relaxed">
                  Sua mensagem foi enviada com sucesso! Agradecemos o contato e responderemos em breve.
                </div>
              )}

              {serverError && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-[var(--radius-card)] text-sm leading-relaxed">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden for spam prevention) */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Seu Nome *"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    placeholder="Como gostaria de ser chamado"
                    required
                  />

                  <Input
                    label="Seu Email *"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>

                <Input
                  label="Assunto (Opcional)"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  error={errors.subject}
                  placeholder="Ex: Orçamento de Sistema Web"
                />

                <Textarea
                  label="Mensagem *"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={errors.message}
                  placeholder="Descreva brevemente o seu projeto ou necessidade..."
                  rows={5}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="size-4" />
                  Enviar Mensagem
                </Button>
              </form>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
