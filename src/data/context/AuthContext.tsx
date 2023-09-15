import firebase from '../../firebase/config'
import User from '@/model/User'
import route from 'next/router'
import { useState, createContext, useEffect} from 'react'
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    loading?: boolean
    register?: (email: string, password: string) => Promise<void>
    login?: (email: string, password: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizeUser(userFirebase: firebase.User): Promise<User>{
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        urlImage: userFirebase.photoURL
    }
}

function managerAuthCookie(logged: boolean) {
    if(logged){
        Cookies.set('admin-user-auth', logged, {
            expires: 1
        })
    } else {
        Cookies.remove('admin-user-auth')
    }
}

export function AuthProvider(props: any) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>()

    async function configSession(userFirebase) {
        if(userFirebase?.email) {
            const user = await normalizeUser(userFirebase)
            setUser(user)
            managerAuthCookie(true)
            setLoading(false)
            return user.email
        }else {
            setUser(null)
            managerAuthCookie(false)
            setLoading(false)
            return false
        }
    }

    async function register(email, password) {
        try {
            setLoading(true)
            const response = await firebase.auth().createUserWithEmailAndPassword(
                email, password
            )
    
            await configSession(response.user)
            route.push('/')
        }finally {
            setLoading(false)
        }
    }

    async function login(email, password) {
        try {
            setLoading(true)
            const response = await firebase.auth().signInWithEmailAndPassword(
                email, password
            )
    
            await configSession(response.user)
            route.push('/')
        }finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const response = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
    
            await configSession(response.user)
            route.push('/')
        }finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configSession(null)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        if(Cookies.get('admin-user-auth')){
            const cancel = firebase.auth().onIdTokenChanged(configSession)
            return () => cancel()
        }else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext