import { IUserRepository } from '@domain/repositories/IUserRepository'
import { User } from '@domain/entities/User'

/**
 * Get All Users Use Case
 * Retrieves list of all users
 */
export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }
}
