'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, Eye, Users, MousePointer, Flame, ArrowUpRight, TrendingUp } from 'lucide-react';

const SUMMARY_METRICS = [
  { label: 'Visualizações de Página', value: '1.234', icon: Eye, color: 'text-amber-400', percentage: '+12.3% este mês' },
  { label: 'Visitantes Únicos', value: '456', icon: Users, color: 'text-blue-400', percentage: '+8.4% este mês' },
  { label: 'Cliques em CTAs', value: '189', icon: MousePointer, color: 'text-emerald-400', percentage: '+18.1% este mês' },
  { label: 'Taxa de Conversão', value: '15.3%', icon: TrendingUp, color: 'text-purple-400', percentage: '+2.1% este mês' },
];

const TOP_PAGES = [
  { path: '/', title: 'Home Page', views: 564, percentage: '45.7%' },
  { path: '/projetos', title: 'Portfólio de Projetos', views: 322, percentage: '26.1%' },
  { path: '/sobre', title: 'Sobre Mim', views: 184, percentage: '14.9%' },
  { path: '/servicos', title: 'Serviços & Soluções', views: 112, percentage: '9.0%' },
  { path: '/projetos/dashboard-financeiro-corporativo', title: 'Dashboard Financeiro', views: 52, percentage: '4.3%' },
];

const CHART_DATA = [
  { day: 'Seg', views: 120 },
  { day: 'Ter', views: 154 },
  { day: 'Qua', views: 180 },
  { day: 'Qui', views: 142 },
  { day: 'Sex', views: 210 },
  { day: 'Sáb', views: 195 },
  { day: 'Dom', views: 233 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  // Simple CSS maximum calculation for chart scaling
  const maxViews = Math.max(...CHART_DATA.map((d) => d.views));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Métricas &amp; Performance
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Monitore o tráfego do seu site e o engajamento com as chamadas de ação.
          </p>
        </div>
        
        {/* Period selection tabs */}
        <div className="flex bg-bg-secondary p-1 rounded-full border border-border shrink-0 self-start sm:self-auto">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`
                px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all
                ${
                  period === p
                    ? 'bg-gold-500 text-bg-primary font-black'
                    : 'text-text-muted hover:text-text-primary'
                }
              `}
            >
              {p === '7d' ? '7 dias' : p === '30d' ? '30 dias' : '90 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUMMARY_METRICS.map((metric) => {
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
              <div className="mt-4 flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <ArrowUpRight className="size-3" />
                <span>{metric.percentage}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Card */}
        <div className="lg:col-span-7">
          <Card variant="glass" className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary mb-1">
                Acessos Recentes
              </h3>
              <p className="text-[10px] text-text-muted mb-6 uppercase tracking-wider">
                Visualizações por dia da semana
              </p>
            </div>

            {/* CSS Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-48 pt-6 border-b border-border/80">
              {CHART_DATA.map((data) => {
                // Calculate height percentage dynamically
                const heightPercent = `${(data.views / maxViews) * 80}%`;

                return (
                  <div key={data.day} className="flex flex-col items-center flex-1 group">
                    {/* Tooltip on hover */}
                    <span className="opacity-0 group-hover:opacity-100 bg-bg-primary border border-border text-[9px] px-1.5 py-0.5 rounded mb-2 transition-opacity duration-200 pointer-events-none font-bold text-gold-400">
                      {data.views}
                    </span>
                    {/* Bar */}
                    <div
                      className="w-full bg-gradient-to-t from-gold-600 to-gold-400/60 rounded-t group-hover:from-gold-500 group-hover:to-gold-400 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                      style={{ height: heightPercent }}
                    />
                    <span className="text-[10px] text-text-subtle mt-3 mb-1">
                      {data.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Top Pages table */}
        <div className="lg:col-span-5">
          <Card variant="glass" className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-base font-bold text-text-primary">
                  Páginas Mais Acessadas
                </h3>
                <Flame className="size-4 text-gold-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-text-muted mb-6 uppercase tracking-wider">
                Rotas de maior engajamento
              </p>
            </div>

            <div className="space-y-4">
              {TOP_PAGES.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-text-primary block truncate">
                      {page.title}
                    </span>
                    <span className="text-[10px] text-text-subtle font-mono">{page.path}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-text-primary block">
                      {page.views}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-semibold">{page.percentage}</span>
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
