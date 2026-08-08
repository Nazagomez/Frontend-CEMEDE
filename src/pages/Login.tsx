import { useState, type FormEvent, type FocusEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Waves, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { validateLoginCredentials } from '@/services/auth/authService'

export function Login() {
  const { login, isAuthenticated } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/admin/dashboard'
    return <Navigate to={redirectTo} replace />
  }

  const errors = validateLoginCredentials(email, password)
  const isValid = Object.keys(errors).length === 0

  function handleBlur(field: 'email' | 'password') {
    return (_e: FocusEvent<HTMLInputElement>) => {
      setTouched((t) => ({ ...t, [field]: true }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    setFormError(null)
    if (!isValid) return

    setSubmitting(true)
    try {
      await login({ email, password })
    } catch {
      setFormError('Correo o contraseña incorrectos.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-navy-700/40 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-navy-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-alert-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-black/40 sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900">
            <Waves className="h-6 w-6 text-white" strokeWidth={2.25} aria-hidden />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-navy-900">SITEC</h1>
          <p className="mt-1 max-w-[280px] text-sm text-ink-500">
            Sistema de Información para la Estimación de Capacidad Turística
          </p>
        </div>

        <p className="mb-5 text-sm font-medium text-ink-700">Acceso investigador</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ink-700">Correo electrónico</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur('email')}
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm text-ink-900 outline-none transition-colors focus:ring-2 focus:ring-navy-700/10 ${
                  touched.email && errors.email ? 'border-alert-600 focus:border-alert-600' : 'border-gray-300 focus:border-navy-700'
                }`}
                autoComplete="email"
              />
            </div>
            {touched.email && errors.email && (
              <p id="email-error" role="alert" className="text-xs text-alert-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ink-700">Contraseña</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur('password')}
                aria-invalid={Boolean(touched.password && errors.password)}
                aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
                className={`w-full rounded-lg border py-2.5 pl-9 pr-9 text-sm text-ink-900 outline-none transition-colors focus:ring-2 focus:ring-navy-700/10 ${
                  touched.password && errors.password ? 'border-alert-600 focus:border-alert-600' : 'border-gray-300 focus:border-navy-700'
                }`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-700"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p id="password-error" role="alert" className="text-xs text-alert-600">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm text-navy-700 hover:underline">¿Olvidaste tu contraseña?</button>
          </div>

          {formError && <p role="alert" className="text-sm text-alert-600">{formError}</p>}

          <button
            type="submit"
            disabled={submitting || (Object.keys(touched).length > 0 && !isValid)}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Ingresando…' : 'Iniciar sesión'}
            {!submitting && <ArrowRight className="h-4 w-4" aria-hidden />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-ink-500">o</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <Link
          to="/visitante"
          className="flex w-full items-center justify-center rounded-lg border border-navy-900 px-4 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
        >
          Continuar como visitante
        </Link>
      </div>
    </div>
  )
}