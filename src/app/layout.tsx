import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Caio Sobrinho — Soluções Digitais, Sistemas & Projetos",
    template: "%s | Caio Sobrinho",
  },
  description:
    "Transformando ideias em soluções digitais, sistemas inteligentes e projetos reais. Web Design, Desenvolvimento, Dashboards, Automações, Marcenaria e muito mais.",
  keywords: [
    "Caio Sobrinho",
    "Web Design",
    "Desenvolvimento de Sistemas",
    "Dashboards",
    "Bubble.io",
    "Automações",
    "Marcenaria Planejada",
    "Soluções Digitais",
  ],
  authors: [{ name: "Caio Sobrinho" }],
  creator: "Caio Sobrinho",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://caiosobrinho.com.br"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caio Sobrinho",
    title: "Caio Sobrinho — Soluções Digitais, Sistemas & Projetos",
    description:
      "Transformando ideias em soluções digitais, sistemas inteligentes e projetos reais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caio Sobrinho — Soluções Digitais, Sistemas & Projetos",
    description:
      "Transformando ideias em soluções digitais, sistemas inteligentes e projetos reais.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
