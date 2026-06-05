'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FolderOpen,
  Eye,
  MessageSquare,
  Mail,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Check,
  X,
} from 'lucide-react';
import { formatDateShort } from '@/lib/utils';

// Mock summary metrics
const METRICS = [
  { label: 'Total Projetos', value: '6', icon: FolderOpen, color: 'text-blue-400' },
  { label: 'Visualizações', value: '1.234', icon: Eye, color: 'text-amber-400' },
  { label: 'Depoimentos Pendentes', value: '2', icon: MessageSquare, color: 'text-emerald-400' },
  { label: 'Mensagens Recebidas', value: '5', icon: Mail, color: 'text-purple-400' },
];

// Mock recent projects
const RECENT_PROJECTS = [
  {
    title: 'Dashboard Financeiro Corporativo',
    category: 'Dashboards',
    status: 'published',
    date: '2025-03-15',
    id: '1',
  },
  {
    title: 'Sistema de Gestão de Pedidos',
    category: 'Sistemas',
    status: 'published',
    date: '2025-01-20',
    id: '2',
  },
  {
    title: 'Landing Page Studio de Arquitetura',
    category: 'Web Design',
    status: 'published',
    date: '2024-11-10',
    id: '3',
  },
];

// Mock pending testimonials
const PENDING_TESTIMONIALS = [
  {
    id: '1',
    name: 'Carlos Santos',
    city: 'Rio de Janeiro, RJ',
    comment: 'Excelente desenvolvedor! Conseguiu traduzir perfeitamente o fluxo de trabalho da minha empresa em um sistema limpo e rápido.',
    rating: 5,
    date: '2026-06-02',
  },
  {
    id: '2',
    name: 'Júlia Azevedo',
    city: 'Belo Horizonte, MG',
    comment: 'O projeto da marcenaria ficou maravilhoso. Entrega no prazo e acabamento impecável. Com certeza faremos mais projetos.',
    rating: 5,
    date: '2026-05-28',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ── Welcome Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Olá, Caio Sobrinho
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Aqui está o resumo do desempenho da sua plataforma e solicitações pendentes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            href="/"
            className="flex items-center gap-2"
            target="_blank"
          >
            <ExternalLink className="size-3.5" />
            Ver Site
          </Button>
          <Button
            variant="primary"
            size="sm"
            href="/admin-projetos/novo"
            className="flex items-center gap-2"
          >
            <Plus className="size-3.5" />
            Novo Projeto
          </Button>
        </div>
      </div>

      {/* ── Metrics Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} variant="default" className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-text-subtle font-semibold uppercase tracking-wider">
                    {metric.label}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-text-primary mt-2">
                    {metric.value}
                  </h3>
                </div>
                <div className={`p-2.5 rounded-lg bg-bg-secondary border border-border ${metric.color}`}>
                  <Icon className="size-4 shrink-0" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ── Main Blocks ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Projects table */}
        <div className="lg:col-span-8 space-y-6">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-base font-bold text-text-primary">
                Projetos Recentes
              </h3>
              <Link
                href="/admin-projetos"
                className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1"
              >
                Gerenciar todos
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border text-text-subtle font-semibold">
                    <th className="pb-3 pr-4">Título</th>
                    <th className="pb-3 pr-4">Categoria</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Data</th>
                    <th className="pb-3 text-right">Acções</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RECENT_PROJECTS.map((proj) => (
                    <tr key={proj.id} className="group">
                      <td className="py-3.5 pr-4 font-medium text-text-primary group-hover:text-gold-400 transition-colors">
                        {proj.title}
                      </td>
                      <td className="py-3.5 pr-4 text-text-muted">{proj.category}</td>
                      <td className="py-3.5 pr-4">
                        <Badge variant="outline" className="bg-emerald-500/5 text-emerald-400 border-emerald-500/20 text-[10px]">
                          Publicado
                        </Badge>
                      </td>
                      <td className="py-3.5 pr-4 text-text-subtle">
                        {formatDateShort(proj.date)}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <Link
                          href={`/admin-projetos/${proj.id}`}
                          className="text-gold-400 hover:text-gold-300 hover:underline"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Moderation Block & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Moderation Block */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-text-primary">
                Moderação Pendente
              </h3>
              <Link
                href="/depoimentos"
                className="text-[10px] text-text-muted hover:underline flex items-center gap-0.5"
              >
                Ver todos ({PENDING_TESTIMONIALS.length})
              </Link>
            </div>

            <div className="space-y-4">
              {PENDING_TESTIMONIALS.map((test) => (
                <div
                  key={test.id}
                  className="p-4 bg-bg-secondary/50 border border-border rounded-[var(--radius-card)] space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-text-primary">{test.name}</h4>
                      <p className="text-[10px] text-text-subtle mt-0.5">{test.city}</p>
                    </div>
                    <span className="text-[9px] text-text-subtle flex items-center gap-1 font-semibold">
                      <Clock className="size-3" />
                      Pendente
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed italic">
                    "{test.comment}"
                  </p>
                  <div className="flex gap-2 pt-2 border-t border-border/50">
                    <button
                      onClick={() => alert(`Depoimento de ${test.name} aprovado!`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold transition-colors"
                    >
                      <Check className="size-3" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => alert(`Depoimento de ${test.name} rejeitado.`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded text-[10px] font-bold transition-colors"
                    >
                      <X className="size-3" />
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
