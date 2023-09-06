import { createContext, useState } from "react";

type Theme = 'dark' | ''

interface AppContextProps {
    theme: Theme
    themeChange: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: '',
    themeChange: () => { return null }
})

export function AppProvider(props: any)  {
    const [theme, setTheme] = useState<Theme>('dark')

    function themeChange() {
        setTheme(theme === '' ? 'dark' : '')
    }

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