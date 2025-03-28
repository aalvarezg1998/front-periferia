import { IAuthRepository } from '../../domain/interfaces/IAuthRepository';
import { UserCredentials, Token } from '../../domain/models/User';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: UserCredentials): Promise<Token> {
    return this.authRepository.login(credentials);
  }
}