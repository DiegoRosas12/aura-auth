import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Alert,
  CloseButton,
  Table,
  Badge,
  IconButton,
} from '@chakra-ui/react'
import { Eye } from 'lucide-react'
import { useUsers } from '@application/hooks/useUsers'
import { useAuthContext } from '@application/context/AuthContext'
import { MainLayout } from '../components/MainLayout'

export const UsersPage = () => {
  const { users, isLoading, error, fetchUsers, clearError } = useUsers()
  const { user: currentUser } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <MainLayout>
      <Box maxW="5xl" mx="auto" p={6}>
        <VStack align="start" gap={6}>
          <Box>
            <Heading size="2xl" mb={2}>
              Users
            </Heading>
            <Text color="gray.600">Manage and view all registered users</Text>
          </Box>

          {error && (
            <Alert.Root status="error" w="full">
              <Alert.Indicator />
              <Box flex="1">{error}</Box>
              <CloseButton onClick={clearError} />
            </Alert.Root>
          )}

          <Card.Root w="full">
            <Card.Header pb={4}>
              <HStack justify="space-between">
                <Heading size="md">All Users</Heading>
                <Text fontSize="sm" color="gray.500">
                  Total:{' '}
                  <Text as="span" fontWeight="semibold">
                    {users.length}
                  </Text>{' '}
                  users
                </Text>
              </HStack>
            </Card.Header>
            <Card.Body p={0}>
              {isLoading ? (
                <VStack py={20} gap={4}>
                  <Spinner size="xl" color="purple.500" />
                  <Text color="gray.600" fontSize="md" fontWeight="medium">
                    Loading users...
                  </Text>
                </VStack>
              ) : users.length === 0 ? (
                <Box textAlign="center" py={12}>
                  <Text color="gray.500">No users found</Text>
                </Box>
              ) : (
                <Table.Root variant="outline">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Email</Table.ColumnHeader>
                      <Table.ColumnHeader>Created At</Table.ColumnHeader>
                      <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
                      <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {users.map((user) => (
                      <Table.Row
                        key={user.id}
                        _hover={{
                          bg: 'gray.50',
                        }}
                        transition="background-color 0.2s"
                      >
                        <Table.Cell>
                          <HStack gap={2}>
                            <Text fontWeight="medium">
                              {user.firstName} {user.lastName}
                            </Text>
                            {currentUser?.id === user.id && (
                              <Badge
                                bg="green.100"
                                color="green.700"
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                fontSize="xs"
                                fontWeight="semibold"
                              >
                                👋 Me
                              </Badge>
                            )}
                          </HStack>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color="gray.600">{user.email}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text fontSize="sm" color="gray.600">
                            {user.createdAt.toLocaleDateString()}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text fontSize="sm" color="gray.600">
                            {user.updatedAt.toLocaleDateString()}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          {currentUser?.id === user.id && (
                            <IconButton
                              aria-label="View profile"
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate('/profile')}
                              _hover={{
                                bg: 'gray.100',
                              }}
                            >
                              <Eye size={18} />
                            </IconButton>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              )}
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    </MainLayout>
  )
}
