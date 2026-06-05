import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text-primary px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="text-center max-w-md mx-auto relative z-10 flex flex-col items-center">
        <div className="size-20 rounded-full border border-border-gold bg-gold-500/5 flex items-center justify-center text-gold-400 mb-8 animate-pulse">
          <HelpCircle className="size-10" />
        </div>

        <h1 className="font-display text-7xl md:text-8xl font-bold tracking-tight text-gradient-gold leading-none mb-4">
          404
        </h1>

        <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
          Página não encontrada
        </h2>

        <p className="text-text-muted text-sm leading-relaxed mb-10">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>

        <Button
          variant="primary"
          size="md"
          href="/"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}
