'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Search, Star, Edit, Trash2, Calendar, Folder } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';

// Mock projects list (same as public and seed)
const INITIAL_PROJECTS = [
  {
    id: 'dashboard-financeiro-corporativo',
    title: 'Dashboard Financeiro Corporativo',
    category: 'Dashboards Empresariais',
    status: 'published',
    is_featured: true,
    project_date: '2025-03-15',
  },
  {
    id: 'sistema-gestao-pedidos',
    title: 'Sistema de Gestão de Pedidos',
    category: 'Desenvolvimento de Sistemas',
    status: 'published',
    is_featured: true,
    project_date: '2025-01-20',
  },
  {
    id: 'landing-page-studio-arquitetura',
    title: 'Landing Page Studio de Arquitetura',
    category: 'Web Design',
    status: 'published',
    is_featured: true,
    project_date: '2024-11-10',
  },
  {
    id: 'cozinha-planejada-residencial',
    title: 'Cozinha Planejada Residencial',
    category: 'Marcenaria Planejada',
    status: 'published',
    is_featured: true,
    project_date: '2024-08-05',
  },
  {
    id: 'automacao-marketing-digital',
    title: 'Automação de Marketing Digital',
    category: 'Automações',
    status: 'draft',
    is_featured: false,
    project_date: '2024-06-20',
  },
  {
    id: 'identidade-visual-startup-tech',
    title: 'Identidade Visual Startup Tech',
    category: 'Design',
    status: 'published',
    is_featured: false,
    project_date: '2024-04-12',
  },
];

export default function AdminProjetosPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge variant="outline" className="bg-emerald-500/5 text-emerald-400 border-emerald-500/20 text-[10px]">
            Publicado
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="bg-zinc-500/5 text-zinc-400 border-zinc-500/20 text-[10px]">
            Rascunho
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline" className="bg-rose-500/5 text-rose-400 border-rose-500/20 text-[10px]">
            Arquivado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Gerenciar Projetos
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Cadastre, edite e organize os projetos exibidos no seu portfólio.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          href="/admin-projetos/novo"
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Toolbar */}
      <Card variant="default" className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Pesquisar projetos por título ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-border focus:border-gold-500 rounded-[var(--radius-card)] text-sm text-text-primary placeholder:text-text-subtle outline-none transition-colors"
          />
        </div>
        <div className="text-xs text-text-muted font-semibold flex items-center gap-1.5 shrink-0">
          <Folder className="size-4 text-gold-500" />
          <span>
            {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
          </span>
        </div>
      </Card>

      {/* Projects List Card */}
      <Card variant="glass" className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-subtle font-semibold">
                <th className="pb-3 pr-4">Título</th>
                <th className="pb-3 pr-4">Categoria</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Data</th>
                <th className="pb-3 pr-4 text-center">Destaque</th>
                <th className="pb-3 text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="group">
                  <td className="py-4 pr-4 font-semibold text-text-primary group-hover:text-gold-400 transition-colors max-w-xs truncate">
                    {project.title}
                  </td>
                  <td className="py-4 pr-4 text-text-muted">{project.category}</td>
                  <td className="py-4 pr-4">{getStatusBadge(project.status)}</td>
                  <td className="py-4 pr-4 text-text-subtle">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-text-subtle shrink-0" />
                      {formatDateShort(project.project_date)}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-center">
                    {project.is_featured ? (
                      <span className="inline-flex justify-center text-gold-500" title="Featured">
                        <Star className="size-4 fill-gold-500" />
                      </span>
                    ) : (
                      <span className="text-text-subtle" title="Not Featured">
                        -
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-right space-x-3">
                    <Link
                      href={`/admin-projetos/${project.id}`}
                      className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors"
                      title="Editar"
                    >
                      <Edit className="size-3.5" />
                      <span>Editar</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Excluir</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-text-muted">
                    Nenhum projeto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
