import { UpdateUserDto, User } from '../entities/User'

/**
 * User Repository Interface
 * Defines the contract for user data operations
 */
export interface IUserRepository {
  /**
   * Get current user profile
   */
  getProfile(): Promise<User>

  /**
   * Update current user profile
   */
  updateProfile(userData: UpdateUserDto): Promise<User>

  /**
   * Get all users
   */
  getAllUsers(): Promise<User[]>
}
