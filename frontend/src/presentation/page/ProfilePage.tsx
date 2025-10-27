import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Card,
  Heading,
  Text,
  Button,
  Input,
  HStack,
  VStack,
  Spinner,
  Alert,
  CloseButton,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useProfile } from '@application/hooks/useProfile'
import { MainLayout } from '../components/MainLayout'
import { profileUpdateSchema, type ProfileUpdateFormData } from '@domain/validation/authSchemas'

export const ProfilePage = () => {
  const { profile, isLoading, error, fetchProfile, updateProfile, clearError } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: ProfileUpdateFormData) => {
    clearError()
    setSuccessMessage(null)

    try {
      await updateProfile(data)
      setSuccessMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      // Error handled by useProfile
    }
  }

  const handleCancel = () => {
    if (profile) {
      reset({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      })
    }
    setIsEditing(false)
    clearError()
  }

  if (isLoading && !profile) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
          <Spinner size="xl" />
        </Box>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Box maxW="5xl" mx="auto" p={6}>
        <VStack align="start" gap={6}>
          <Box>
            <Heading size="2xl" mb={2}>
              Profile Settings
            </Heading>
            <Text color="gray.600">Manage your personal information</Text>
          </Box>

          {successMessage && (
            <Alert.Root status="success" w="full">
              <Alert.Indicator />
              <Box flex="1">{successMessage}</Box>
              <CloseButton onClick={() => setSuccessMessage(null)} />
            </Alert.Root>
          )}

          {error && (
            <Alert.Root status="error" w="full">
              <Alert.Indicator />
              <Box flex="1">{error}</Box>
              <CloseButton onClick={clearError} />
            </Alert.Root>
          )}

          <Card.Root w="full">
            <Card.Header>
              <HStack justify="space-between">
                <Heading size="lg">Personal Information</Heading>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    bg="#1b093c"
                    color="white"
                    px={6}
                    py={2}
                    _hover={{
                      bg: '#2a1555',
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </HStack>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} align="stretch">
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <GridItem>
                      <Text fontWeight="medium" mb={2}>
                        First Name
                      </Text>
                      <Input
                        {...register('firstName')}
                        disabled={!isEditing}
                        borderWidth="2px"
                        borderColor={errors.firstName ? 'red.500' : 'gray.300'}
                        px={4}
                      />
                      {errors.firstName && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.firstName.message}
                        </Text>
                      )}
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="medium" mb={2}>
                        Last Name
                      </Text>
                      <Input
                        {...register('lastName')}
                        disabled={!isEditing}
                        borderWidth="2px"
                        borderColor={errors.lastName ? 'red.500' : 'gray.300'}
                        px={4}
                      />
                      {errors.lastName && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.lastName.message}
                        </Text>
                      )}
                    </GridItem>
                  </Grid>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Email
                    </Text>
                    <Input
                      type="email"
                      {...register('email')}
                      disabled={!isEditing}
                      borderWidth="2px"
                      borderColor={errors.email ? 'red.500' : 'gray.300'}
                      px={4}
                    />
                    {errors.email && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.email.message}
                      </Text>
                    )}
                  </Box>

                  {isEditing && (
                    <HStack pt={4} gap={3}>
                      <Button
                        type="submit"
                        bg="#1b093c"
                        color="white"
                        px={6}
                        py={2}
                        loading={isLoading}
                        disabled={!isValid || isLoading}
                        _hover={{
                          bg: '#2a1555',
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        bg="gray.200"
                        color="black"
                        px={6}
                        py={2}
                        _hover={{
                          bg: 'gray.300',
                        }}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  )}
                </VStack>
              </form>
            </Card.Body>
          </Card.Root>

          <Card.Root w="full">
            <Card.Header>
              <Heading size="lg">Account Information</Heading>
            </Card.Header>
            <Card.Body>
              <VStack align="stretch" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    User ID
                  </Text>
                  <Text mt={1} fontSize="sm" fontFamily="mono">
                    {profile?.id}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    Account Created
                  </Text>
                  <Text mt={1} fontSize="sm">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    Last Updated
                  </Text>
                  <Text mt={1} fontSize="sm">
                    {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
                  </Text>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    </MainLayout>
  )
}
