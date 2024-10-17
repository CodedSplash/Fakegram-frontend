import { NotificationsProvider } from '@/app/providers/@x/withNotifications';
import '@/app/styles/globals.css';
import type { Metadata, NextPage } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Fakegram',
  description: 'Учебный проект, который повторяет функционал популярной социальной сети Instagram.',
};

const RootLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang='ru'>
      <body>
        <NotificationsProvider>{children}</NotificationsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
