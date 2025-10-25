import { IAuthRepository } from '@domain/repositories/IAuthRepository'
import { AuthResponse, CreateUserDto, LoginCredentials } from '@domain/entities/User'
import { MockApi } from '../mock/MockApi'

const AUTH_TOKEN_KEY = 'auth_token'

/**
 * Mock Authentication Repository
 * Uses MockApi instead of real HTTP calls
 */
export class MockAuthRepository implements IAuthRepository {
  async register(userData: CreateUserDto): Promise<AuthResponse> {
    const response = await MockApi.register(userData)
    return response
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await MockApi.login(credentials)
    return response
  }

  async logout(): Promise<void> {
    MockApi.clearCurrentUser()
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

export const mockAuthRepository = new MockAuthRepository()
