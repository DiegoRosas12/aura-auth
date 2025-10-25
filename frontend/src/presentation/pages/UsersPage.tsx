import { useEffect } from 'react'
import { useUsers } from '@application/hooks/useUsers'
import { MainLayout } from '../components/templates/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card'
import { Alert } from '../components/atoms/Alert'
import { Spinner } from '../components/atoms/Spinner'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/molecules/Table'

/**
 * Users Page
 * Display list of all users
 */
export const UsersPage = () => {
  const { users, isLoading, error, fetchUsers, clearError } = useUsers()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-2 text-gray-600">Manage and view all registered users</p>
        </div>

        {error && (
          <Alert variant="error" onClose={clearError}>
            {error}
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="text-sm text-gray-500">
                Total: <span className="font-semibold">{users.length}</span> users
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner size="lg" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-600">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-xs text-gray-500">{user.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {user.createdAt.toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {user.updatedAt.toLocaleDateString()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
