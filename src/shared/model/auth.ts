enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface IUser {
  id: number;
  name?: string;
  username: string;
  country?: string;
  profilePhotoUrl?: string;
  roles: Role[];
  aboutMe?: string;
  registrationDate?: string;
  isVerified?: boolean;
  isPrivate?: boolean;
}

interface IJwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser;
  jwt: IJwtTokens;
}

export interface IAuthInitialState {
  data: IAuthResponse;
  status: number;
}

export interface ISignUpData {
  name?: string;
  username: string;
  email: string;
  password: string;
  fullDateBirth: string;
}

interface ErrorData {
  status: number;
  path: string;
  detailedError?: any;
}

interface DefaultErrorData extends ErrorData {
  error: string;
}

export interface IDefaultError {
  data: DefaultErrorData;
  status: number;
}
