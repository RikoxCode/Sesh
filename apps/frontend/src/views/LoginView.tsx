import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import Brand from '../components/login/Brand'
import TextField from '../components/ui/TextField'
import PasswordField from '../components/login/PasswordField'
import SubmitButton from '../components/login/SubmitButton'
import FormError from '../components/ui/FormError'
import ThemeToggle from '../components/ui/ThemeToggle'

export default function LoginView() {
  const login = useAuthStore((s) => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      window.location.href = '/'
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Brand />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@sesh.app"
              autoComplete="email"
            />

            <PasswordField
              label="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <FormError message={error} />

            <SubmitButton loading={loading}>Anmelden</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  )
}