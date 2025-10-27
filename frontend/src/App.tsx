import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@application/context/AuthContext'
import { AppRoutes } from '@presentation/route/AppRoutes'

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
