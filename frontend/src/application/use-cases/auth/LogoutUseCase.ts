import { IAuthRepository } from '@domain/repositories/IAuthRepository'

/**
 * Logout Use Case
 * Handles user logout business logic
 */
export class LogoutUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout()
  }
}
