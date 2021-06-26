import { createContext, ReactNode, useEffect, useState } from "react";

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
    children: ReactNode;
}

type ThemeContexType = {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContexType>({} as ThemeContexType);

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
    const [currentTheme,setCurrentTheme] = useState<Theme>(() => {
        const storageTheme = localStorage.getItem('theme')
        return (storageTheme ?? 'light') as Theme;
    });  
    const toggleTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
    }   
    useEffect(() =>{
        localStorage.setItem('theme',currentTheme);
    },[currentTheme])
    return(
    <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
        {props.children}
    </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;