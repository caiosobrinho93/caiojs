'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'Falha na autenticação.');
      }
    } catch (err) {
      setError('Erro de conexão ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy');

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="w-full max-w-md">
        <Card variant="glass" className="p-8 border-border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
          {/* Logo Area */}
          <div className="text-center mb-8">
            <span className="font-display text-2xl font-bold tracking-widest text-text-primary">
              CAIO <span className="text-gold-500">SOBRINHO</span>
            </span>
            <p className="text-xs text-text-muted mt-2 uppercase tracking-widest">
              Painel Administrativo
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-[var(--radius-card)] text-xs flex items-start gap-2.5 leading-relaxed">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isDummy && (
            <div className="mb-6 p-4 bg-gold-500/5 border border-border-gold text-gold-400 rounded-[var(--radius-card)] text-xs leading-relaxed">
              <strong>Modo de Demonstração Activo:</strong>
              <p className="mt-1">
                Utilize as credenciais padrão abaixo para acessar o painel administrativo:
              </p>
              <p className="mt-1 font-mono text-[11px] bg-bg-primary/50 p-1 rounded border border-border">
                Email: admin@caiosobrinho.com.br<br />
                Senha: admin123
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3.5 top-[38px] size-4 text-text-subtle z-10" />
              <Input
                label="Endereço de Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.com"
                className="pl-11"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-[38px] size-4 text-text-subtle z-10" />
              <Input
                label="Senha de Acesso"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-11"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Fazer Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
