'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { slugify } from '@/lib/utils';

const CATEGORIES_MOCK = [
  { id: 'web-design', name: 'Web Design' },
  { id: 'sistemas', name: 'Desenvolvimento de Sistemas' },
  { id: 'dashboards', name: 'Dashboards Empresariais' },
  { id: 'bubble', name: 'Bubble.io' },
  { id: 'marcenaria', name: 'Marcenaria Planejada' },
  { id: 'design', name: 'Design' },
  { id: 'video', name: 'Edição de Vídeo' },
  { id: 'automacoes', name: 'Automações' },
];

const PROJECTS_MOCK = [
  {
    id: 'dashboard-financeiro-corporativo',
    title: 'Dashboard Financeiro Corporativo',
    slug: 'dashboard-financeiro-corporativo',
    shortDesc: 'Painel completo de gestão financeira com indicadores em tempo real para empresa do setor industrial.',
    fullDesc: 'Desenvolvimento de um dashboard financeiro completo para uma empresa do setor industrial, com visualização de KPIs em tempo real, relatórios automatizados e alertas de performance. O sistema integra dados de múltiplas fontes e apresenta informações estratégicas de forma clara e acionável.',
    categoryId: 'dashboards',
    tagsInput: 'Dashboard, Finanças, BI, Corporativo',
    techsInput: 'React, Next.js, PostgreSQL, Chart.js, Tailwind CSS',
    results: 'Redução de 75% no tempo gasto na consolidação de dados financeiros mensais.',
    learnings: 'A otimização de consultas no PostgreSQL utilizando índices compostos foi crucial para a velocidade.',
    projectDate: '2025-03-15',
    externalUrl: 'https://exemplo.com/financeiro',
    status: 'published',
    isFeatured: true,
    isHighlighted: true,
  },
  {
    id: 'sistema-gestao-pedidos',
    title: 'Sistema de Gestão de Pedidos',
    slug: 'sistema-gestao-pedidos',
    shortDesc: 'Sistema completo para gestão de pedidos, estoque e clientes para comércio local.',
    fullDesc: 'Sistema web responsivo para gestão integral de um comércio local, incluindo módulos de pedidos, controle de estoque, cadastro de clientes e relatórios de vendas.',
    categoryId: 'sistemas',
    tagsInput: 'Sistema, Gestão, ERP, Comércio',
    techsInput: 'Bubble.io, Airtable, Zapier, Stripe',
    results: 'Redução de 40% no tempo de processamento de pedidos.',
    learnings: 'Mapeamento de processos operacionais com os usuários finais reduziu a resistência.',
    projectDate: '2025-01-20',
    externalUrl: 'https://exemplo.com/pedidos',
    status: 'published',
    isFeatured: true,
    isHighlighted: true,
  },
  {
    id: 'landing-page-studio-arquitetura',
    title: 'Landing Page Studio de Arquitetura',
    slug: 'landing-page-studio-arquitetura',
    shortDesc: 'Website premium para studio de arquitetura com galeria de projetos e formulário de contato.',
    fullDesc: 'Criação de uma landing page premium para um studio de arquitetura, focada em transmitir sofisticação e profissionalismo.',
    categoryId: 'web-design',
    tagsInput: 'Landing Page, Arquitetura, Design, Premium',
    techsInput: 'Next.js, Tailwind CSS, Framer Motion, Vercel',
    results: 'Geração de 35% mais contatos qualificados no primeiro mês.',
    learnings: 'Otimização de imagens com next/image manteve o carregamento instantâneo do site.',
    projectDate: '2024-11-10',
    externalUrl: 'https://exemplo.com/arquitetura',
    status: 'published',
    isFeatured: true,
    isHighlighted: false,
  },
];

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditarProjetoPage({ params }: EditPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [techsInput, setTechsInput] = useState('');
  const [results, setResults] = useState('');
  const [learnings, setLearnings] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [status, setStatus] = useState('draft');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Load project mock data on mount
  useEffect(() => {
    // Normalize id in case of simple dashboard redirects
    const projId = id === '1' ? 'dashboard-financeiro-corporativo' : (id === '2' ? 'sistema-gestao-pedidos' : (id === '3' ? 'landing-page-studio-arquitetura' : id));
    const project = PROJECTS_MOCK.find((p) => p.id === projId);
    
    if (project) {
      setTitle(project.title);
      setSlug(project.slug);
      setShortDesc(project.shortDesc);
      setFullDesc(project.fullDesc);
      setCategoryId(project.categoryId);
      setTagsInput(project.tagsInput);
      setTechsInput(project.techsInput);
      setResults(project.results);
      setLearnings(project.learnings);
      setProjectDate(project.projectDate);
      setExternalUrl(project.externalUrl);
      setStatus(project.status);
      setIsFeatured(project.isFeatured);
      setIsHighlighted(project.isHighlighted);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin-projetos');
        router.refresh();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Button
          variant="secondary"
          size="sm"
          href="/admin-projetos"
          className="flex items-center gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Editar Projeto
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Modifique as informações do projeto selecionado.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-[var(--radius-card)] text-sm flex items-center gap-2">
          <Sparkles className="size-4 shrink-0" />
          <span>Alterações salvas com sucesso! Redirecionando...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card variant="glass" className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Título do Projeto *"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dashboard Financeiro"
              required
            />

            <Input
              label="Slug do Projeto (URL) *"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Ex: dashboard-financeiro"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-xs font-semibold text-text-primary">
                Categoria *
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 bg-bg-input border border-border focus:border-gold-500 text-text-primary text-sm rounded-[var(--radius-card)] outline-none transition-colors"
                required
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIES_MOCK.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Data do Projeto"
              id="projectDate"
              type="date"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
            />
          </div>

          <Input
            label="Descrição Curta *"
            id="shortDesc"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="Resumo em uma linha para exibição nos cards..."
            maxLength={150}
            required
          />

          <Textarea
            label="Descrição Completa (Suporta Markdown) *"
            id="fullDesc"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            placeholder="Descreva detalhadamente o escopo do projeto..."
            rows={8}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Tecnologias (Separadas por vírgula)"
              id="techs"
              value={techsInput}
              onChange={(e) => setTechsInput(e.target.value)}
              placeholder="React, Next.js..."
            />

            <Input
              label="Tags/Palavras-chave (Separadas por vírgula)"
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Dashboard, Finanças..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              label="Resultados Alcançados (Suporta Markdown)"
              id="results"
              value={results}
              onChange={(e) => setResults(e.target.value)}
              placeholder="Resultados alcançados..."
              rows={4}
            />

            <Textarea
              label="Principais Aprendizados"
              id="learnings"
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
              placeholder="Dificuldades técnicas superadas..."
              rows={4}
            />
          </div>

          <Input
            label="URL Externa (Link do Projeto no Ar)"
            id="externalUrl"
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="https://exemplo.com"
          />

          <div className="border-t border-border pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Radio */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-text-primary block">
                Status de Publicação
              </span>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2.5 text-xs text-text-muted hover:text-text-primary cursor-pointer select-none">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={status === 'draft'}
                    onChange={() => setStatus('draft')}
                    className="accent-gold-500"
                  />
                  <span>Rascunho</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-text-muted hover:text-text-primary cursor-pointer select-none">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={status === 'published'}
                    onChange={() => setStatus('published')}
                    className="accent-gold-500"
                  />
                  <span>Publicado</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-text-muted hover:text-text-primary cursor-pointer select-none">
                  <input
                    type="radio"
                    name="status"
                    value="archived"
                    checked={status === 'archived'}
                    onChange={() => setStatus('archived')}
                    className="accent-gold-500"
                  />
                  <span>Arquivado</span>
                </label>
              </div>
            </div>

            {/* Featured Checkboxes */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-xs font-semibold text-text-primary block">
                Visibilidade e Destaques
              </span>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 text-xs text-text-muted hover:text-text-primary cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="size-4 rounded border-border accent-gold-500"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">Projeto Destaque</p>
                    <p className="text-[10px] text-text-subtle">Exibe um selo de projeto de grande impacto no portfólio.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 text-xs text-text-muted hover:text-text-primary cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isHighlighted}
                    onChange={(e) => setIsHighlighted(e.target.checked)}
                    className="size-4 rounded border-border accent-gold-500"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">Destaque na Home Page</p>
                    <p className="text-[10px] text-text-subtle">Adiciona este projeto à seção resumida da página inicial.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="secondary" size="md" href="/admin-projetos">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="size-4" />
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
