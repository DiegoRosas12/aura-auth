import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '../components/templates/AuthLayout'
import { Input } from '../components/atoms/Input'
import { Button } from '../components/atoms/Button'
import { Alert } from '../components/atoms/Alert'

/**
 * Login Page
 * User authentication page
 */
export const LoginPage = () => {
  const { login, isLoading, error, clearError } = useAuthContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login(formData)
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by context
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        {/* Welcome Title */}
        <h1 className="text-white text-[48px] font-bold leading-[1.2] tracking-[0.48px] text-center mb-[122px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
          Welcome
        </h1>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" onClose={clearError} className="mb-4 w-[320px]">
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[40px]">
          <div className="flex flex-col gap-[32px]">
            <Input
              label="User"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder=""
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder=""
              required
              autoComplete="current-password"
              helperText="Optional"
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Continue
          </Button>
        </form>

        {/* Sign up link */}
        <div className="mt-8 text-center text-sm">
          <span className="text-white">Don't have an account? </span>
          <Link to="/register" className="font-medium text-white hover:text-gray-300 underline">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
