import { z } from 'zod';

interface ErrorResult {
  isError: boolean;
  message: string;
}

export const getError = <T extends z.typeToFlattenedError<Record<string, any>>>(
  propName: string,
  validationData: T | null,
): ErrorResult => {
  if (!validationData?.fieldErrors) {
    return { isError: false, message: '' };
  }

  const error = validationData.fieldErrors[propName];

  if (error) {
    return {
      isError: true,
      message: error[0],
    };
  }

  return { isError: false, message: '' };
};

export const isZodFlattenedError = (error: any): error is z.typeToFlattenedError<Record<string, any>> => {
  return typeof error === 'object' && error !== null && 'formErrors' in error && 'fieldErrors' in error;
};
