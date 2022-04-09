import route from 'next/router'
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import firebase from "../../firebase/config";
import User from "../../model/User";

interface AuthContextProps {
  user: User
  loginGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
  user: null, loginGoogle: null, logout: null
})

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken()

  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    token,
    provider: firebaseUser.providerData[0].providerId,
    photoUrl: firebaseUser.photoURL
  }
}

function manageCookie(logged: boolean) {
  const cookieAuthKey = process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY

  if (logged) {
    Cookies.set(cookieAuthKey, logged, { expires: 7 })
  } else {
    Cookies.remove(cookieAuthKey)
  }
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  async function configureSession(firebaseUser: any) {
    if (firebaseUser?.email) {
      const user = await normalizedUser(firebaseUser)
      setUser(user)
      manageCookie(true)
      setLoading(false)
      return firebaseUser.email
    } else {
      setUser(null)
      manageCookie(false)
      setLoading(false)
      return false
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true)
      const resp = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )

      configureSession(resp.user)
      route.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try {
      setLoading(true)
      await firebase.auth().signOut()
      await configureSession(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const cookieAuthKey = process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY

    if (cookieAuthKey) {
      const cancel = firebase.auth().onIdTokenChanged(configureSession)
      return () => cancel()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loginGoogle,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

