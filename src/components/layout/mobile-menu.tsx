"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animation variants
const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const panelVariants = {
  closed: { x: "100%" },
  open: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: 40 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const socialVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-bg-primary/60 backdrop-blur-sm"
            variants={overlayVariants as any}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            id="mobile-menu"
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-full flex-col",
              "bg-bg-primary/95 backdrop-blur-xl",
              "sm:max-w-sm sm:border-l sm:border-border"
            )}
            variants={panelVariants as any}
            initial="closed"
            animate="open"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            {/* Header */}
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-lg font-semibold tracking-wide text-gold-500">
                CAIO SOBRINHO
              </span>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "inline-flex items-center justify-center rounded-lg p-2",
                  "text-text-muted transition-colors duration-200",
                  "hover:bg-bg-hover hover:text-text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                )}
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-1 flex-col justify-center px-6">
              <ul className="flex flex-col gap-2" role="list">
                {NAV_LINKS.map((link) => (
                  <motion.li key={link.href} variants={linkVariants as any}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between",
                        "rounded-xl px-4 py-4",
                        "text-2xl font-display font-medium tracking-wide",
                        "transition-all duration-300 ease-[var(--ease-premium)]",
                        isActive(link.href)
                          ? "bg-gold-500/10 text-gold-500"
                          : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 opacity-0 transition-all duration-300",
                          "group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          isActive(link.href) && "opacity-60"
                        )}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom Section: Social + Contact */}
            <motion.div
              className="border-t border-border px-6 py-8"
              variants={socialVariants as any}
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-text-subtle">
                Conecte-se
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5",
                    "bg-bg-hover text-sm font-medium text-text-secondary",
                    "transition-all duration-300",
                    "hover:bg-gold-500/10 hover:text-gold-500"
                  )}
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5",
                    "bg-bg-hover text-sm font-medium text-text-secondary",
                    "transition-all duration-300",
                    "hover:bg-gold-500/10 hover:text-gold-500"
                  )}
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5",
                    "bg-bg-hover text-sm font-medium text-text-secondary",
                    "transition-all duration-300",
                    "hover:bg-gold-500/10 hover:text-gold-500"
                  )}
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
