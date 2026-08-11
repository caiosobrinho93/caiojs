import Link from "next/link";
import { MessageCircle, Mail, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function Footer() {
  const year = getCurrentYear();

  return (
    <footer className="relative bg-bg-secondary" role="contentinfo">
      {/* Top gold gradient border */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        {/* Main Footer Grid */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-block font-display text-lg font-semibold tracking-wide text-mint-500 transition-colors duration-300 hover:text-mint-400"
              aria-label="Caio Sobrinho — Página inicial"
            >
              CAIO SOBRINHO
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Transformando ideias em soluções digitais, sistemas inteligentes e
              projetos reais — com excelência e atenção a cada detalhe.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-card text-text-muted transition-all duration-300 hover:border-border-gold hover:text-mint-500 hover:shadow-[0_0_12px_rgba(183,214,0,0.12)]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-card text-text-muted transition-all duration-300 hover:border-border-gold hover:text-mint-500 hover:shadow-[0_0_12px_rgba(183,214,0,0.12)]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-card text-text-muted transition-all duration-300 hover:border-border-gold hover:text-mint-500 hover:shadow-[0_0_12px_rgba(183,214,0,0.12)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">
              Navegação
            </h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-300 hover:text-mint-500"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">
              Contato
            </h3>
            <ul className="space-y-4" role="list">
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-text-muted transition-colors duration-300 hover:text-text-primary"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-mint-500/70 transition-colors duration-300 group-hover:text-mint-500" />
                  <div>
                    <span className="block font-medium text-text-secondary group-hover:text-text-primary">
                      WhatsApp
                    </span>
                    <span className="text-text-subtle">
                      ({SITE.whatsapp.slice(0, 2)}) {SITE.whatsapp.slice(2, 7)}-
                      {SITE.whatsapp.slice(7)}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-3 text-sm text-text-muted transition-colors duration-300 hover:text-text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint-500/70 transition-colors duration-300 group-hover:text-mint-500" />
                  <div>
                    <span className="block font-medium text-text-secondary group-hover:text-text-primary">
                      E-mail
                    </span>
                    <span className="text-text-subtle">{SITE.email}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-text-subtle">
            &copy; 2024–{year} Caio Sobrinho. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
