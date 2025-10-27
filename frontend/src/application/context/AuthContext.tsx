import { createContext, useContext, useEffect, ReactNode } from 'react'
import { User } from '@domain/entity/User'
import { useAuth } from '../hooks/useAuth'
import { container } from '../di/container'
import { TokenStorage } from '@infrastructure/storage/TokenStorage'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: ReturnType<typeof useAuth>['login']
  register: ReturnType<typeof useAuth>['register']
  logout: ReturnType<typeof useAuth>['logout']
  clearError: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth()

  useEffect(() => {
    const initAuth = async () => {
      const token = TokenStorage.getToken()
      if (token && !auth.user) {
        try {
          const profile = await container.getProfileUseCase.execute()
          auth.setUser(profile)
        } catch (error) {
          TokenStorage.removeToken()
        }
      }
    }

    initAuth()
  }, [auth.user, auth.setUser])

  const value: AuthContextType = {
    user: auth.user,
    isLoading: auth.isLoading,
    error: auth.error,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
    clearError: auth.clearError,
    isAuthenticated: !!auth.user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
