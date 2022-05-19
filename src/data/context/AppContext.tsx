import { createContext, useEffect, useState } from "react";

interface AppContextProps {
  theme?: string
  switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: any) {
  const [theme, setTheme] = useState('')
  const itemTheme = process.env.NEXT_PUBLIC_LOCALSTORAGE_THEME

  function switchTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem(itemTheme, newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem(itemTheme) || ''
    setTheme(savedTheme)
  }, [])

  return (
    <AppContext.Provider value={{
      theme,
      switchTheme
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
