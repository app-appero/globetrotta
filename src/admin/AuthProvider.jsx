import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirebaseAuth } from './firebaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), setUser)
    return unsubscribe
  }, [])

  async function login(email, password) {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
  }

  async function logout() {
    await signOut(getFirebaseAuth())
  }

  return <AuthContext.Provider value={{ user, loading: user === undefined, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
