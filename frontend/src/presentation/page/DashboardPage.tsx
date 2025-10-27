import { useAuthContext } from '@application/context/AuthContext'
import { Link } from 'react-router-dom'
import { MainLayout } from '../components/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'

export const DashboardPage = () => {
  const { user } = useAuthContext()

  return (
    <MainLayout>
      <div className="space-y-6 m-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your account today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">View and manage your personal information</p>
              <Link
                to="/profile"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Go to Profile →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Browse and manage all registered users</p>
              <Link
                to="/users"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View Users →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Member since:</span>
                  <p className="font-medium">{user?.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600">1</div>
                <div className="text-sm text-gray-600 mt-1">Active Sessions</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600">
                  {user?.updatedAt.toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">Last Updated</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">Active</div>
                <div className="text-sm text-gray-600 mt-1">Account Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
