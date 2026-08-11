export const SITE = {
  name: "Caio Sobrinho",
  title: "Caio Sobrinho — Soluções Digitais, Sistemas & Projetos",
  description:
    "Transformando ideias em soluções digitais, sistemas inteligentes e projetos reais.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://caiosobrinho.com.br",
  whatsapp: "17997448213",
  email: process.env.CONTACT_EMAIL || "contato@caiosobrinho.com.br",
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/5517997448213`,
  instagram: "#", // Placeholder until professional account is created
  linkedin: "#",  // Placeholder until professional account is created
} as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Planejamento",
    description:
      "Entendo profundamente o problema, os objetivos e o contexto antes de criar qualquer solução.",
    icon: "Compass",
  },
  {
    step: 2,
    title: "Estruturação",
    description:
      "Defino a arquitetura, as prioridades e o roadmap do projeto para garantir clareza e direção.",
    icon: "Layers",
  },
  {
    step: 3,
    title: "Desenvolvimento",
    description:
      "Executo com foco em qualidade, performance e atenção a cada detalhe — do design ao código.",
    icon: "Code",
  },
  {
    step: 4,
    title: "Ajustes",
    description:
      "Reviso, testo e refino até que cada elemento esteja alinhado com a visão original.",
    icon: "Settings",
  },
  {
    step: 5,
    title: "Entrega",
    description:
      "Entrego o projeto completo, funcional e documentado — pronto para gerar resultados.",
    icon: "Rocket",
  },
] as const;

export const STATS_DEFAULT = [
  { label: "Projetos Realizados", value: "50", suffix: "+" },
  { label: "Anos em Projetos", value: "6", suffix: "+" },
  { label: "Clientes Satisfeitos", value: "30", suffix: "+" },
] as const;
