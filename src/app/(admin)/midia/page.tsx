'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Trash2, Calendar, FileCode, CheckCircle } from 'lucide-react';

const INITIAL_MEDIA = [
  { id: '1', name: 'cozinha-planejada-1.jpg', size: '2.4 MB', type: 'image/jpeg', date: '2026-05-15', url: 'from-emerald-600/20 to-teal-900/10' },
  { id: '2', name: 'dashboard-financeiro.png', size: '1.8 MB', type: 'image/png', date: '2026-05-20', url: 'from-amber-600/20 to-yellow-900/10' },
  { id: '3', name: 'landing-arquitetura.jpg', size: '3.1 MB', type: 'image/jpeg', date: '2026-05-25', url: 'from-purple-600/20 to-pink-900/10' },
  { id: '4', name: 'logo-startup-mockup.png', size: '920 KB', type: 'image/png', date: '2026-05-28', url: 'from-cyan-600/20 to-teal-900/10' },
];

export default function MidiaPage() {
  const [mediaList, setMediaList] = useState(INITIAL_MEDIA);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o arquivo "${name}"? Esta ação removerá a imagem do armazenamento e não poderá ser desfeita.`)) {
      setMediaList(mediaList.filter((m) => m.id !== id));
    }
  };

  const handleUploadSimulate = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      const newMedia = {
        id: Math.random().toString(),
        name: 'novo-projeto-upload.jpg',
        size: '1.2 MB',
        type: 'image/jpeg',
        date: new Date().toISOString().split('T')[0],
        url: 'from-blue-600/20 to-indigo-900/10',
      };
      
      setMediaList([newMedia, ...mediaList]);
      
      setTimeout(() => setUploadSuccess(false), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Banco de Mídias
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Faça upload e gerencie os arquivos de mídia (imagens e documentos) usados nos projetos.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <Card variant="glass" className="p-8 border-dashed border-border-gold/30 hover:border-border-gold/60 transition-colors">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="size-12 rounded-full bg-gold-500/5 border border-border-gold flex items-center justify-center text-gold-400">
            <Upload className="size-6" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-text-primary">
              Clique ou arraste arquivos para fazer upload
            </h3>
            <p className="text-[10px] text-text-subtle mt-1 uppercase tracking-wide">
              Formatos suportados: PNG, JPG, WEBP, GIF (máx. 10MB)
            </p>
          </div>
          
          {uploadSuccess ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/20 px-4 py-2 rounded-full">
              <CheckCircle className="size-4" />
              <span>Arquivo carregado com sucesso!</span>
            </div>
          ) : (
            <button
              onClick={handleUploadSimulate}
              disabled={isUploading}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-bg-primary font-bold rounded-full text-xs shadow-lg transition-colors flex items-center gap-2"
            >
              {isUploading ? 'Enviando arquivo...' : 'Selecionar Arquivo'}
            </button>
          )}
        </div>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {mediaList.map((media) => (
          <Card key={media.id} variant="default" className="overflow-hidden flex flex-col justify-between group border hover:border-border-gold/30 transition-all duration-200">
            {/* Preview Area */}
            <div className={`aspect-video w-full bg-gradient-to-br ${media.url} flex items-center justify-center p-4 border-b border-border relative`}>
              <ImageIcon className="size-8 text-text-primary opacity-30 group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Metadata Info */}
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text-primary truncate" title={media.name}>
                  {media.name}
                </h4>
                <p className="text-[9px] font-mono text-text-subtle">
                  {media.type} • {media.size}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-1 text-[10px] text-text-subtle">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {media.date}
                </span>
                <button
                  onClick={() => handleDelete(media.id, media.name)}
                  className="text-rose-400 hover:text-rose-300 transition-colors"
                  title="Excluir Arquivo"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
