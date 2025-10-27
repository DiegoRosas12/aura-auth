import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Input, VStack, Text, Alert, CloseButton, Heading } from '@chakra-ui/react'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '@presentation/components/AuthLayout'
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
      <VStack align="center" gap={8}>
        {/* Welcome Title */}
        <Heading
          color="white"
          fontSize="48px"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
        >
          Welcome
        </Heading>

        {/* Error Alert */}
        {error && (
          <Alert.Root status="error" w="320px" mb={4}>
            <Alert.Indicator />
            <Box flex="1">{error}</Box>
            <CloseButton onClick={clearError} />
          </Alert.Root>
        )}

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={10} align="center">
            <VStack gap={8} w="320px">
              {/* Email */}
              <Box w="full">
                <Text color="white" mb={2} fontWeight="medium">
                  Email
                </Text>
                <Input
                  type="email"
                  {...register('email')}
                  autoComplete="email"
                  borderColor={errors.email ? 'red.500' : 'gray.300'}
                  bg="white"
                  px={4}
                />
                {errors.email && (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </Box>

              {/* Password */}
              <Box w="full">
                <Text color="white" mb={2} fontWeight="medium">
                  Password
                </Text>
                <Input
                  type="password"
                  {...register('password')}
                  autoComplete="current-password"
                  borderColor={errors.password ? 'red.500' : 'gray.300'}
                  bg="white"
                  px={4}
                />
                {errors.password && (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </Box>
            </VStack>

            <Button
              type="submit"
              w="320px"
              bg="#2d3648"
              color="white"
              fontSize="18px"
              fontWeight="bold"
              px={6}
              py={4}
              borderRadius="6px"
              loading={isLoading}
              disabled={isLoading}
              style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
              _hover={{
                bg: '#3d4658',
              }}
              _active={{
                bg: '#1d2638',
              }}
            >
              Continue
            </Button>
          </VStack>
        </Box>

        {/* Sign up link */}
        <Box mt={8} textAlign="center" fontSize="sm">
          <Text as="span" color="white">
            Don't have an account?{' '}
          </Text>
          <Link
            to="/register"
            style={{
              color: 'white',
              fontWeight: '500',
              textDecoration: 'underline',
            }}
          >
            Sign up
          </Link>
        </Box>
      </VStack>
    </AuthLayout>
  )
}
