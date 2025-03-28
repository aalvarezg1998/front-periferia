import { User, UserCredentials, Token } from '../../domain/models/User';
import { authApiClient, userApiClient } from '../../../shared/utils/apiClient';


export const loginApi = async (credentials: UserCredentials): Promise<Token> => {
  try {
    return await authApiClient.post<Token>(`/login`, credentials);
  } catch (error) {
    throw new Error('Error de inicio de sesión');
  }
};

export const logoutApi = async (): Promise<void> => {
  try {
    localStorage.removeItem('userToken');
  } catch (error) {
    throw new Error('Error de cierre de sesión');
  }
};

export const getCurrentUserApi = async (username: string): Promise<User | null> => {
  try {
    return await userApiClient.get<User>(`?id=${username}`);
  } catch (error) {
    return null;
  }
};