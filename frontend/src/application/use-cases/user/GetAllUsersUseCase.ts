import { UserRepository } from '@domain/repository/UserRepository'
import { User } from '@/domain/dto/User'

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }
}
