import { User, CreateUserDto, LoginCredentials, AuthResponse } from '@domain/entities/User'
import { AuthError, ValidationError } from '@domain/errors/AppError'

/**
 * Mock API for local testing
 * Simulates backend API responses
 */
export class MockApi {
  private static users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '3',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ]

  private static currentUserId: string | null = null
  private static mockToken = 'mock-jwt-token-12345'

  /**
   * Simulate network delay
   */
  private static delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Register new user
   */
  static async register(userData: CreateUserDto): Promise<AuthResponse> {
    await this.delay()

    // Validate email uniqueness
    if (this.users.some((u) => u.email === userData.email)) {
      throw new ValidationError('Email already exists', { email: 'This email is already taken' })
    }

    const newUser: User = {
      id: String(this.users.length + 1),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(newUser)
    this.currentUserId = newUser.id

    return {
      user: newUser,
      token: this.mockToken,
    }
  }

  /**
   * Login user
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay()

    const user = this.users.find((u) => u.email === credentials.email)

    if (!user) {
      throw new AuthError('Invalid email or password')
    }

    // In mock, accept any password for demo purposes
    this.currentUserId = user.id

    return {
      user,
      token: this.mockToken,
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<User> {
    await this.delay()

    if (!this.currentUserId) {
      throw new AuthError('Not authenticated')
    }

    const user = this.users.find((u) => u.id === this.currentUserId)

    if (!user) {
      throw new AuthError('User not found')
    }

    return user
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await this.delay()

    const userIndex = this.users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new AuthError('User not found')
    }

    // Check email uniqueness if email is being updated
    if (updates.email && updates.email !== this.users[userIndex].email) {
      if (this.users.some((u) => u.email === updates.email)) {
        throw new ValidationError('Email already exists', {
          email: 'This email is already taken',
        })
      }
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date(),
    }

    return this.users[userIndex]
  }

  /**
   * Get all users
   */
  static async getAllUsers(): Promise<User[]> {
    await this.delay()

    if (!this.currentUserId) {
      throw new AuthError('Not authenticated')
    }

    return [...this.users]
  }

  /**
   * Set current user (for testing)
   */
  static setCurrentUser(userId: string): void {
    this.currentUserId = userId
  }

  /**
   * Clear current user
   */
  static clearCurrentUser(): void {
    this.currentUserId = null
  }
}
