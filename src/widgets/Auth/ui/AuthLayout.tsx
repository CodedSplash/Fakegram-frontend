'use client';

import styles from '@/widgets/Auth/ui/authLayout.module.css';
import { Box, useTheme } from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const AuthLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const [style, setStyle] = useState<Record<string, string> | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    if (theme.palette.mode === 'light') setStyle({ filter: 'brightness(0%)' });
    else setStyle(undefined);
  }, [theme]);

  return (
    <Box className={styles.container}>
      <Box className={styles.imageContainer}>
        <Image
          src={'/images/auth/noBgLogo.svg'}
          width={500}
          height={600}
          alt={'Логотип социальной сети Fakegram'}
          style={style}
          className={styles.image}
          priority
        />
      </Box>
      <Box className={styles.formContainer}>{children}</Box>
    </Box>
  );
};
