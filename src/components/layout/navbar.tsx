"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/mobile-menu";

const SCROLL_THRESHOLD = 32;

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    // Check initial scroll position
    handleScroll();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-20",
          "transition-all duration-500 ease-[var(--ease-premium)]",
          isScrolled
            ? "bg-glass shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="mx-auto flex h-full max-w-7xl items-center justify-between px-6"
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-display text-lg font-semibold tracking-wide",
              "transition-colors duration-500 ease-[var(--ease-premium)]",
              isScrolled ? "text-mint-500" : "text-text-primary",
              "hover:text-mint-400"
            )}
            aria-label="Caio Sobrinho — Página inicial"
          >
            CAIO SOBRINHO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.filter((link) => link.href !== "/contato").map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide",
                    "transition-colors duration-300 ease-[var(--ease-premium)]",
                    isActive(link.href)
                      ? "text-mint-500"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {link.label}

                  {/* Active indicator — subtle gold underline */}
                  {isActive(link.href) && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 h-px w-5 -translate-x-1/2",
                        "bg-gradient-to-r from-transparent via-mint-500 to-transparent"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            )}

            {/* CTA Button */}
            <Link
              href="/contato"
              className={cn(
                "ml-4 inline-flex items-center justify-center",
                "rounded-[var(--radius-button)] px-5 py-2",
                "text-sm font-semibold tracking-wide",
                "bg-mint-500 text-bg-primary",
                "transition-all duration-300 ease-[var(--ease-premium)]",
                "hover:bg-mint-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
                "active:scale-[0.97]"
              )}
            >
              Contato
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2 md:hidden",
              "text-text-muted transition-colors duration-200",
              "hover:bg-bg-hover hover:text-text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
            )}
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
