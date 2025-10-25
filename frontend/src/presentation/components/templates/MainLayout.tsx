import { ReactNode } from 'react'
import { Sidebar } from '../organisms/Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

/**
 * Main Layout
 * Layout for authenticated pages with sidebar
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-[104px] py-8 px-6">{children}</main>
    </div>
  )
}
