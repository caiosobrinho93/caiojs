'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, X, Trash2, MessageSquare, ShieldAlert } from 'lucide-react';

const INITIAL_TESTIMONIALS = [
  { id: '1', name: 'Carlos Santos', city: 'Rio de Janeiro, RJ', comment: 'Excelente desenvolvedor! Conseguiu traduzir perfeitamente o fluxo de trabalho da minha empresa em um sistema limpo e rápido.', rating: 5, status: 'pending', date: '2026-06-02' },
  { id: '2', name: 'Júlia Azevedo', city: 'Belo Horizonte, MG', comment: 'O projeto da marcenaria ficou maravilhoso. Entrega no prazo e acabamento impecável. Com certeza faremos mais projetos.', rating: 5, status: 'pending', date: '2026-05-28' },
  { id: '3', name: 'Ricardo Mendes', city: 'São José do Rio Preto, SP', comment: 'O Caio entregou um sistema que superou todas as expectativas. Profissional extremamente competente e atencioso.', rating: 5, status: 'approved', date: '2025-10-15' },
  { id: '4', name: 'Ana Clara Ferreira', city: 'Mirassol, SP', comment: 'Minha cozinha ficou exatamente como eu sonhava. Trabalho impecável do início ao fim.', rating: 5, status: 'approved', date: '2025-09-20' },
  { id: '5', name: 'Lucas Oliveira', city: 'Votuporanga, SP', comment: 'O dashboard transformou a forma como tomamos decisões na empresa. Dados claros, interface incrível.', rating: 5, status: 'approved', date: '2025-08-05' },
  { id: '6', name: 'Paulo Souza', city: 'Campinas, SP', comment: 'Orçamento muito confuso e prazo estourado.', rating: 2, status: 'rejected', date: '2025-06-12' },
];

export default function DepoimentosPage() {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const handleModerate = (id: string, newStatus: 'approved' | 'rejected') => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir definitivamente este depoimento?')) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => t.status === activeTab);
  }, [testimonials, activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Moderar Depoimentos
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Modere comentários enviados por clientes antes de serem publicados na página inicial.
          </p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-border">
        {(['pending', 'approved', 'rejected'] as const).map((tab) => {
          const count = testimonials.filter((t) => t.status === tab).length;
          const label = tab === 'pending' ? 'Pendentes' : tab === 'approved' ? 'Aprovados' : 'Rejeitados';
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2
                ${
                  activeTab === tab
                    ? 'border-gold-500 text-gold-400'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                }
              `}
            >
              <span>{label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                tab === 'pending' && count > 0
                  ? 'bg-gold-500 text-bg-primary font-black animate-pulse'
                  : 'bg-bg-secondary text-text-subtle border border-border'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((test) => (
          <Card key={test.id} variant="default" className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-sm font-bold text-text-primary">
                    {test.name}
                  </h3>
                  <p className="text-[10px] text-text-subtle mt-0.5">{test.city}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < test.rating
                          ? 'text-gold-500 fill-gold-500'
                          : 'text-text-subtle'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-text-muted leading-relaxed italic bg-bg-secondary/40 p-4 rounded border border-border">
                "{test.comment}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
              <span className="text-[10px] text-text-subtle font-mono">Enviado em: {test.date}</span>
              <div className="flex gap-2">
                {test.status !== 'approved' && (
                  <button
                    onClick={() => handleModerate(test.id, 'approved')}
                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-emerald-400 flex items-center gap-1 text-[10px] font-bold transition-colors"
                    title="Aprovar Depoimento"
                  >
                    <Check className="size-3.5" />
                    <span>Aprovar</span>
                  </button>
                )}
                {test.status !== 'rejected' && (
                  <button
                    onClick={() => handleModerate(test.id, 'rejected')}
                    className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded text-amber-400 flex items-center gap-1 text-[10px] font-bold transition-colors"
                    title="Rejeitar Depoimento"
                  >
                    <X className="size-3.5" />
                    <span>Rejeitar</span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(test.id)}
                  className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded text-rose-400 flex items-center gap-1 text-[10px] font-bold transition-colors"
                  title="Excluir Depoimento"
                >
                  <Trash2 className="size-3.5" />
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          </Card>
        ))}

        {filteredTestimonials.length === 0 && (
          <Card variant="glass" className="col-span-full py-12 text-center flex flex-col items-center justify-center p-6 border-dashed">
            <MessageSquare className="size-10 text-text-subtle mb-3" />
            <p className="text-text-muted text-sm">Nenhum depoimento nesta categoria.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
