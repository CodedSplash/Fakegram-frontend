import { SignInPage } from '@/pages/Auth';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Авторизация | Fakegram',
  description: 'Авторизуйтесь в социальной сети Fakegram, чтобы иметь возможность пользоваться всеми её функциями.',
};

const Page: NextPage = () => {
  return <SignInPage />;
};

export default Page;
