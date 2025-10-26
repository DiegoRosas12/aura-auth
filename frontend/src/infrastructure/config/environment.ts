export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
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
