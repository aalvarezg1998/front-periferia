import { User, UserCredentials , Token} from '../models/User';

export interface IAuthRepository {
  login(credentials: UserCredentials): Promise<Token>;
  logout(): Promise<void>;
  getCurrentUser(username: string): Promise<User | null>;
}