import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const fontFigtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRUPOSIX - Nutracêuticos",
  description:
    "Transforme sua saúde e beleza com resultados rápidos e comprovados usando nossos nutracêuticos inovadores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fontFigtree.variable} antialiased`}>{children}</body>
    </html>
  );
}
