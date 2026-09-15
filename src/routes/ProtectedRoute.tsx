import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  /** Si se omite, solo exige estar autenticado (cualquier rol/permiso). */
  requiredPermission?: string
}

export function ProtectedRoute({ requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <p>Cargando sesión…</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (user?.debeCambiarPassword && location.pathname !== '/cambiar-password') {
    return <Navigate to="/cambiar-password" replace />
  }

  if (requiredPermission && user && !user.permisos.includes(requiredPermission)) {
    return <Navigate to="/no-autorizado" replace />
  }

  return <Outlet />
}