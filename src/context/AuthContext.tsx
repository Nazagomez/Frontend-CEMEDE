import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { registerUnauthorizedHandler } from '@/api/httpClient'
import { loginService, restoreSessionService, logoutService } from '@/services/auth/authService'
import type { AuthContextValue, AuthUser, LoginCredentials } from '@/types/auth'

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    logoutService()
    setUser(null)
  }, [])

  useEffect(() => {
    restoreSessionService().then((restoredUser) => {
      setUser(restoredUser)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    registerUnauthorizedHandler(logout)
  }, [logout])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const loggedInUser = await loginService(credentials)
    setUser(loggedInUser)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), isLoading, login, logout }),
    [user, isLoading, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}