import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@application/context/AuthContext'
import { AppRoutes } from '@presentation/route/AppRoutes'
import { system } from './theme/chakra-theme'

function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
