import { UserRepository as UserRepositoryInterface } from '@domain/repository/UserRepository'
import { UpdateUserDto, User } from '@/domain/dto/User'
import { httpClient } from '../http/HttpClient'
import { API_ENDPOINTS } from '../config/environment'
import { UserMapper, UserDto } from '../mapper/UserMapper'

export class UserRepositoryImpl implements UserRepositoryInterface {
  async getProfile(): Promise<User> {
    const response = await httpClient.get<{ data: UserDto }>(API_ENDPOINTS.users.profile)
    return UserMapper.toDomain(response.data)
  }

  async updateProfile(userData: UpdateUserDto): Promise<User> {
    const response = await httpClient.put<{ data: UserDto }>(API_ENDPOINTS.users.profile, userData)
    return UserMapper.toDomain(response.data)
  }

  async getAllUsers(): Promise<User[]> {
    const response = await httpClient.get<{ data: UserDto[] }>(API_ENDPOINTS.users.list)
    return UserMapper.toDomainList(response.data)
  }
}

export const userRepository = new UserRepositoryImpl()
