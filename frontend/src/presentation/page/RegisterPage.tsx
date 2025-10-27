import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Input, VStack, Text, Alert, CloseButton, Heading } from '@chakra-ui/react'
import { useAuthContext } from '@application/context/AuthContext'
import { AuthLayout } from '@presentation/components/AuthLayout'
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
      <VStack align="center" gap={8}>
        {error && (
          <Alert.Root status="error" w="320px" mb={4}>
            <Alert.Indicator />
            <Box flex="1">{error}</Box>
            <CloseButton onClick={clearError} />
          </Alert.Root>
        )}

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading
            color="white"
            fontSize="48px"
            fontWeight="bold"
            textAlign="center"
            mb={5}
            style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
          >
            Welcome
          </Heading>
          <VStack gap={10} align="center">
            <VStack gap={4} w="320px">
              {/* First Name */}
              <Box w="full">
                <Text color="white" mb={2} fontWeight="medium">
                  First Name
                </Text>
                <Input
                  type="text"
                  {...register('firstName')}
                  autoComplete="given-name"
                  borderColor={errors.firstName ? 'red.500' : 'gray.300'}
                  bg="white"
                  px={4}
                />
                {errors.firstName && (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {errors.firstName.message}
                  </Text>
                )}
              </Box>

              {/* Last Name */}
              <Box w="full">
                <Text color="white" mb={2} fontWeight="medium">
                  Last Name
                </Text>
                <Input
                  type="text"
                  {...register('lastName')}
                  autoComplete="family-name"
                  borderColor={errors.lastName ? 'red.500' : 'gray.300'}
                  bg="white"
                  px={4}
                />
                {errors.lastName && (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {errors.lastName.message}
                  </Text>
                )}
              </Box>

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
                  autoComplete="new-password"
                  borderColor={errors.password ? 'red.500' : 'gray.300'}
                  bg="white"
                  px={4}
                />
                {errors.password && (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
                <Text color="gray.300" fontSize="xs" mt={1}>
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </Text>
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
              disabled={!isValid || isLoading}
              style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
              _hover={{
                bg: '#3d4658',
              }}
              _active={{
                bg: '#1d2638',
              }}
            >
              Create Account
            </Button>
          </VStack>
        </Box>

        <Box mt={5} textAlign="center" fontSize="sm">
          <Text as="span" color="white">
            Already have an account?{' '}
          </Text>
          <Link
            to="/login"
            style={{
              color: 'white',
              fontWeight: '500',
              textDecoration: 'underline',
            }}
          >
            Sign in
          </Link>
        </Box>
      </VStack>
    </AuthLayout>
  )
}
