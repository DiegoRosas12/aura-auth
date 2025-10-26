import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../page/LoginPage'
import { RegisterPage } from '../page/RegisterPage'
import { DashboardPage } from '../page/DashboardPage'
import { ProfilePage } from '../page/ProfilePage'
import { UsersPage } from '../page/UsersPage'
import { SearchDataPage } from '../page/SearchDataPage'
import { ProtectedRoute } from './ProtectedRoute'

/**
 * Application Routes
 * Defines all routes and their protection
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/search-data"
        element={
          <ProtectedRoute>
            <SearchDataPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/search-data" replace />} />
      
      {/* 404 - Redirect to search-data */}
      <Route path="*" element={<Navigate to="/search-data" replace />} />
    </Routes>
  )
}
