import { AuthRepository as AuthRepositoryInterface } from '@domain/repository/AuthRepository'
import { AuthResponse, CreateUserDto, LoginCredentials } from '@domain/entity/User'
import { httpClient } from '../http/HttpClient'
import { API_ENDPOINTS } from '../config/environment'
import { UserMapper, UserDto } from '../mapper/UserMapper'

const AUTH_TOKEN_KEY = 'auth_token'

export class AuthRepositoryImpl implements AuthRepositoryInterface {
  async register(userData: CreateUserDto): Promise<AuthResponse> {
    const response = await httpClient.post<{ data: { user: UserDto; token: string } }>(
      API_ENDPOINTS.auth.register,
      userData
    )

    if (!response || !response.data || !response.data.user || !response.data.token) {
      throw new Error('Invalid response from server: missing user or token data')
    }

    return {
      user: UserMapper.toDomain(response.data.user),
      token: response.data.token,
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<{ data: { user: UserDto; token: string } }>(
      API_ENDPOINTS.auth.login,
      credentials
    )

    if (!response || !response.data || !response.data.user || !response.data.token) {
      throw new Error('Invalid response from server: missing user or token data')
    }

    return {
      user: UserMapper.toDomain(response.data.user),
      token: response.data.token,
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

export const authRepository = new AuthRepositoryImpl()
