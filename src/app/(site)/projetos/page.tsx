'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Star, Calendar, ArrowRight, Grid3x3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { formatDateShort } from '@/lib/utils';

// Hardcoded categories matching database seeds
const CATEGORIES = [
  { id: 'all', name: 'Todos', slug: 'todos' },
  { id: 'web-design', name: 'Web Design', slug: 'web-design' },
  { id: 'sistemas', name: 'Sistemas', slug: 'sistemas' },
  { id: 'dashboards', name: 'Dashboards', slug: 'dashboards' },
  { id: 'bubble', name: 'Bubble.io', slug: 'bubble' },
  { id: 'marcenaria', name: 'Marcenaria', slug: 'marcenaria' },
  { id: 'design', name: 'Design', slug: 'design' },
  { id: 'video', name: 'Edição de Vídeo', slug: 'video' },
  { id: 'automacoes', name: 'Automações', slug: 'automacoes' },
] as const;

// Hardcoded projects matching database seeds
const PROJECTS = [
  {
    title: 'Dashboard Financeiro Corporativo',
    slug: 'dashboard-financeiro-corporativo',
    short_description: 'Painel completo de gestão financeira com indicadores em tempo real para empresa do setor industrial.',
    category_id: 'dashboards',
    category_name: 'Dashboards Empresariais',
    tags: ['Dashboard', 'Finanças', 'BI', 'Corporativo'],
    technologies: ['React', 'Next.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
    is_featured: true,
    is_highlighted: true,
    project_date: '2025-03-15',
    bg_gradient: 'from-amber-600/20 to-yellow-900/10',
  },
  {
    title: 'Sistema de Gestão de Pedidos',
    slug: 'sistema-gestao-pedidos',
    short_description: 'Sistema completo para gestão de pedidos, estoque e clientes para comércio local.',
    category_id: 'sistemas',
    category_name: 'Desenvolvimento de Sistemas',
    tags: ['Sistema', 'Gestão', 'ERP', 'Comércio'],
    technologies: ['Bubble.io', 'Airtable', 'Zapier', 'Stripe'],
    is_featured: true,
    is_highlighted: true,
    project_date: '2025-01-20',
    bg_gradient: 'from-blue-600/20 to-indigo-900/10',
  },
  {
    title: 'Landing Page Studio de Arquitetura',
    slug: 'landing-page-studio-arquitetura',
    short_description: 'Website premium para studio de arquitetura com galeria de projetos e formulário de contato.',
    category_id: 'web-design',
    category_name: 'Web Design',
    tags: ['Landing Page', 'Arquitetura', 'Design', 'Premium'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    is_featured: true,
    is_highlighted: false,
    project_date: '2024-11-10',
    bg_gradient: 'from-purple-600/20 to-pink-900/10',
  },
  {
    title: 'Cozinha Planejada Residencial',
    slug: 'cozinha-planejada-residential',
    short_description: 'Projeto completo de cozinha planejada com ilha central e acabamento em laca.',
    category_id: 'marcenaria',
    category_name: 'Marcenaria Planejada',
    tags: ['Marcenaria', 'Cozinha', 'Residencial', 'Alto Padrão'],
    technologies: ['SketchUp', 'Promob', 'MDF', 'Laca'],
    is_featured: true,
    is_highlighted: false,
    project_date: '2024-08-05',
    bg_gradient: 'from-emerald-600/20 to-teal-900/10',
  },
  {
    title: 'Automação de Marketing Digital',
    slug: 'automacao-marketing-digital',
    short_description: 'Sistema automatizado de email marketing com segmentação e triggers comportamentais.',
    category_id: 'automacoes',
    category_name: 'Automações',
    tags: ['Automação', 'Marketing', 'Email', 'CRM'],
    technologies: ['n8n', 'Mailchimp', 'HubSpot', 'Zapier'],
    is_featured: false,
    is_highlighted: false,
    project_date: '2024-06-20',
    bg_gradient: 'from-rose-600/20 to-red-900/10',
  },
  {
    title: 'Identidade Visual Startup Tech',
    slug: 'identidade-visual-startup-tech',
    short_description: 'Branding completo para startup de tecnologia — do logo ao manual da marca.',
    category_id: 'design',
    category_name: 'Design',
    tags: ['Branding', 'Logo', 'Startup', 'Tech'],
    technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
    is_featured: false,
    is_highlighted: false,
    project_date: '2024-04-12',
    bg_gradient: 'from-cyan-600/20 to-teal-900/10',
  },
];

export default function ProjetosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter projects based on query and category
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category_id === selectedCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-gold-400 bg-gold-500/8 border border-border-gold rounded-full">
            Portfólio de Entrega
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            Explorar <span className="text-gradient-gold">Projetos</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Uma seleção de sistemas web, automações e projetos sob medida desenvolvidos com foco em performance e impacto.
          </p>
        </ScrollReveal>
      </div>

      {/* ── Filters and Search ── */}
      <div className="space-y-8 mb-12">
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-text-subtle" />
              <input
                type="text"
                placeholder="Buscar por título, tecnologia ou tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border focus:border-gold-500 rounded-[var(--radius-card)] text-sm text-text-primary placeholder:text-text-subtle outline-none transition-colors"
              />
            </div>

            {/* Total count badge */}
            <div className="text-xs text-text-muted font-medium flex items-center gap-2">
              <Grid3x3 className="size-3.5 text-gold-500" />
              <span>
                {filteredProjects.length}{' '}
                {filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category horizontal scrolls */}
        <ScrollReveal delay={0.35}>
          <div className="overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide flex gap-2 md:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold tracking-wide border whitespace-nowrap transition-all duration-300
                  ${
                    selectedCategory === cat.id
                      ? 'bg-gold-500 border-gold-500 text-bg-primary font-bold shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                      : 'bg-bg-secondary border-border text-text-muted hover:text-text-primary hover:border-border-gold/30'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* ── Projects Grid ── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card
                variant="glass"
                className="flex flex-col h-full overflow-hidden hover:border-border-gold transition-all duration-300 group hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]"
              >
                {/* Thumbnail / Gradient Area */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.bg_gradient} flex items-center justify-center p-6 text-center select-none`}>
                    <span className="font-display font-bold text-lg md:text-xl text-text-primary opacity-80 group-hover:scale-105 transition-transform duration-500">
                      {project.title}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="outline" className="bg-bg-primary/80 backdrop-blur-md">
                      {project.category_name}
                    </Badge>
                  </div>

                  {project.is_featured && (
                    <div className="absolute top-4 right-4 size-8 rounded-full bg-gold-500/10 backdrop-blur-md border border-gold-500/40 flex items-center justify-center text-gold-400" title="Destaque">
                      <Star className="size-4 fill-gold-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-text-subtle mb-3">
                    <Calendar className="size-3.5" />
                    <span>{formatDateShort(project.project_date)}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-gold-400 transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                    {project.short_description}
                  </p>

                  <div className="space-y-4 mt-auto">
                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-bg-secondary text-text-muted border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-bg-secondary text-text-subtle border border-border">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/projetos/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 group/btn transition-colors border-t border-border pt-4 w-full"
                    >
                      Ver Detalhes do Projeto
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="text-text-muted text-lg">Nenhum projeto encontrado para os critérios de busca.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-sm font-bold text-gold-400 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
