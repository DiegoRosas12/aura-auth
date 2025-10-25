import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@application/context/AuthContext'
import { AppRoutes } from '@presentation/routes/AppRoutes'

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
