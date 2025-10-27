import { AuthRepository } from '@domain/repository/AuthRepository'
import { AuthResponse, LoginCredentials } from '@domain/entity/User'

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    this.validateCredentials(credentials)

    const response = await this.authRepository.login(credentials)

    this.authRepository.setToken(response.token)

    return response
  }

  private validateCredentials(credentials: LoginCredentials): void {
    if (!credentials.email || credentials.email.trim().length === 0) {
      throw new Error('Email is required')
    }

    if (!credentials.password || credentials.password.trim().length === 0) {
      throw new Error('Password is required')
    }
  }
}
