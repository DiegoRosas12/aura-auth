import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { environment } from '../config/environment'
import { AppError, AuthError, NetworkError } from '@domain/errors/AppError'

/**
 * HTTP Client
 * Wrapper around axios with error handling and authentication
 */
export class HttpClient {
  private client: AxiosInstance

  constructor(baseURL: string = environment.apiBaseUrl) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) {
          throw new NetworkError('Network error. Please check your connection.')
        }

        const { status, data } = error.response

        if (status === 401) {
          localStorage.removeItem('auth_token')
          throw new AuthError(data?.message || 'Authentication failed')
        }

        if (status === 403) {
          throw new AuthError(data?.message || 'Access denied')
        }

        if (status >= 400 && status < 500) {
          throw new AppError(data?.message || 'Request failed', data?.code, status)
        }

        if (status >= 500) {
          throw new AppError('Server error. Please try again later.', 'SERVER_ERROR', status)
        }

        throw new AppError('An unexpected error occurred', 'UNKNOWN_ERROR', status)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config)
    return response.data
  }
}

// Singleton instance
export const httpClient = new HttpClient()
