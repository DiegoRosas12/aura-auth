import { UserRepository } from '@domain/repository/UserRepository'
import { User } from '@domain/entity/User'

/**
 * Get All Users Use Case
 * Retrieves list of all users
 */
export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }
}
