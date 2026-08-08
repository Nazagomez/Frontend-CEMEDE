import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { getToken, clearSession } from '@/api/tokenStorage'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

let onUnauthorized: (() => void) | null = null
export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearSession()
      onUnauthorized?.()
    }
    return Promise.reject(error)
  }
)