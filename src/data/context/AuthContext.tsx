import route from 'next/router'
import { createContext, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";

interface AuthContextProps {
  user: User
  loginGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

// async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
//   const token = await firebaseUser.getIdToken()

//   return {
//     uid: firebaseUser.uid,
//     name: firebaseUser.displayName,
//     email: firebaseUser.email,
//     token,
//     provider: firebaseUser.providerData[0].providerId,
//     photoUrl: firebaseUser.photoURL
//   }
// }

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User>(null)

  async function loginGoogle() {
    console.log('Login Google');
    route.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      loginGoogle
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

