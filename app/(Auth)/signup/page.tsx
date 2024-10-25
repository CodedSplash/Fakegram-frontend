import { SignUpPage } from '@/pages/Auth';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Регистрация | Fakegram',
  description: 'Зарегистрируйтесь в социальной сети Fakegram, чтобы иметь возможность пользоваться всеми её функциями.',
};

const Page: NextPage = () => {
  return <SignUpPage />;
};

export default Page;
