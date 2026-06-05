import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag, ExternalLink, Award, BookOpen, Share2 } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { formatDate } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PROJECTS_DATA = [
  {
    title: 'Dashboard Financeiro Corporativo',
    slug: 'dashboard-financeiro-corporativo',
    short_description: 'Painel completo de gestão financeira com indicadores em tempo real para empresa do setor industrial.',
    full_description: 'Desenvolvimento de um dashboard financeiro completo para uma empresa do setor industrial, com visualização de KPIs em tempo real, relatórios automatizados e alertas de performance. O sistema integra dados de múltiplas fontes e apresenta informações estratégicas de forma clara e acionável. Conta com filtros dinâmicos de período, exportação de relatórios em PDF/CSV e gráficos interativos para acompanhamento de margem de lucro, custos operacionais e fluxo de caixa.',
    category_id: 'dashboards',
    category_name: 'Dashboards Empresariais',
    tags: ['Dashboard', 'Finanças', 'BI', 'Corporativo'],
    technologies: ['React', 'Next.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
    is_featured: true,
    is_highlighted: true,
    project_date: '2025-03-15',
    results: 'Redução de 75% no tempo gasto na consolidação de dados financeiros mensais da empresa. Aumento na velocidade e agilidade das tomadas de decisão críticas por parte da diretoria através de relatórios automáticos.',
    learnings: 'A otimização de consultas no PostgreSQL utilizando índices compostos e materialização de views foi crucial para manter a performance sob alto volume de dados transacionais.',
    bg_gradient: 'from-amber-600/20 to-yellow-900/10',
    external_url: 'https://exemplo.com/financeiro',
  },
  {
    title: 'Sistema de Gestão de Pedidos',
    slug: 'sistema-gestao-pedidos',
    short_description: 'Sistema completo para gestão de pedidos, estoque e clientes para comércio local.',
    full_description: 'Sistema web responsivo para gestão integral de um comércio local, incluindo módulos de pedidos, controle de estoque, cadastro de clientes e relatórios de vendas. Interface intuitiva que permitiu automação do checkout e controle de estoque de forma integrada. A solução reduziu consideravelmente falhas operacionais e acelerou o faturamento diário.',
    category_id: 'sistemas',
    category_name: 'Desenvolvimento de Sistemas',
    tags: ['Sistema', 'Gestão', 'ERP', 'Comércio'],
    technologies: ['Bubble.io', 'Airtable', 'Zapier', 'Stripe'],
    is_featured: true,
    is_highlighted: true,
    project_date: '2025-01-20',
    results: 'Redução de 40% no tempo de processamento de pedidos. Acurácia de estoque elevada para 98.5% com alertas em tempo real de itens críticos.',
    learnings: 'Mapeamento de processos operacionais com os usuários finais antes de programar a interface reduziu em 90% a resistência ao novo sistema.',
    bg_gradient: 'from-blue-600/20 to-indigo-900/10',
    external_url: 'https://exemplo.com/pedidos',
  },
  {
    title: 'Landing Page Studio de Arquitetura',
    slug: 'landing-page-studio-arquitetura',
    short_description: 'Website premium para studio de arquitetura com galeria de projetos e formulário de contato.',
    full_description: 'Criação de uma landing page premium para um studio de arquitetura, focada em transmitir sofisticação e profissionalismo. Desenvolvida sob o conceito de design minimalista, valoriza imagens de alta resolução dos projetos realizados. Contém galeria com visualizador de mídia otimizado, formulário de contato integrado e performance web perfeita para atração de leads qualificados.',
    category_id: 'web-design',
    category_name: 'Web Design',
    tags: ['Landing Page', 'Arquitetura', 'Design', 'Premium'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    is_featured: true,
    is_highlighted: false,
    project_date: '2024-11-10',
    results: 'Geração de 35% mais contatos qualificados no primeiro mês de funcionamento. Lighthouse Score de 98% em performance e acessibilidade.',
    learnings: 'Uso de otimização de imagens com next/image e lazy loading para as fotos pesadas de arquitetura mantiveram o carregamento instantâneo do site.',
    bg_gradient: 'from-purple-600/20 to-pink-900/10',
    external_url: 'https://exemplo.com/arquitetura',
  },
  {
    title: 'Cozinha Planejada Residencial',
    slug: 'cozinha-planejada-residencial',
    short_description: 'Projeto completo de cozinha planejada com ilha central e acabamento em laca.',
    full_description: 'Projeto e execução de cozinha planejada de alto padrão para residência. Incluiu toda a modelagem 3D dos ambientes, planejamento ergonômico, detalhamento de pontos de eletricidade/hidráulica, escolha de acabamentos em laca acetinada branca e detalhes em madeira maciça freijó. A execução aliou durabilidade de ferragens importadas ao design minimalista contemporâneo.',
    category_id: 'marcenaria',
    category_name: 'Marcenaria Planejada',
    tags: ['Marcenaria', 'Cozinha', 'Residencial', 'Alto Padrão'],
    technologies: ['SketchUp', 'Promob', 'MDF', 'Laca'],
    is_featured: true,
    is_highlighted: false,
    project_date: '2024-08-05',
    results: 'Aproveitamento de 100% dos espaços disponíveis seguindo rigorosamente a tolerância milimétrica exigida pela marcenaria de alto nível. Cliente extremamente satisfeito com a ergonomia.',
    learnings: 'A modelagem detalhada em 3D antes de cortar os materiais evitou desperdícios e permitiu que a cliente visualizasse perfeitamente a disposição final antes da montagem.',
    bg_gradient: 'from-emerald-600/20 to-teal-900/10',
    external_url: '',
  },
  {
    title: 'Automação de Marketing Digital',
    slug: 'automacao-marketing-digital',
    short_description: 'Sistema automatizado de email marketing com segmentação e triggers comportamentais.',
    full_description: 'Estruturação e automação de funil de vendas digital completo. Inclui integração entre formulários do site, CRM de vendas e plataforma de disparo de email. Foram configurados gatilhos com base no comportamento do lead, como downloads de materiais, visitas a páginas específicas de serviços e preenchimento de contatos.',
    category_id: 'automacoes',
    category_name: 'Automações',
    tags: ['Automação', 'Marketing', 'Email', 'CRM'],
    technologies: ['n8n', 'Mailchimp', 'HubSpot', 'Zapier'],
    is_featured: false,
    is_highlighted: false,
    project_date: '2024-06-20',
    results: 'Aumento de 65% na conversão de leads frios em oportunidades reais de vendas. Redução de 95% no trabalho de repasse de leads aos vendedores.',
    learnings: 'Automatizar sem segmentar diminui o engajamento. A criação de réguas de relacionamento altamente focadas foi o fator chave para o sucesso.',
    bg_gradient: 'from-rose-600/20 to-red-900/10',
    external_url: '',
  },
  {
    title: 'Identidade Visual Startup Tech',
    slug: 'identidade-visual-startup-tech',
    short_description: 'Branding completo para startup de tecnologia — do logo ao manual da marca.',
    full_description: 'Desenvolvimento estratégico de identidade de marca para startup do setor de inteligência artificial. O escopo envolveu estudo de posicionamento, criação de logotipo moderno, definição de paleta cromática de alta energia, manual completo da marca e assets digitais para site, redes sociais e apresentações executivas.',
    category_id: 'design',
    category_name: 'Design',
    tags: ['Branding', 'Logo', 'Startup', 'Tech'],
    technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
    is_featured: false,
    is_highlighted: false,
    project_date: '2024-04-12',
    results: 'Marca pronta e uniforme aplicada em todos os pontos de contato da startup, facilitando captação de investimento inicial com material de posicionamento forte.',
    learnings: 'A tipografia correta e o estudo minucioso de contraste são mais importantes para a legibilidade de marcas digitais do que símbolos excessivamente complexos.',
    bg_gradient: 'from-cyan-600/20 to-teal-900/10',
    external_url: '',
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug || p.slug === slug.replace('-residential', '-residencial'));
  
  if (!project) {
    return {
      title: 'Projeto Não Encontrado',
    };
  }

  return {
    title: project.title,
    description: project.short_description,
  };
}

export default async function ProjetoPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Normalize slug in case of residential typo
  const normalizedSlug = slug === 'cozinha-planejada-residencial' ? 'cozinha-planejada-residencial' : (slug === 'cozinha-planejada-residential' ? 'cozinha-planejada-residencial' : slug);
  const project = PROJECTS_DATA.find((p) => p.slug === normalizedSlug);

  if (!project) {
    notFound();
  }

  // Related projects in the same category
  const relatedProjects = PROJECTS_DATA.filter(
    (p) => p.category_id === project.category_id && p.slug !== project.slug
  );

  return (
    <div className="py-12 md:py-20 px-6 max-w-5xl mx-auto">
      {/* ── Back button ── */}
      <div className="mb-8">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar para Projetos
        </Link>
      </div>

      {/* ── Project Header ── */}
      <section className="mb-12">
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="default">{project.category_name}</Badge>
            {project.is_featured && <Badge variant="outline">Projeto Destaque</Badge>}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
            {project.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex items-center gap-6 text-xs text-text-muted border-y border-border py-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-gold-500" />
              <span>Conclusão: {formatDate(project.project_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-gold-500" />
              <span>Tags: {project.tags.join(', ')}</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Image Gallery area (Placeholder) ── */}
      <ScrollReveal delay={0.2}>
        <div className={`w-full aspect-video rounded-[var(--radius-card)] bg-gradient-to-br ${project.bg_gradient} border border-border flex items-center justify-center p-8 mb-12`}>
          <div className="text-center">
            <span className="font-display font-bold text-2xl md:text-3xl text-text-primary opacity-60">
              {project.title}
            </span>
            <p className="text-xs text-text-muted mt-2">Visualizador de Imagem Principal</p>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Project Details ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div className="lg:col-span-8 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-xl font-bold text-text-primary mb-4 border-b border-border pb-2">
              Descrição do Projeto
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {project.full_description}
            </p>
          </ScrollReveal>

          {project.results && (
            <ScrollReveal>
              <Card variant="glass" className="p-6 border-l-2 border-l-gold-500">
                <div className="flex items-start gap-4">
                  <Award className="size-6 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-base font-bold text-text-primary mb-2">
                      Resultados Obtidos
                    </h3>
                    <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                      {project.results}
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          )}

          {project.learnings && (
            <ScrollReveal>
              <Card variant="default" className="p-6 border-l-2 border-l-border">
                <div className="flex items-start gap-4">
                  <BookOpen className="size-6 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-base font-bold text-text-primary mb-2">
                      Principais Aprendizados
                    </h3>
                    <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                      {project.learnings}
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          )}
        </div>

        {/* Sidebar specs */}
        <div className="lg:col-span-4 space-y-6">
          <ScrollReveal delay={0.1}>
            <Card variant="default" className="p-6">
              <h3 className="font-display text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">
                Especificações
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-text-subtle uppercase font-semibold">Tecnologias Utilizadas</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.external_url && (
                  <div className="border-t border-border pt-4 mt-4">
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.external_url}
                      className="w-full flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Visualizar Projeto</span>
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-border pt-16 mt-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center md:text-left">
              Projetos <span className="text-gradient-gold">Relacionados</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.slice(0, 2).map((rel) => (
              <ScrollReveal key={rel.slug}>
                <Card variant="glass" className="overflow-hidden h-full flex flex-col group hover:border-border-gold transition-all duration-300">
                  <div className={`aspect-video w-full bg-gradient-to-br ${rel.bg_gradient} flex items-center justify-center p-4`}>
                    <span className="font-display font-semibold text-text-primary opacity-80 group-hover:scale-105 transition-transform duration-300 text-center">
                      {rel.title}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display text-base font-bold text-text-primary mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-4 flex-grow">
                      {rel.short_description}
                    </p>
                    <Link
                      href={`/projetos/${rel.slug}`}
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 mt-auto"
                    >
                      Ver detalhes
                      <ArrowLeft className="size-3 rotate-180" />
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
