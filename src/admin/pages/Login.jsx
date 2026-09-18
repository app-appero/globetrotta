import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthProvider.jsx'

export default function Login() {
  const { user, loading, login } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to={location.state?.from?.pathname ?? '/admin'} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
    } catch {
      setError('Email o password non corrette.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-ink-800/10 bg-paper-50 p-8 shadow-card">
        <h1 className="text-fluid-lg font-bold text-ink-950">GlobeTrotta — Admin</h1>
        <p className="mt-1 text-fluid-sm text-ink-500">Accesso riservato.</p>

        <label className="mt-6 block text-fluid-sm font-medium text-ink-800" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm outline-none focus:border-accent-500"
        />

        <label className="mt-4 block text-fluid-sm font-medium text-ink-800" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm outline-none focus:border-accent-500"
        />

        {error && <p className="mt-3 text-fluid-xs text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full disabled:opacity-60">
          {submitting ? 'Accesso...' : 'Accedi'}
        </button>
      </form>
    </div>
  )
}
