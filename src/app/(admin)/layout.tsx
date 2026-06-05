'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';
import {
  LayoutDashboard,
  FolderOpen,
  Grid3x3,
  MessageSquare,
  FileText,
  BarChart3,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projetos', href: '/admin-projetos', icon: FolderOpen },
  { label: 'Categorias', href: '/categorias', icon: Grid3x3 },
  { label: 'Depoimentos', href: '/depoimentos', icon: MessageSquare },
  { label: 'Conteúdo Site', href: '/conteudo', icon: FileText },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
] as const;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.success) {
        router.push('/login');
        router.refresh();
      } else {
        alert(res.error || 'Erro ao fazer logout.');
      }
    } catch (err) {
      alert('Erro de rede ao fazer logout.');
    }
  };

  const getPageTitle = () => {
    const activeLink = ADMIN_NAV_LINKS.find((link) => link.href === pathname || pathname.startsWith(link.href + '/'));
    return activeLink ? activeLink.label : 'Painel de Administração';
  };

  return (
    <div className="min-h-screen bg-bg-primary flex text-text-primary">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-bg-secondary shrink-0">
        {/* Sidebar Header */}
        <div className="h-20 border-b border-border flex items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <span className="font-display text-lg font-bold tracking-widest text-text-primary">
              CS <span className="text-gold-500">ADMIN</span>
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow p-4 space-y-1">
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-400 border border-border-gold/30'
                      : 'text-text-muted hover:text-text-primary hover:bg-bg-hover border border-transparent'
                  }
                `}
              >
                <Icon className="size-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border bg-bg-primary/20 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="size-3.5" />
              Ver Site Público
            </span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors border border-transparent"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside className="relative flex flex-col w-64 max-w-xs bg-bg-secondary border-r border-border h-full z-10 p-4">
            <div className="flex items-center justify-between mb-8 px-2">
              <span className="font-display text-lg font-bold tracking-widest text-text-primary">
                CS <span className="text-gold-500">ADMIN</span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="size-8 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text-primary"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex-grow space-y-1">
              {ADMIN_NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? 'bg-gold-500/10 text-gold-400 border border-border-gold/30'
                          : 'text-text-muted hover:text-text-primary hover:bg-bg-hover border border-transparent'
                      }
                    `}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border pt-4 mt-auto space-y-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="size-3.5" />
                  Ver Site Público
                </span>
              </a>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors border border-transparent"
              >
                <LogOut className="size-4 shrink-0" />
                <span>Sair do Painel</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex flex-col flex-grow min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-border bg-bg-secondary/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden size-10 border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="font-display text-lg md:text-xl font-bold text-text-primary">
              {getPageTitle()}
            </h1>
          </div>

          {/* User profile dropdown info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-text-primary">Caio Sobrinho</span>
              <span className="text-[10px] text-gold-500 font-semibold uppercase tracking-wider">
                Administrador
              </span>
            </div>
            <div className="size-10 rounded-full border border-border-gold/30 bg-gold-500/5 flex items-center justify-center text-gold-400">
              <User className="size-4" />
            </div>
          </div>
        </header>

        {/* Inner Content scrollable */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
