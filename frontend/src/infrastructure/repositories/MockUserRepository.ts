import { IUserRepository } from '@domain/repositories/IUserRepository'
import { UpdateUserDto, User } from '@domain/entities/User'
import { MockApi } from '../mock/MockApi'

/**
 * Mock User Repository
 * Uses MockApi instead of real HTTP calls
 */
export class MockUserRepository implements IUserRepository {
  async getProfile(): Promise<User> {
    return await MockApi.getProfile()
  }

  async updateProfile(userData: UpdateUserDto): Promise<User> {
    const currentUser = await MockApi.getProfile()
    return await MockApi.updateProfile(currentUser.id, userData)
  }

  async getAllUsers(): Promise<User[]> {
    return await MockApi.getAllUsers()
  }
}

export const mockUserRepository = new MockUserRepository()
