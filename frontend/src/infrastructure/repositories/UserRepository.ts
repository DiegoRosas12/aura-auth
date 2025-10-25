import { IUserRepository } from '@domain/repositories/IUserRepository'
import { UpdateUserDto, User } from '@domain/entities/User'
import { httpClient } from '../http/HttpClient'
import { API_ENDPOINTS } from '../config/environment'
import { UserMapper, UserDto } from '../mappers/UserMapper'

/**
 * User Repository Implementation
 */
export class UserRepository implements IUserRepository {
  async getProfile(): Promise<User> {
    const response = await httpClient.get<UserDto>(API_ENDPOINTS.users.profile)
    return UserMapper.toDomain(response)
  }

  async updateProfile(userData: UpdateUserDto): Promise<User> {
    const response = await httpClient.put<UserDto>(API_ENDPOINTS.users.profile, userData)
    return UserMapper.toDomain(response)
  }

  async getAllUsers(): Promise<User[]> {
    const response = await httpClient.get<UserDto[]>(API_ENDPOINTS.users.list)
    return UserMapper.toDomainList(response)
  }
}

// Singleton instance
export const userRepository = new UserRepository()
