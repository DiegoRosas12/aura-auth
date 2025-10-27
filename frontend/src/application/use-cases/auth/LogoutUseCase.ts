import { AuthRepository } from '@domain/repository/AuthRepository'

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout()
  }
}
