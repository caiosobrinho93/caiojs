'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Tag, Layers, Check, Sparkles } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Web Design', slug: 'web-design', description: 'Criação de interfaces modernas, responsivas e focadas em experiência do usuário.', icon: 'Palette', badge: 'Especialidade', isActive: true },
  { id: '2', name: 'Desenvolvimento de Sistemas', slug: 'sistemas', description: 'Sistemas completos, robustos e escaláveis para negócios de todos os tamanhos.', icon: 'Code', badge: '', isActive: true },
  { id: '3', name: 'Dashboards Empresariais', slug: 'dashboards', description: 'Painéis inteligentes para visualização de dados e tomada de decisão.', icon: 'BarChart3', badge: '', isActive: true },
  { id: '4', name: 'Bubble.io', slug: 'bubble', description: 'Desenvolvimento no-code e low-code para MVPs e soluções rápidas.', icon: 'Workflow', badge: 'No-Code', isActive: true },
  { id: '5', name: 'Marcenaria Planejada', slug: 'marcenaria', description: 'Projetos sob medida em marcenaria — do planejamento à execução.', icon: 'Hammer', badge: '8 anos', isActive: true },
  { id: '6', name: 'Design', slug: 'design', description: 'Design gráfico, identidade visual e peças criativas para marcas.', icon: 'Figma', badge: '', isActive: true },
];

export default function CategoriasPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Layers');
  const [badge, setBadge] = useState('');

  const handleToggleActive = (id: string) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir a categoria "${name}"? Todos os projetos associados ficarão sem categoria.`)) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const newCat = {
      id: Math.random().toString(),
      name,
      slug,
      description,
      icon,
      badge,
      isActive: true,
    };

    setCategories([...categories, newCat]);
    setIsAdding(false);
    setName('');
    setSlug('');
    setDescription('');
    setIcon('Layers');
    setBadge('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Categorias &amp; Especialidades
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Gerencie as áreas de atuação profissional exibidas nos filtros e listagens do site.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-bg-primary bg-gold-500 rounded-full hover:bg-gold-600 transition-colors self-start sm:self-auto"
        >
          <Plus className="size-4" />
          Nova Categoria
        </button>
      </div>

      {/* Add form inline */}
      {isAdding && (
        <Card variant="glass" className="p-6 border-border-gold/30">
          <h3 className="font-display text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
            <Sparkles className="size-4 text-gold-500" />
            Nova Especialidade
          </h3>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-text-muted">Nome *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  placeholder="Ex: Inteligência Artificial"
                  className="px-3 py-2 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded outline-none transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-text-muted">Slug (URL) *</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Ex: inteligencia-artificial"
                  className="px-3 py-2 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-text-muted">Selo Especial (Opcional)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Ex: Novo, Destaque..."
                  className="px-3 py-2 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-text-muted">Nome do Ícone Lucide</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Layers, Palette, Code..."
                  className="px-3 py-2 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-text-muted">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve resumo da especialidade..."
                rows={2}
                className="px-3 py-2 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded outline-none transition-colors"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Salvar Especialidade
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            variant="default"
            className={`p-6 border hover:border-border-gold/30 transition-all duration-200 flex flex-col justify-between ${
              !cat.isActive ? 'opacity-60 bg-bg-secondary/20' : ''
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="size-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center text-gold-400">
                  <Layers className="size-5" />
                </div>
                <div className="flex gap-2">
                  {cat.badge && (
                    <Badge variant="default" className="text-[9px]">
                      {cat.badge}
                    </Badge>
                  )}
                  <button
                    onClick={() => handleToggleActive(cat.id)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-colors ${
                      cat.isActive
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400'
                    }`}
                  >
                    {cat.isActive ? 'Ativo' : 'Inativo'}
                  </button>
                </div>
              </div>

              <h3 className="font-display text-base font-bold text-text-primary mb-1">
                {cat.name}
              </h3>
              <p className="text-[11px] font-mono text-text-subtle mb-3">/{cat.slug}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                {cat.description || 'Nenhuma descrição fornecida.'}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-border pt-4 mt-auto">
              <span className="text-[10px] text-text-subtle font-mono">Ícone: {cat.icon}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => alert('Edição de categorias em modo de visualização.')}
                  className="text-gold-400 hover:text-gold-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit className="size-3.5" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="size-3.5" />
                  Excluir
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
