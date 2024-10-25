'use client';

import { signIn } from '@/entities/User';
import styles from '@/pages/Auth/ui/signIn.module.css';
import { getError, isZodFlattenedError } from '@/shared/lib';
import { IAuthInitialState, IDefaultError, ISignInData } from '@/shared/model';
import { useAuthElementsSizes, useNotifications } from '@/shared/ui';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { z } from 'zod';

const initialState: IAuthInitialState = {
  data: {
    user: {
      id: 0,
      name: '',
      username: '',
      country: '',
      profilePhotoUrl: '',
      roles: [],
      aboutMe: '',
      registrationDate: '',
      isVerified: false,
      isPrivate: false,
    },
    jwt: {
      accessToken: '',
      refreshToken: '',
    },
  },
  status: 201,
};

export const SignInPage: NextPage = () => {
  const { authButtonSize, authInputSize } = useAuthElementsSizes();
  const [state, formAction] = useFormState<
    IAuthInitialState | IDefaultError | z.typeToFlattenedError<ISignInData>,
    FormData
  >(signIn, initialState);
  const { pending } = useFormStatus();
  const notifications = useNotifications();

  useEffect(() => {
    if (!isZodFlattenedError(state) && state.status >= 300)
      notifications.error({ text: 'Произошла ошибка. Повторите попытку.' });
  }, [state, notifications]);

  return (
    <form action={formAction} className={styles.form}>
      <Box className={styles.formContainer}>
        <Typography variant={'h1'} sx={{ fontSize: { xs: 52, sm: 72 } }} className={styles.formTitle}>
          Вход
        </Typography>

        <TextField
          label={'Введите ваш логин'}
          variant={'outlined'}
          name={'username'}
          type={'text'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('username', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('username', state).message : ''}
          required
        />

        <TextField
          label={'Введите ваш пароль'}
          variant={'outlined'}
          name={'password'}
          type={'password'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('password', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('password', state).message : ''}
          required
        />

        <Button variant={'contained'} size={authButtonSize} fullWidth={true} type={'submit'} disabled={pending}>
          Войти
        </Button>

        <Typography variant={'body1'} sx={{ fontSize: { xs: 18, sm: 20 } }}>
          Нет аккаунта?{' '}
          <Link component={NextLink} href={'/signup'}>
            Зарегистрироваться
          </Link>
        </Typography>
      </Box>
    </form>
  );
};
