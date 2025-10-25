// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from '@application/context/AuthContext'
// import { AppRoutes } from '@presentation/routes/AppRoutes'

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hello from Aura Auth!</h1>
      <p>If you can see this, the app is working correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  )
}

export default App
