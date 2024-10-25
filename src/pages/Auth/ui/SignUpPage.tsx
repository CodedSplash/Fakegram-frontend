'use client';

import { signUp } from '@/entities/User';
import styles from '@/pages/Auth/ui/signUp.module.css';
import { getError, isZodFlattenedError } from '@/shared/lib';
import { IAuthInitialState, IDefaultError, ISignUpData } from '@/shared/model';
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

export const SignUpPage: NextPage = () => {
  const { authButtonSize, authInputSize } = useAuthElementsSizes();
  const [state, formAction] = useFormState<
    IAuthInitialState | IDefaultError | z.typeToFlattenedError<ISignUpData>,
    FormData
  >(signUp, initialState);
  const { pending } = useFormStatus();
  const notifications = useNotifications();

  useEffect(() => {
    if (!isZodFlattenedError(state) && state.status >= 300)
      notifications.error({ text: 'Произошла ошибка. Повторите попытку.' });
  }, [state, notifications]);

  return (
    <form action={formAction} className={styles.form}>
      <Box className={styles.formContainer}>
        <Typography variant={'h1'} sx={{ fontSize: { xs: 50, sm: 72 } }} className={styles.formTitle}>
          Регистрация
        </Typography>

        <TextField
          label={'Введите ваше имя'}
          name={'name'}
          variant={'outlined'}
          type={'text'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('name', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('name', state).message : ''}
        />

        <TextField
          label={'Введите ваш логин'}
          name={'username'}
          variant={'outlined'}
          type={'text'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('username', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('username', state).message : ''}
          required
        />

        <TextField
          label={'Введите вашу почту'}
          name={'email'}
          variant={'outlined'}
          type={'email'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('email', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('email', state).message : ''}
          required
        />

        <TextField
          label={'Введите ваш пароль'}
          name={'password'}
          variant={'outlined'}
          type={'password'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('password', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('password', state).message : ''}
          required
        />

        <TextField
          id={'fullDateBirth'}
          type={'date'}
          label={'Укажите вашу дату рождения'}
          name={'fullDateBirth'}
          size={authInputSize}
          error={isZodFlattenedError(state) ? getError('date', state).isError : false}
          helperText={isZodFlattenedError(state) ? getError('date', state).message : ''}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <Button variant={'contained'} size={authButtonSize} fullWidth={true} type={'submit'} disabled={pending}>
          Зарегистрироваться
        </Button>

        <Typography variant={'body1'} sx={{ fontSize: { xs: 18, sm: 20 } }}>
          Есть аккаунт?{' '}
          <Link component={NextLink} href={'/signin'}>
            Войти
          </Link>
        </Typography>
      </Box>
    </form>
  );
};
