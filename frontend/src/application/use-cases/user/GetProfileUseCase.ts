import { UserRepository } from '@domain/repository/UserRepository'
import { User } from '@domain/entity/User'

export class GetProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    return await this.userRepository.getProfile()
  }
}
