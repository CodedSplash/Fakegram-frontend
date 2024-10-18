import { GlobalThemeProvider } from '@/app/providers';
import { NotificationsProvider } from '@/app/providers/@x/withNotifications';
import '@/app/styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
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
        <AppRouterCacheProvider>
          <GlobalThemeProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </GlobalThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
