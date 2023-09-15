import { createContext, useEffect, useState } from "react";

// type Theme = 'dark' | ''

interface AppContextProps {
    theme: string
    themeChange: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: '',
    themeChange: () => { return null }
})

export function AppProvider(props: any)  {
    const [theme, setTheme] = useState('dark')

    function themeChange() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        setTheme(localTheme)
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            themeChange
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext