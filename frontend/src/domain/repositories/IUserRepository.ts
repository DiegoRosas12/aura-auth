import { UpdateUserDto, User } from '../entities/User'

export interface IUserRepository {
  getProfile(): Promise<User>
  updateProfile(userData: UpdateUserDto): Promise<User>
  getAllUsers(): Promise<User[]>
}
