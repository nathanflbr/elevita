import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import localFont from "next/font/local";

const fontFigtree = localFont({
  variable: "--font-figtree",
  src: [
    {
      path: "../../public/font/figtree/Figtree-VariableFont_wght.ttf",
      style: "normal",
      weight: "300 900",
    },
    {
      path: "../../public/font/figtree/Figtree-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "300 900",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "GRUPOSIX - Nutracêuticos | Transforme Sua Saúde e Beleza",
  description:
    "Transforme sua saúde e beleza com resultados rápidos e comprovados usando nossos nutracêuticos inovadores. Frete grátis e 12x sem juros.",
  keywords: [
    "nutracêuticos",
    "suplementos",
    "saúde",
    "beleza",
    "emagrecimento",
    "bem-estar",
    "GRUPOSIX",
    "Elevita",
  ],
  authors: [{ name: "GRUPOSIX" }],
  creator: "NathanFL",
  publisher: "Vercel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://elevita-lyart.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GRUPOSIX - Nutracêuticos | Transforme Sua Saúde e Beleza",
    description:
      "Transforme sua saúde e beleza com resultados rápidos e comprovados usando nossos nutracêuticos inovadores.",
    url: "https://elevita-lyart.vercel.app/",
    siteName: "GRUPOSIX Elevita",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRUPOSIX - Nutracêuticos | Transforme Sua Saúde e Beleza",
    description:
      "Transforme sua saúde e beleza com resultados rápidos e comprovados usando nossos nutracêuticos inovadores.",
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
    <html lang="pt-BR">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#D43B4B" />
        <meta name="msapplication-TileColor" content="#D43B4B" />

        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${fontFigtree.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
