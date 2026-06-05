import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, BarChart3, Zap, Hammer, Palette, Workflow, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { SITE, PROCESS_STEPS } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Explore os serviços oferecidos por Caio Sobrinho: Desenvolvimento Web, Dashboards, Automações, Marcenaria Planejada, Design e mais.',
};

const SERVICES = [
  {
    title: 'Web Design & Desenvolvimento',
    description:
      'Criação de sites e sistemas web modernos, performáticos e otimizados para resultados.',
    icon: Globe,
    features: [
      'Landing Pages Premium',
      'Sistemas Web Completos',
      'Plataformas E-commerce',
      'Otimização SEO Avançada',
      'Design Responsivo & Fluído',
    ],
  },
  {
    title: 'Dashboards & BI',
    description:
      'Painéis inteligentes para transformar dados brutos em decisões estratégicas para o seu negócio.',
    icon: BarChart3,
    features: [
      'Visualização de Dados Dinâmica',
      'Indicadores (KPIs) em Tempo Real',
      'Relatórios Gerenciais Automatizados',
      'Integração com Diversas APIs',
      'Alertas Inteligentes de Metas',
    ],
  },
  {
    title: 'Automação de Processos',
    description:
      'Eliminação de trabalho manual repetitivo através de automações inteligentes e integrações de sistemas.',
    icon: Zap,
    features: [
      'Workflows Completamente Automatizados',
      'Integrações de Sistemas (APIs)',
      'Chatbots de Atendimento Inteligente',
      'Fluxos de Email Marketing Automáticos',
      'Integração de CRMs e Planilhas',
    ],
  },
  {
    title: 'Marcenaria Planejada',
    description:
      'Projetos completos de marcenaria sob medida — do desenho técnico à instalação final.',
    icon: Hammer,
    features: [
      'Projetos Físicos Sob Medida',
      'Modelagem 3D & Renderização',
      'Cozinhas Planejadas Modernas',
      'Closets Otimizados',
      'Móveis Corporativos Planejados',
    ],
  },
  {
    title: 'Design & Branding',
    description:
      'Identidade visual completa e peças de design que comunicam profissionalismo, autoridade e confiança.',
    icon: Palette,
    features: [
      'Identidade Visual de Marca',
      'Design de Logotipo Premium',
      'Apresentações e Materiais Gráficos',
      'Templates Criativos para Social Media',
      'Materiais de Lançamento Digital',
    ],
  },
  {
    title: 'Soluções No-Code',
    description:
      'Desenvolvimento ágil de MVPs e sistemas robustos usando plataformas líderes como Bubble.io.',
    icon: Workflow,
    features: [
      'Criação Rápida de MVPs',
      'Desenvolvimento em Bubble.io',
      'Prototipagem de Interfaces Funcionais',
      'Validação de Ideias de Negócio',
      'Aplicações Web Customizadas',
    ],
  },
];


export default function ServicosPage() {
  const whatsappUrl = getWhatsAppUrl(
    SITE.whatsapp,
    'Olá Caio! Acessei a página de serviços e gostaria de solicitar um orçamento.'
  );

  return (
    <div className="py-16 md:py-24">
      {/* ── Hero ── */}
      <section className="px-6 max-w-7xl mx-auto text-center mb-24">
        <ScrollReveal>
          <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
            Nossas Soluções
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            Serviços &amp; <span className="text-gradient-gold">Especialidades</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Soluções completas desenhadas sob medida para otimizar processos, criar marcas de autoridade e escalar produtos.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Services Grid ── */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.08}>
                <Card
                  variant="glass"
                  className="p-8 h-full flex flex-col hover:border-border-gold transition-all duration-300 group hover:shadow-[0_0_30px_rgba(212,175,55,0.04)]"
                >
                  <div className="size-12 rounded-full border border-border-gold bg-gold-500/5 flex items-center justify-center text-gold-400 mb-6 group-hover:bg-gold-500/10 transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-2 border-t border-border pt-6 mt-auto">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <Check className="size-3.5 text-gold-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── Process/Methodology Section ── */}
      <section className="px-6 py-20 bg-bg-secondary border-y border-border mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                O Processo de <span className="text-gradient-gold">Entrega</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-3 text-text-muted text-sm uppercase tracking-widest">
                Garantia de qualidade em cada etapa
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              // Map icons dynamically
              let StepIcon = Globe;
              if (step.icon === 'Layers') StepIcon = BarChart3;
              else if (step.icon === 'Code') StepIcon = Zap;
              else if (step.icon === 'Settings') StepIcon = Hammer;
              else if (step.icon === 'Rocket') StepIcon = Workflow;

              return (
                <ScrollReveal key={step.step} delay={index * 0.1}>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left relative">
                    <div className="size-10 rounded-full border border-border-gold bg-bg-primary text-gold-400 flex items-center justify-center font-display font-semibold mb-4 text-sm">
                      {step.step}
                    </div>
                    <h3 className="font-display text-base font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed max-w-xs md:max-w-none">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <div className="p-10 md:p-16 border border-border-gold/30 rounded-[var(--radius-card)] bg-bg-secondary hover:border-border-gold/60 transition-all duration-300">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Vamos trabalhar <span className="text-gradient-gold">juntos?</span>
            </h2>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto mb-8">
              Entre em contato para discutir as necessidades do seu projeto e receber um planejamento sob medida, sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="md"
                href={whatsappUrl}
                className="w-full sm:w-auto flex items-center gap-2 justify-center"
              >
                <MessageCircle className="size-4" />
                Falar no WhatsApp
              </Button>
              <Button
                variant="secondary"
                size="md"
                href="/contato"
                className="w-full sm:w-auto flex items-center gap-2 justify-center"
              >
                <span>Enviar Email</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
