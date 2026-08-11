import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, BookOpen } from 'lucide-react';
import { CAREER_EXPERIENCES, MATERIAL_SKILLS } from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a história, trajetória profissional e a filosofia de trabalho de Caio Sobrinho.',
};

const TIMELINE_EVENTS = [
  {
    year: '2011',
    title: 'Base em Produção',
    description:
      'Início profissional na Munhoz Metalúrgica, desenvolvendo disciplina de produção, organização e trabalho em equipe.',
  },
  {
    year: '2013',
    title: 'Entrada nos Planejados',
    description:
      'Atuação na Linea Planejados e construção da base prática em materiais, montagem e acabamento.',
  },
  {
    year: '2015',
    title: 'Experiência Comercial',
    description:
      'Desenvolvimento de comunicação, negociação e atendimento consultivo como vendedor externo na Sky e na Vivo.',
  },
  {
    year: '2019',
    title: 'Especialização em Marcenaria',
    description:
      'Consolidação na Ark Móveis, Carnelian e Di Botelho com produção, interpretação e execução de móveis planejados.',
  },
  {
    year: 'Atual',
    title: 'Soluções Digitais & Projetos',
    description:
      'Aplicação da visão prática e sistêmica em desenvolvimento web, automações, interfaces e soluções digitais de ponta a ponta.',
  },
];

const VALUES = [
  {
    icon: Brain,
    title: 'Visão Sistêmica',
    description:
      'Enxergar o todo. Compreender como cada parte do projeto se conecta para criar um produto final coeso e de alta performance.',
  },
  {
    icon: Target,
    title: 'Excelência na Execução',
    description:
      'Atenção obsessiva aos detalhes. O rigor milimétrico da marcenaria aplicado à precisão do código limpo e pixel-perfect.',
  },
  {
    icon: BookOpen,
    title: 'Aprendizado Contínuo',
    description:
      'Adaptabilidade ativa. Aprendizado constante de novas tecnologias e metodologias para entregar sempre o melhor resultado possível.',
  },
];

const SKILLS = [
  { category: 'Desenvolvimento', items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Bubble.io', 'Tailwind CSS'] },
  { category: 'Projetos & Processos', items: ['Gestão Ágil', 'Mapeamento de Requisitos', 'Arquitetura de Dados', 'Automações No-Code'] },
  { category: 'Visual & Design', items: ['UI/UX Design', 'Figma', 'Identidade Visual', 'Edição de Vídeos', 'Motion Design'] },
  { category: 'Físico/Material', items: [...MATERIAL_SKILLS] },
];

export default function SobrePage() {
  return (
    <div className="py-16 md:py-24">
      {/* ── Hero Section ── */}
      <section className="px-6 max-w-7xl mx-auto text-center mb-24">
        <ScrollReveal>
          <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
            Minha História
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            Sobre <span className="text-gradient-gold">Mim</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Profissional multifuncional especializado em projetar e construir soluções robustas, tanto no ambiente físico quanto no digital.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Narrative section ── */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-text-primary uppercase tracking-wider border-l-2 border-gold-500 pl-4">
                A Jornada
              </h2>
            </ScrollReveal>
          </div>
          <div className="md:col-span-8 text-text-secondary space-y-6 text-base md:text-lg leading-relaxed">
            <ScrollReveal delay={0.1}>
              <p>
                Minha carreira começou em 2011 no mundo da produção e ganhou forma na <strong>Marcenaria Planejada</strong>. Passei por Linea Planejados, Ark Móveis, Carnelian e Di Botelho, construindo uma base sólida em materiais, montagem, acabamento e leitura de projetos.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                Entre essas etapas, a experiência comercial na Sky e na Vivo fortaleceu minha comunicação, negociação e entendimento das necessidades do cliente. Naturalmente, levei esse repertório para o design e para o <strong>Desenvolvimento Web Fullstack</strong>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p>
                Acredito que o verdadeiro valor de um profissional hoje é a sua <strong>versatilidade estratégica</strong>. Não me limito a programar ou desenhar; eu resolvo problemas sistêmicos. Estruturo processos, crio automações inteligentes que economizam tempo e programo plataformas escaláveis de alta performance.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Detailed professional experience ── */}
      <section className="px-6 max-w-6xl mx-auto mb-32">
        <div className="mb-14 md:flex md:items-end md:justify-between md:gap-12">
          <ScrollReveal>
            <div>
              <span className="mb-5 inline-flex rounded-full border border-border-gold bg-mint-500/8 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mint-400">
                Experiência
              </span>
              <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                Trajetória <span className="text-gradient-gold">profissional</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-text-muted md:mt-0 md:text-right">
              Uma carreira construída entre produção, atendimento, projetos e execução — experiências que hoje orientam cada solução digital.
            </p>
          </ScrollReveal>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {CAREER_EXPERIENCES.map((experience, index) => (
            <div key={`${experience.company}-${experience.period}`} className="grid gap-5 py-8 md:grid-cols-[11rem_1fr] md:gap-10">
              <ScrollReveal delay={index * 0.04}>
                <p className="font-display text-sm font-bold text-mint-400">{experience.period}</p>
              </ScrollReveal>
              <ScrollReveal delay={index * 0.04 + 0.04}>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-display text-xl font-bold text-text-primary">{experience.role}</h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">{experience.company}</p>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">{experience.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section className="px-6 py-20 bg-bg-secondary border-y border-border mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Linha do <span className="text-gradient-gold">Tempo</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-3 text-text-muted text-sm uppercase tracking-widest">
                Evolução profissional
              </p>
            </ScrollReveal>
          </div>

          <div className="relative border-l border-border-gold/30 ml-4 md:ml-32 space-y-12">
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={event.year} className="relative pl-8 md:pl-12">
                {/* Point marker */}
                <div className="absolute -left-[9px] top-1.5 size-4 rounded-full border border-gold-500 bg-bg-primary" />

                {/* Left Year Label on Desktop */}
                <div className="hidden md:block absolute -left-32 top-0 w-24 text-right">
                  <span className="font-display text-xl font-bold text-gold-500">
                    {event.year}
                  </span>
                </div>

                {/* Mobile Year Label */}
                <div className="block md:hidden mb-2">
                  <span className="font-display text-lg font-bold text-gold-500">
                    {event.year}
                  </span>
                </div>

                <ScrollReveal delay={index * 0.1}>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed max-w-2xl">
                    {event.description}
                  </p>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values / Philosophy Section ── */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Valores &amp; <span className="text-gradient-gold">Filosofia</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-3 text-text-muted text-sm uppercase tracking-widest">
              O que guia meu trabalho
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <ScrollReveal key={value.title} delay={index * 0.15}>
                <Card variant="glass" className="h-full p-8 flex flex-col items-center text-center">
                  <div className="size-12 rounded-full border border-border-gold bg-gold-500/5 flex items-center justify-center text-gold-400 mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── Skills Matrix Section ── */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Matriz de <span className="text-gradient-gold">Habilidades</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-3 text-text-muted text-sm uppercase tracking-widest">
              Principais tecnologias e competências
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skillGroup, index) => (
            <ScrollReveal key={skillGroup.category} delay={index * 0.1}>
              <Card variant="default" className="p-6 h-full flex flex-col">
                <h3 className="font-display text-base font-bold text-gold-400 border-b border-border pb-3 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
