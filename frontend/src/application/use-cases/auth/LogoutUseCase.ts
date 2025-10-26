import { AuthRepository } from '@domain/repository/AuthRepository'

/**
 * Logout Use Case
 * Handles user logout business logic
 */
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout()
  }
}
