'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X, Sparkles, Layout, Eye, UserCheck } from 'lucide-react';

const INITIAL_CONTENT = [
  // Hero section
  { key: 'hero_title', value: 'CAIO SOBRINHO', group: 'hero', type: 'text', label: 'Título Principal do Hero' },
  { key: 'hero_subtitle', value: 'Transformando ideias em soluções digitais, sistemas inteligentes e projetos reais.', group: 'hero', type: 'textarea', label: 'Subtítulo do Hero' },
  
  // About section
  { key: 'about_intro', value: 'Sou o Caio Sobrinho — um profissional que acredita que boas soluções nascem da combinação entre visão estratégica, domínio técnico e execução impecável.', group: 'about', type: 'textarea', label: 'Introdução Curta' },
  { key: 'about_text', value: 'Com mais de 6 anos de experiência em projetos e 8 anos em marcenaria, minha trajetória é marcada pela versatilidade. Atuo em desenvolvimento web, criação de sistemas, dashboards empresariais, automações, design e marcenaria planejada. Cada projeto é uma oportunidade de resolver problemas reais e entregar resultados que fazem diferença.', group: 'about', type: 'textarea', label: 'Texto Completo do Sobre (Suporta Markdown)' },
  { key: 'about_philosophy', value: 'Minha filosofia é simples: entender profundamente o problema antes de criar a solução. Penso em sistemas, não em tarefas isoladas. Busco elegância na simplicidade e impacto nos resultados.', group: 'about', type: 'textarea', label: 'Filosofia de Trabalho' },
];

export default function ConteudoPage() {
  const [contentList, setContentList] = useState(INITIAL_CONTENT);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [activeGroup, setActiveGroup] = useState<'hero' | 'about'>('hero');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStartEdit = (key: string, value: string) => {
    setEditingKey(key);
    setEditingValue(value);
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditingValue('');
  };

  const handleSave = (key: string) => {
    setContentList(
      contentList.map((item) =>
        item.key === key ? { ...item, value: editingValue } : item
      )
    );
    setEditingKey(null);
    setEditingValue('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const filteredContent = contentList.filter((item) => item.group === activeGroup);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Conteúdo Dinâmico do Site
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Altere os textos estáticos das seções principais do site público diretamente.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => { setActiveGroup('hero'); handleCancelEdit(); }}
          className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeGroup === 'hero'
              ? 'border-gold-500 text-gold-400'
              : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <Layout className="size-3.5" />
          <span>Seção Hero (Principal)</span>
        </button>
        <button
          onClick={() => { setActiveGroup('about'); handleCancelEdit(); }}
          className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeGroup === 'about'
              ? 'border-gold-500 text-gold-400'
              : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <UserCheck className="size-3.5" />
          <span>Seção Sobre</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-[var(--radius-card)] text-sm flex items-center gap-2">
          <Sparkles className="size-4 shrink-0" />
          <span>Texto atualizado com sucesso! Carregamento no ar instantâneo.</span>
        </div>
      )}

      {/* Content Form Block */}
      <div className="space-y-6">
        {filteredContent.map((item) => {
          const isEditing = editingKey === item.key;

          return (
            <Card key={item.key} variant="default" className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">
                      {item.label}
                    </h3>
                    <p className="text-[10px] font-mono text-text-subtle mt-0.5">
                      Chave do sistema: {item.key}
                    </p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => handleStartEdit(item.key, item.value)}
                      className="p-1.5 bg-bg-secondary hover:bg-bg-hover border border-border hover:border-border-gold/30 rounded text-gold-400 flex items-center gap-1 text-[10px] font-semibold transition-all"
                    >
                      <Edit2 className="size-3.5" />
                      <span>Editar</span>
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    {item.type === 'text' ? (
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="w-full px-4 py-2.5 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded-[var(--radius-card)] outline-none"
                      />
                    ) : (
                      <textarea
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2.5 bg-bg-input border border-border focus:border-gold-500 text-xs text-text-primary rounded-[var(--radius-card)] outline-none"
                      />
                    )}
                    <div className="flex justify-end gap-3">
                      <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                        <X className="size-3.5 mr-1" />
                        Cancelar
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => handleSave(item.key)}>
                        <Save className="size-3.5 mr-1" />
                        Salvar Alterações
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-bg-secondary/30 rounded border border-border/50 text-xs text-text-muted whitespace-pre-wrap leading-relaxed">
                    {item.value || <span className="italic text-text-subtle">Vazio</span>}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
