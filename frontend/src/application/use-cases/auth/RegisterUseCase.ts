import { AuthRepository } from '@domain/repository/AuthRepository'
import { AuthResponse, CreateUserDto } from '@/domain/dto/User'

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: CreateUserDto): Promise<AuthResponse> {
    const response = await this.authRepository.register(userData)

    this.authRepository.setToken(response.token)

    return response
  }
}
