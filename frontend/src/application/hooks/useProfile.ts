import { useState, useCallback } from 'react'
import { User, UpdateUserDto } from '@/domain/dto/User'
import { container } from '../di/container'

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const user = await container.getProfileUseCase.execute()
      setProfile(user)
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (userData: UpdateUserDto) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedUser = await container.updateProfileUseCase.execute(userData)
      setProfile(updatedUser)
      return updatedUser
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile'
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
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    clearError,
  }
}
