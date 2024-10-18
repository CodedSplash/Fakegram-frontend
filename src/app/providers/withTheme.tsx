'use client';

import { CssBaseline } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

const theme = extendTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export const GlobalThemeProvider: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CssVarsProvider theme={theme} modeStorageKey='currentTheme' defaultMode={'system'}>
      <CssBaseline enableColorScheme />
      {children}
    </CssVarsProvider>
  );
};
