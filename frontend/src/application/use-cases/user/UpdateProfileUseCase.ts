import { UserRepository } from '@domain/repository/UserRepository'
import { UpdateUserDto, User } from '@domain/entity/User'

/**
 * Update Profile Use Case
 * Updates current user profile
 */
export class UpdateProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: UpdateUserDto): Promise<User> {
    // Validate input
    this.validateUserData(userData)

    return await this.userRepository.updateProfile(userData)
  }

  private validateUserData(userData: UpdateUserDto): void {
    if (userData.email && !this.isValidEmail(userData.email)) {
      throw new Error('Invalid email address')
    }

    if (userData.firstName !== undefined && userData.firstName.trim().length === 0) {
      throw new Error('First name cannot be empty')
    }

    if (userData.lastName !== undefined && userData.lastName.trim().length === 0) {
      throw new Error('Last name cannot be empty')
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
