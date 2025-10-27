import { AuthRepository } from '@domain/repository/AuthRepository'
import { AuthResponse, LoginCredentials } from '@domain/entity/User'

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.authRepository.login(credentials)

    this.authRepository.setToken(response.token)

    return response
  }
}
