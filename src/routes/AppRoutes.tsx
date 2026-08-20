import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { LandingPage } from '@/pages/LandingPage'
import { Login } from '@/pages/Login'
import { VisitanteLayout } from '@/components/layout/visitante/VisitanteLayout'
import { Home as VisitanteHome } from '@/pages/Visitante/Home'
import { Ocupacion } from '@/pages/Visitante/Ocupacion'
import { Capacidad } from '@/pages/Visitante/Capacidad'
import { Eventos as VisitanteEventos } from '@/pages/Visitante/Eventos'
import { AdminLayout } from '@/components/layout/admin/AdminLayout'
import { Dashboard } from '@/pages/Admin/Dashboard'
import { Eventos } from '@/pages/Admin/Eventos'
import { Playas } from '@/pages/Admin/Playas'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<VisitanteLayout />}>
          <Route path="/visitante" element={<VisitanteHome />} />
          <Route path="/visitante/ocupacion" element={<Ocupacion />} />
          <Route path="/visitante/capacidad" element={<Capacidad />} />
          <Route path="/visitante/eventos" element={<VisitanteEventos />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/eventos" element={<Eventos />} />
            <Route path="/admin/playas" element={<Playas />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}