import { IAuthRepository } from '../../domain/interfaces/IAuthRepository';
import { User, UserCredentials, Token } from '../../domain/models/User';
import { loginApi, logoutApi, getCurrentUserApi } from '../api/authApi';

export class AuthRepository implements IAuthRepository {
  async login(credentials: UserCredentials): Promise<Token> {
    return loginApi(credentials);
  }

  async logout(): Promise<void> {
    await logoutApi();
  }

  async getCurrentUser(username: string): Promise<User | null> {
    return getCurrentUserApi(username);
  }
}