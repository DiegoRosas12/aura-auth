import { environment } from '@infrastructure/config/environment'

// Repositories
import { authRepository } from '@infrastructure/repositories/AuthRepository'
import { userRepository } from '@infrastructure/repositories/UserRepository'
import { mockAuthRepository } from '@infrastructure/repositories/MockAuthRepository'
import { mockUserRepository } from '@infrastructure/repositories/MockUserRepository'

// Use Cases
import { RegisterUseCase } from '../use-cases/auth/RegisterUseCase'
import { LoginUseCase } from '../use-cases/auth/LoginUseCase'
import { LogoutUseCase } from '../use-cases/auth/LogoutUseCase'
import { GetProfileUseCase } from '../use-cases/user/GetProfileUseCase'
import { UpdateProfileUseCase } from '../use-cases/user/UpdateProfileUseCase'
import { GetAllUsersUseCase } from '../use-cases/user/GetAllUsersUseCase'

/**
 * Dependency Injection Container
 * Provides singleton instances of use cases
 */
class Container {
  // Select repositories based on environment
  private authRepo = environment.useMockApi ? mockAuthRepository : authRepository
  private userRepo = environment.useMockApi ? mockUserRepository : userRepository

  // Auth Use Cases
  readonly registerUseCase = new RegisterUseCase(this.authRepo)
  readonly loginUseCase = new LoginUseCase(this.authRepo)
  readonly logoutUseCase = new LogoutUseCase(this.authRepo)

  // User Use Cases
  readonly getProfileUseCase = new GetProfileUseCase(this.userRepo)
  readonly updateProfileUseCase = new UpdateProfileUseCase(this.userRepo)
  readonly getAllUsersUseCase = new GetAllUsersUseCase(this.userRepo)
}

export const container = new Container()
