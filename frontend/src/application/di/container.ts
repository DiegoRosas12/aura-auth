import { authRepository } from '@infrastructure/repository/AuthRepository'
import { userRepository } from '@infrastructure/repository/UserRepository'
import { RegisterUseCase } from '../use-cases/auth/RegisterUseCase'
import { LoginUseCase } from '../use-cases/auth/LoginUseCase'
import { LogoutUseCase } from '../use-cases/auth/LogoutUseCase'
import { GetProfileUseCase } from '../use-cases/user/GetProfileUseCase'
import { UpdateProfileUseCase } from '../use-cases/user/UpdateProfileUseCase'
import { GetAllUsersUseCase } from '../use-cases/user/GetAllUsersUseCase'

class Container {
  private authRepo = authRepository
  private userRepo = userRepository

  readonly registerUseCase = new RegisterUseCase(this.authRepo)
  readonly loginUseCase = new LoginUseCase(this.authRepo)
  readonly logoutUseCase = new LogoutUseCase(this.authRepo)

  readonly getProfileUseCase = new GetProfileUseCase(this.userRepo)
  readonly updateProfileUseCase = new UpdateProfileUseCase(this.userRepo)
  readonly getAllUsersUseCase = new GetAllUsersUseCase(this.userRepo)
}

export const container = new Container()
