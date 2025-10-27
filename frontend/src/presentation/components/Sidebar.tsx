import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '@application/context/AuthContext'

const logoUrl = 'http://localhost:3845/assets/f94db1f806ff8461cb373aa834ee481f2439c849.png'

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const LogOutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

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
      path: '/search-data',
      icon: <SearchIcon />,
      label: 'Search Data',
    },
    {
      path: '/dashboard',
      icon: <HomeIcon />,
      label: 'Dashboard',
    },
    {
      path: '/profile',
      icon: <UserIcon />,
      label: 'Profile',
    },
    {
      path: '/users',
      icon: <UsersIcon />,
      label: 'Users',
    },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="fixed left-0 top-0 h-screen w-[104px] bg-[#1b093c] flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-[66px] w-[90px] h-[64px]">
        <img 
          src={logoUrl} 
          alt="Aura Logo" 
          className="w-full h-full object-contain"
        />
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
        <LogOutIcon />
      </button>
    </aside>
  )
}
