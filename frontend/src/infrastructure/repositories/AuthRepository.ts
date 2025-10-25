import { IAuthRepository } from '@domain/repositories/IAuthRepository'
import { AuthResponse, CreateUserDto, LoginCredentials } from '@domain/entities/User'
import { httpClient } from '../http/HttpClient'
import { API_ENDPOINTS } from '../config/environment'
import { UserMapper, UserDto } from '../mappers/UserMapper'

const AUTH_TOKEN_KEY = 'auth_token'

/**
 * Authentication Repository Implementation
 */
export class AuthRepository implements IAuthRepository {
  async register(userData: CreateUserDto): Promise<AuthResponse> {
    const response = await httpClient.post<{ user: UserDto; token: string }>(
      API_ENDPOINTS.auth.register,
      userData
    )

    return {
      user: UserMapper.toDomain(response.user),
      token: response.token,
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<{ user: UserDto; token: string }>(
      API_ENDPOINTS.auth.login,
      credentials
    )

    return {
      user: UserMapper.toDomain(response.user),
      token: response.token,
    }
  }

  async logout(): Promise<void> {
    this.removeToken()
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  }

  removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

// Singleton instance
export const authRepository = new AuthRepository()
