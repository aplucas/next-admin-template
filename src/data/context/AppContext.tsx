import { createContext, useState } from "react";

type theme = 'dark' | ''

interface AppContextProps {
  theme?: theme
  switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: any) {
  const [theme, setTheme] = useState<theme>('dark')

  function switchTheme() {
    setTheme(theme === '' ? 'dark' : '')
  }

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
