import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const logoUrl = '/aura-logo-complete.svg'

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#1b093c] relative">
      <div className="absolute left-[37px] top-[22px] h-[45px] w-[150px]">
        <img src={logoUrl} alt="Aura Solutions Logo" className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center justify-center min-h-screen">{children}</div>
    </div>
  )
}
