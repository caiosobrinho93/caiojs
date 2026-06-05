'use client';

import {
  Palette,
  Code,
  BarChart3,
  Workflow,
  Hammer,
  Figma,
  Video,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/section-header';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import {
  StaggerChildren,
  StaggerItem,
} from '@/components/animations/stagger-children';

interface AreaItem {
  icon: LucideIcon;
  name: string;
  description: string;
  badge?: string;
}

const AREAS: AreaItem[] = [
  {
    icon: Palette,
    name: 'Web Design',
    description:
      'Interfaces modernas, responsivas e focadas em experiência do usuário.',
  },
  {
    icon: Code,
    name: 'Desenvolvimento de Sistemas',
    description:
      'Aplicações web robustas com tecnologias modernas e código de qualidade.',
    badge: 'Principal',
  },
  {
    icon: BarChart3,
    name: 'Dashboards Empresariais',
    description:
      'Painéis de controle inteligentes para tomada de decisão baseada em dados.',
  },
  {
    icon: Workflow,
    name: 'Bubble.io',
    description:
      'Desenvolvimento no-code para MVPs e aplicações rápidas com visual profissional.',
  },
  {
    icon: Hammer,
    name: 'Marcenaria Planejada',
    description:
      'Projetos sob medida com 8 anos de experiência em planejamento e execução.',
  },
  {
    icon: Figma,
    name: 'Design',
    description:
      'Identidade visual, prototipação e criação de interfaces com precisão e estilo.',
  },
  {
    icon: Video,
    name: 'Edição de Vídeo',
    description:
      'Produção e edição de conteúdo audiovisual com narrativa impactante.',
  },
  {
    icon: Zap,
    name: 'Automações',
    description:
      'Fluxos automatizados que eliminam trabalho repetitivo e aumentam a eficiência.',
  },
];

function AreaCard({ area }: { area: AreaItem }) {
  const Icon = area.icon;

  return (
    <Card variant="glass" className="group relative h-full">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-badge)] bg-gold-500/10 border border-border-gold/30 transition-all duration-300 group-hover:bg-gold-500/15 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.12)]">
            <Icon className="size-5 text-gold-400" />
          </div>
          {area.badge && (
            <Badge variant="default" className="text-[10px]">
              {area.badge}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-semibold text-text-primary tracking-tight">
          {area.name}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed">
          {area.description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Areas() {
  return (
    <section className="py-24 lg:py-32 px-6" aria-label="Áreas de atuação">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            badge="Expertise"
            title="Áreas de Atuação"
            subtitle="Competências diversas unidas por uma mentalidade de excelência e resolução de problemas."
          />
        </ScrollReveal>

        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          staggerDelay={0.08}
        >
          {AREAS.map((area) => (
            <StaggerItem key={area.name}>
              <AreaCard area={area} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
