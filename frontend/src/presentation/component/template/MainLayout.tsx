import { ReactNode } from 'react'
import { Sidebar } from '../organism/Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-[104px] py-0 px-0">{children}</main>
    </div>
  )
}
