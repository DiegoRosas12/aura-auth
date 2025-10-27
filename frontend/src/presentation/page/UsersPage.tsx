import { useEffect } from 'react'
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
} from '@chakra-ui/react'
import { useUsers } from '@application/hooks/useUsers'
import { MainLayout } from '../components/MainLayout'

export const UsersPage = () => {
  const { users, isLoading, error, fetchUsers, clearError } = useUsers()

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
            <Card.Header>
              <HStack justify="space-between">
                <Heading size="lg">All Users</Heading>
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
                <Box display="flex" justifyContent="center" alignItems="center" py={12}>
                  <Spinner size="xl" />
                </Box>
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
                      <Table.ColumnHeader>User ID</Table.ColumnHeader>
                      <Table.ColumnHeader>Created At</Table.ColumnHeader>
                      <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {users.map((user) => (
                      <Table.Row key={user.id}>
                        <Table.Cell>
                          <Text fontWeight="medium">
                            {user.firstName} {user.lastName}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color="gray.600">{user.email}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text fontFamily="mono" fontSize="xs" color="gray.500">
                            {user.id}
                          </Text>
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
