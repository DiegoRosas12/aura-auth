import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '@presentation/components/AuthLayout'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '@presentation/components/Alert'
import { loginSchema, type LoginFormData } from '@domain/validation/authSchemas'

export const LoginPage = () => {
  const { login, isLoading, error, clearError } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    try {
      await login(data)
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by AuthContext and displayed via error state
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-[40px]">
          <div className="flex flex-col gap-[32px]">
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
              autoComplete="current-password"
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
