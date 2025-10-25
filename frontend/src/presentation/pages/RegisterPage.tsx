import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '../components/templates/AuthLayout'
import { Input } from '../components/atoms/Input'
import { Button } from '../components/atoms/Button'
import { Alert } from '../components/atoms/Alert'

/**
 * Register Page
 * New user registration page
 */
export const RegisterPage = () => {
  const { register, isLoading, error, clearError } = useAuthContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await register(formData)
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
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              placeholder=""
              required
              autoComplete="given-name"
            />

            <Input
              label="Last Name"
              type="text"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              placeholder=""
              required
              autoComplete="family-name"
            />

            <Input
              label="Email"
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
              autoComplete="new-password"
              helperText="Must be at least 6 characters"
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        {/* Sign in link */}
        <div className="mt-8 text-center text-sm">
          <span className="text-white">Already have an account? </span>
          <Link to="/login" className="font-medium text-white hover:text-gray-300 underline">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
