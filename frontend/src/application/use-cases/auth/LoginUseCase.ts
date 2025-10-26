import { AuthRepository } from '@domain/repository/AuthRepository'
import { AuthResponse, LoginCredentials } from '@domain/entity/User'

/**
 * Login Use Case
 * Handles user login business logic
 */
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate credentials
    this.validateCredentials(credentials)

    // Login user
    const response = await this.authRepository.login(credentials)

    // Store token
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
