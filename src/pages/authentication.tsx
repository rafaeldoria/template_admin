import { useState } from "react"
import AuthInput from "../components/auth/AuthInput"
import { google, warning } from "@/components/icons"
import useAuthData from "@/data/hook/useAuthData"

export default function Authentication() {
    const {register, login, loginGoogle} = useAuthData()

    const [mode, setMode] = useState<'login' | 'form'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function submit() {
        try {
            if(mode === 'login'){
                await login(email, password)
            }else {
                await register(email, password)
            }
        } catch (error) {
            renderError(error?.message ?? 'Unexpected error')
        }
    }

    function renderError(msg: any, time = 5) {
        setError(msg)
        if(error){
            return (
                <div className={`
                    flex items-center
                    bg-red-400 text-white py-3 px-5 my-2
                    border border-red-700 rounded-lg
                `}>
                    {warning(6,6)}
                    <span className="ml-3">{error}</span>
                </div>
            )
        }
        setTimeout(() => setError(null), 5 * 1000)
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src="https://source.unsplash.com/random" 
                    alt="Authentication image" 
                    className="h-screen w-full object-cover"
                />
            </div>

            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>
                    {mode === 'login' 
                        ? 'Enter with your account' 
                        : 'Make your registration'
                    }
                </h1>
                
                {error ? (
                        <div className={`
                        flex items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg
                    `}>
                        {warning(6,6)}
                        <span className="ml-3">{error}</span>
                    </div>
                ) : false}

                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                ></AuthInput>

                <AuthInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    required
                ></AuthInput>

                <AuthInput
                    label="Confirm Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    required
                    notShowed={true}
                ></AuthInput>

                <button onClick={submit} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>

                <hr className="my-6 border-gray-200 w-full"/>

                <button onClick={loginGoogle} className={`
                    flex justify-center items-center
                     w-full bg-rose-800 hover:bg-rose-700
                    text-white rounded-lg px-1 
                `}>
                    <span className={`mr-2`}>
                        {google}
                    </span>
                    <span>
                        Login Google
                    </span>
                </button>

                {mode === 'login' ? (
                    <p className="mt-8">
                        Welcome
                        <a onClick={() => setMode('form')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Create account</a>
                    </p>
                ) : (
                    <p className="mt-8">
                        You already have an account? 
                        <a onClick={() => setMode('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Enter your account</a>
                    </p>
                )}   
            </div>
        </div>
    )
}