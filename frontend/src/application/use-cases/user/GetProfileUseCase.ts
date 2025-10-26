import { UserRepository } from '@domain/repository/UserRepository'
import { User } from '@domain/entity/User'

/**
 * Get Profile Use Case
 * Retrieves current user profile
 */
export class GetProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    return await this.userRepository.getProfile()
  }
}
