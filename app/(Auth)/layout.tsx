import { NextPage } from 'next';
import React from 'react';
import { AuthLayout } from '@/widgets/Auth';

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
