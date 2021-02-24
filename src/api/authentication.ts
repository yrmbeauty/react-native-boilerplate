import axios from './axios';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: 'funder' | 'spender';
  status: 'registered';
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const signIn = async (
  login: string,
  password: string,
): Promise<LoginResponse> => {
  const response: LoginResponse = await axios.post('/auth/sign-in', {
    login,
    password,
  });

  return response;
};

export const checkUser = async (): Promise<User> => {
  const response: User = await axios.get('/auth/me');
  
  return response;
};
