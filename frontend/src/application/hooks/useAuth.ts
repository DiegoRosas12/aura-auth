import { useState, useCallback } from 'react'
import { User, CreateUserDto, LoginCredentials } from '@domain/entity/User'
import { container } from '../di/container'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = useCallback(async (userData: CreateUserDto) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await container.registerUseCase.execute(userData)
      setUser(response.user)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await container.loginUseCase.execute(credentials)
      setUser(response.user)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await container.logoutUseCase.execute()
      setUser(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    user,
    setUser,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError,
  }
}
