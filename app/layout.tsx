import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { AuthProvider } from "@/components/AuthProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: {
    default: "Visiona | Descubre quién quieres ser",
    template: "%s | Visiona",
  },
  description:
    "Descubre tus habilidades, encuentra oportunidades y construye el futuro que imaginas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}