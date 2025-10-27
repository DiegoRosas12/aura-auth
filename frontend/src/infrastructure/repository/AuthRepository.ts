import { AuthRepository as AuthRepositoryInterface } from '@domain/repository/AuthRepository'
import { AuthResponse, CreateUserDto, LoginCredentials } from '@domain/entity/User'
import { httpClient } from '../http/HttpClient'
import { API_ENDPOINTS } from '../config/environment'
import { UserMapper, UserDto } from '../mapper/UserMapper'
import { TokenStorage } from '../storage/TokenStorage'

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
    TokenStorage.removeToken()
  }

  getToken(): string | null {
    return TokenStorage.getToken()
  }

  setToken(token: string): void {
    TokenStorage.setToken(token)
  }

  removeToken(): void {
    TokenStorage.removeToken()
  }
}

export const authRepository = new AuthRepositoryImpl()
