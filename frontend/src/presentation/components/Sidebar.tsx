import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '@application/context/AuthContext'
import { Search, Home, User, Users, Upload, Brain, LogOut } from 'lucide-react'

const logoUrl = '/aura-logo.svg'

interface NavItem {
  path: string
  icon: React.ReactNode
  label: string
}

export const Sidebar = () => {
  const location = useLocation()
  const { logout } = useAuthContext()

  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      icon: <Home className="h-6 w-6" />,
      label: 'Dashboard',
    },
    {
      path: '/profile',
      icon: <User className="h-6 w-6" />,
      label: 'Profile',
    },
    {
      path: '/users',
      icon: <Users className="h-6 w-6" />,
      label: 'Users',
    },
    {
      path: '/search-data',
      icon: <Search className="h-6 w-6" />,
      label: 'Search Data',
    },
    {
      path: '/upload-data',
      icon: <Upload className="h-6 w-6" />,
      label: 'Upload Data',
    },
    {
      path: '/ask-ai',
      icon: <Brain className="h-6 w-6" />,
      label: 'Ask AI',
    },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="fixed left-0 top-0 h-screen w-[104px] bg-[#1b093c] flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-[66px] w-[90px] h-[64px]">
        <img src={logoUrl} alt="Aura Logo" className="w-full h-full object-contain" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-[16px] flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              w-[24px] h-[24px] flex items-center justify-center
              transition-colors duration-200
              ${isActive(item.path) ? 'text-white' : 'text-white/60 hover:text-white/80'}
            `}
            title={item.label}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-[24px] h-[24px] flex items-center justify-center text-white/60 hover:text-white/80 transition-colors duration-200 mt-auto"
        title="Logout"
      >
        <LogOut className="h-6 w-6" />
      </button>
    </aside>
  )
}
