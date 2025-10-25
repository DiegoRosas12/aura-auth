import { IUserRepository } from '@domain/repositories/IUserRepository'
import { User } from '@domain/entities/User'

/**
 * Get Profile Use Case
 * Retrieves current user profile
 */
export class GetProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User> {
    return await this.userRepository.getProfile()
  }
}
