import type { Metadata, NextPage } from 'next';
import { Inter } from 'next/font/google';
import '@/app/styles/globals.css';
import React from 'react';

const inter = Inter({ subsets: ['cyrillic', 'latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Fakegram',
  description: 'Учебный проект, который повторяет функционал популярной социальной сети Instagram.',
};

const RootLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang='ru'>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
