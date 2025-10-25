/**
 * User Entity
 * Represents the core user domain model
 */
export interface User {
  id: string // UUID
  email: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}

/**
 * User creation data (for registration)
 */
export interface CreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
}

/**
 * User update data (for profile updates)
 */
export interface UpdateUserDto {
  email?: string
  firstName?: string
  lastName?: string
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Authentication response
 */
export interface AuthResponse {
  user: User
  token: string
}
