import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

/**
 * Authentication Layout
 * Layout for login and register pages
 */
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">{children}</div>
    </div>
  )
}
