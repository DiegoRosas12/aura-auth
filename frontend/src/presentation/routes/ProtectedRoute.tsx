import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@application/context/AuthContext'
import { ReactNode } from 'react'
import { Spinner } from '../components/atoms/Spinner'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
