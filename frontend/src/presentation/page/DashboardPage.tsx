import { useAuthContext } from '@application/context/AuthContext'
import { Link } from 'react-router-dom'
import { Box, Card, Heading, Text, VStack, Grid, GridItem } from '@chakra-ui/react'
import { MainLayout } from '../components/MainLayout'

export const DashboardPage = () => {
  const { user } = useAuthContext()

  return (
    <MainLayout>
      <Box maxW="5xl" mx="auto" p={6}>
        <VStack align="start" gap={6}>
          <Box>
            <Heading size="2xl" mb={2}>
              Welcome back, {user?.firstName}!
            </Heading>
            <Text color="gray.600">Here's what's happening with your account today.</Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} w="full">
            <GridItem>
              <Card.Root>
                <Card.Header>
                  <Heading size="md">Profile</Heading>
                </Card.Header>
                <Card.Body>
                  <Text color="gray.600" mb={4}>
                    View and manage your personal information
                  </Text>
                  <Link
                    to="/profile"
                    style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Go to Profile →
                  </Link>
                </Card.Body>
              </Card.Root>
            </GridItem>

            <GridItem>
              <Card.Root>
                <Card.Header>
                  <Heading size="md">Users</Heading>
                </Card.Header>
                <Card.Body>
                  <Text color="gray.600" mb={4}>
                    Browse and manage all registered users
                  </Text>
                  <Link
                    to="/users"
                    style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    View Users →
                  </Link>
                </Card.Body>
              </Card.Root>
            </GridItem>

            <GridItem>
              <Card.Root>
                <Card.Header>
                  <Heading size="md">Account Info</Heading>
                </Card.Header>
                <Card.Body>
                  <VStack align="start" gap={2} fontSize="sm">
                    <Box>
                      <Text color="gray.500">Email:</Text>
                      <Text fontWeight="medium">{user?.email}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.500">Member since:</Text>
                      <Text fontWeight="medium">{user?.createdAt.toLocaleDateString()}</Text>
                    </Box>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </GridItem>
          </Grid>

          <Card.Root w="full">
            <Card.Header>
              <Heading size="md">Quick Stats</Heading>
            </Card.Header>
            <Card.Body>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                <GridItem textAlign="center" p={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                    1
                  </Text>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Active Sessions
                  </Text>
                </GridItem>
                <GridItem textAlign="center" p={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                    {user?.updatedAt.toLocaleDateString()}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Last Updated
                  </Text>
                </GridItem>
                <GridItem textAlign="center" p={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">
                    Active
                  </Text>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Account Status
                  </Text>
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    </MainLayout>
  )
}
