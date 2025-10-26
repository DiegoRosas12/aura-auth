import { UpdateUserDto, User } from '../entity/User'

export interface UserRepository {
  getProfile(): Promise<User>
  updateProfile(userData: UpdateUserDto): Promise<User>
  getAllUsers(): Promise<User[]>
}
