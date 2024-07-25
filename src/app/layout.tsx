import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ['cyrillic', 'latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "Fakegram",
  description: "Учебный проект, который повторяет функционал популярной социальной сети Instagram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
