export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}

export const API_ENDPOINTS = {
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
  },
  users: {
    profile: '/api/users/profile',
    list: '/api/users',
  },
} as const
