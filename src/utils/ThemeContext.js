import React from "react";

function getInitialTheme() {
  if(typeof window !== 'undefined') {
    const storedPrefs = window.localStorage.getItem('theme')
    if(typeof storedPrefs === 'string') return storedPrefs

    const userMedia = window.matchMedia('(prefs-color-theme: dark)');
    if(userMedia.matches) return 'dark';

    return 'light'; // light theme is defualt
  }
}

export const ThemeContext = React.createContext();

function ThemeProvider({ initialTheme, children }) {
  const [theme, setTheme] = React.useState(getInitialTheme);

  function rawSetTheme(rawTheme) {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('theme', rawTheme)
  }

  if(initialTheme) rawSetTheme(initialTheme);

  React.useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return(<ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>)
}

export default ThemeProvider