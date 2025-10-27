export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UpdateUserDto {
  email?: string
  firstName?: string
  lastName?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}
