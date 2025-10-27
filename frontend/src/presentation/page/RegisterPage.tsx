import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '@presentation/components/AuthLayout'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '@presentation/components/Alert'
import { UserValidationService } from '@domain/service/UserValidationService'

export const RegisterPage = () => {
  const { register, isLoading, error, clearError } = useAuthContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [isFormValid, setIsFormValid] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await register(formData)
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by AuthContext and displayed via error state
    }
  }

  useEffect(() => {
    const validation = UserValidationService.validateRegistrationForm(formData)
    setIsFormValid(validation.isValid)

    if (formData.password) {
      const passwordValidation = UserValidationService.validatePasswordStrength(formData.password)
      setPasswordErrors(passwordValidation.errors)
    } else {
      setPasswordErrors([])
    }
  }, [formData])

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-white text-[48px] font-bold leading-[1.2] tracking-[0.48px] text-center mb-[122px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
          Welcome
        </h1>

        {error && (
          <Alert variant="error" onClose={clearError} className="mb-4 w-[320px]">
            {error}
          </Alert>
        )}

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
              helperText={passwordErrors.length > 0 ? passwordErrors[0] : 'Must be at least 8 characters with uppercase, lowercase, and numbers'}
            />

            {formData.password && passwordErrors.length > 0 && (
              <div className="w-[320px] -mt-4">
                <ul className="text-xs text-red-500 space-y-1">
                  {passwordErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} disabled={!isFormValid || isLoading}>
            Create Account
          </Button>
        </form>

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
