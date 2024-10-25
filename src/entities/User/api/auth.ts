'use server';

import { api } from '@/shared/api';
import { IAuthInitialState, IAuthResponse, IDefaultError, ISignUpData } from '@/shared/model';
import { z } from 'zod';

const authErrorData: IDefaultError = {
  data: {
    status: 500,
    error: 'Произошла ошибка на стороне сервера!',
    path: '',
    detailedError: {},
  },
  status: 500,
};

const SignUpSchema = z.object({
  name: z.optional(
    z.coerce
      .string()
      .trim()
      .min(2, 'Минимальная длина имени должна быть 2 символа')
      .max(50, 'Максимальная длина имени должна быть 50 символов'),
  ),
  username: z
    .string()
    .trim()
    .min(6, 'Минимальная длина логина должна быть 6 символов')
    .max(20, 'Максимальная длина логина должна быть 20 символов'),
  email: z.string().trim().email('Введите действительную почту'),
  password: z
    .string()
    .trim()
    .min(8, 'Минимальная длина пароля должна быть 8 символов')
    .max(15, 'Максимальная длина пароля должна быть 15 символов'),
  fullDateBirth: z.string().trim().date('Введите дату'),
});

export async function signUp(
  _prevState: IAuthInitialState | IDefaultError | z.typeToFlattenedError<ISignUpData>,
  formData: FormData,
): Promise<IAuthInitialState | IDefaultError | z.typeToFlattenedError<ISignUpData>> {
  const rawFormData = {
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    fullDateBirth: formData.get('fullDateBirth'),
  };

  const validateSignUpData = SignUpSchema.safeParse(rawFormData);

  if (!validateSignUpData.success) {
    return validateSignUpData.error.flatten();
  }

  rawFormData.fullDateBirth = new Date(String(formData.get('fullDateBirth'))).toISOString();

  try {
    const { data, status } = await api.post<IAuthResponse>('/auth/registration', rawFormData);

    return { data, status };
  } catch {
    return { data: authErrorData.data, status: 500 };
  }
}
