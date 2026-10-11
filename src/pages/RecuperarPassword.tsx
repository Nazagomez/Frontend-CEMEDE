import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { InstitutionalLogos } from '@/components/brand/InstitutionalLogos'
import { solicitarRecuperacionPassword, validateRecoveryEmail } from '@/services/auth/authService'

export function RecuperarPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviado, setEnviado] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationError = validateRecoveryEmail(email)
    setError(validationError)
    setEnviado(false)
    if (validationError) return
    setSubmitting(true)
    try {
      await solicitarRecuperacionPassword(email)
      setEnviado(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar la solicitud.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-navy-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-black/40 sm:p-10">
        <div className="mb-6 flex flex-col items-center text-center">
          <InstitutionalLogos size="md" tone="onLight" />
          <h1 className="mt-4 text-xl font-semibold text-navy-900">Recuperar contraseña</h1>
          <p className="mt-1 text-sm text-ink-500">
            Te enviamos un correo si la cuenta existe. Si no llega, un administrador puede restablecerla desde Usuarios.
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="recovery-email" className="text-sm font-medium text-ink-700">Correo electrónico</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden />
              <input
                id="recovery-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm text-ink-900 outline-none focus:border-navy-700"
              />
            </div>
          </div>
          {error && <p role="alert" className="text-sm text-alert-600">{error}</p>}
          {enviado && (
            <p className="text-sm text-ink-700">
              Si el correo está registrado, vas a recibir instrucciones para restablecer la contraseña.
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
          >
            {submitting ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </form>
        <Link to="/login" className="mt-6 block text-center text-sm font-medium text-navy-700 hover:underline">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  )
}
