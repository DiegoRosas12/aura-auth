import { AuthRepository } from '@domain/repository/AuthRepository'
import { AuthResponse, CreateUserDto } from '@domain/entity/User'

/**
 * Register Use Case
 * Handles user registration business logic
 */
export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: CreateUserDto): Promise<AuthResponse> {
    // Validate input
    this.validateUserData(userData)

    // Register user
    const response = await this.authRepository.register(userData)

    // Store token
    this.authRepository.setToken(response.token)

    return response
  }

  private validateUserData(userData: CreateUserDto): void {
    if (!userData.email || !this.isValidEmail(userData.email)) {
      throw new Error('Invalid email address')
    }

    if (!userData.password || userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    if (!userData.firstName || userData.firstName.trim().length === 0) {
      throw new Error('First name is required')
    }

    if (!userData.lastName || userData.lastName.trim().length === 0) {
      throw new Error('Last name is required')
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
