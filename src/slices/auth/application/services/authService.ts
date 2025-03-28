import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import { Token, User, UserCredentials } from '../../domain/models/User';

export class AuthService {
  private readonly authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(credentials: UserCredentials): Promise<Token> {
    try {
      const user = await this.authRepository.login(credentials);
      
      // Guardar token en localStorage
      if (user) {
        localStorage.setItem('token', 'user-token-placeholder');
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    } catch (error) {
      throw new Error('Error de autenticación');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authRepository.logout();
      
      // Limpiar almacenamiento local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      throw new Error('Error al cerrar sesión');
    }
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}