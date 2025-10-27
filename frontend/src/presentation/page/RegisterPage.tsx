import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '@presentation/components/AuthLayout'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '@presentation/components/Alert'
import { registerSchema, type RegisterFormData } from '@domain/validation/authSchemas'

export const RegisterPage = () => {
  const { register: registerUser, isLoading, error, clearError } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    try {
      await registerUser(data)
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by AuthContext and displayed via error state
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-[40px]">
          <div className="flex flex-col gap-[32px]">
            <Input
              label="First Name"
              type="text"
              {...register('firstName')}
              error={errors.firstName?.message}
              autoComplete="given-name"
            />

            <Input
              label="Last Name"
              type="text"
              {...register('lastName')}
              error={errors.lastName?.message}
              autoComplete="family-name"
            />

            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              autoComplete="new-password"
              helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} disabled={!isValid || isLoading}>
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
