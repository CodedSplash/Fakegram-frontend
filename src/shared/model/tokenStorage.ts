const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

export const saveAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};
