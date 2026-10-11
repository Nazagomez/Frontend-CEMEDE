import { useState, type FormEvent, type FocusEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { InstitutionalLogos } from '@/components/brand/InstitutionalLogos'
import { useAuth } from '@/hooks/useAuth'
import { validateLoginCredentials } from '@/services/auth/authService'
import heroCosta from '@/assets/hero-costa.jpg'

const HERO_VIDEO = '/hero-pacifico.m4v'

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[#062833]" aria-hidden>
        <img src={heroCosta} alt="" className="hero-still absolute inset-0 h-full w-full object-cover object-[center_40%]" />
        <video className="hero-video absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={heroCosta}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#062833]/45" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <InstitutionalLogos size="lg" tone="onDark" />
          <h1 className="mt-4 text-xl font-semibold">SITEC</h1>
          <p className="mt-1 max-w-[280px] text-sm text-white">
            Sistema de Información para la Estimación de Capacidad Turística
          </p>
        </div>

        <p className="mb-5 text-sm font-medium">Acceso investigador</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-white">Correo electrónico</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur('email')}
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className={`scheme-dark w-full rounded-lg border bg-[#062833]/45 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-white ${
                  touched.email && errors.email ? 'border-red-300' : 'border-white/30'
                }`}
                autoComplete="email"
              />
            </div>
            {touched.email && errors.email && (
              <p id="email-error" role="alert" className="text-xs text-red-200">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-white">Contraseña</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur('password')}
                aria-invalid={Boolean(touched.password && errors.password)}
                aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
                className={`scheme-dark w-full rounded-lg border bg-[#062833]/45 py-2.5 pl-9 pr-9 text-sm text-white outline-none transition-colors focus:border-white ${
                  touched.password && errors.password ? 'border-red-300' : 'border-white/30'
                }`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p id="password-error" role="alert" className="text-xs text-red-200">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Link to="/recuperar-password" className="text-sm text-white hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>

          {formError && <p role="alert" className="text-sm text-red-200">{formError}</p>}

          <button
            type="submit"
            disabled={submitting || (Object.keys(touched).length > 0 && !isValid)}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Ingresando…' : 'Iniciar sesión'}
            {!submitting && <ArrowRight className="h-4 w-4" aria-hidden />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/20" />
          <span className="text-xs text-white">o</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        <Link
          to="/visitante"
          className="flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
        >
          Continuar como visitante
        </Link>
      </div>
    </div>
  )
}