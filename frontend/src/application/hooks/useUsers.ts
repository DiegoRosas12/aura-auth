import { useState, useCallback } from 'react'
import { User } from '@/domain/dto/User'
import { container } from '../di/container'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const usersList = await container.getAllUsersUseCase.execute()
      setUsers(usersList)
      return usersList
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users'
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
    users,
    isLoading,
    error,
    fetchUsers,
    clearError,
  }
}
