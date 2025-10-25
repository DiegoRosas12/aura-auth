import { ReactNode } from 'react'
import { Navbar } from '../organisms/Navbar'

interface MainLayoutProps {
  children: ReactNode
}

/**
 * Main Layout
 * Layout for authenticated pages with navbar
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-custom py-8">{children}</main>
    </div>
  )
}
