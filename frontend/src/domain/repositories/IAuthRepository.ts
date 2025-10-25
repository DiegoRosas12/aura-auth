import { AuthResponse, CreateUserDto, LoginCredentials } from '../entities/User'

/**
 * Authentication Repository Interface
 * Defines the contract for authentication operations
 */
export interface IAuthRepository {
  /**
   * Register a new user
   */
  register(userData: CreateUserDto): Promise<AuthResponse>

  /**
   * Login with credentials
   */
  login(credentials: LoginCredentials): Promise<AuthResponse>

  /**
   * Logout current user
   */
  logout(): Promise<void>

  /**
   * Get stored authentication token
   */
  getToken(): string | null

  /**
   * Store authentication token
   */
  setToken(token: string): void

  /**
   * Remove authentication token
   */
  removeToken(): void
}
