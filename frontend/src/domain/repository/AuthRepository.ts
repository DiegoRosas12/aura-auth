import { AuthResponse, CreateUserDto, LoginCredentials } from '../dto/User'

export interface AuthRepository {
  register(userData: CreateUserDto): Promise<AuthResponse>

  login(credentials: LoginCredentials): Promise<AuthResponse>

  logout(): Promise<void>

  getToken(): string | null

  setToken(token: string): void

  removeToken(): void
}
