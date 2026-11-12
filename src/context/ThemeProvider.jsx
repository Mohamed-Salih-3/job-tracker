import UseLocalStorageState from "../Hooks/UseLocalStorageState";
import ThemeContext from "./ThemeContext";

export default function ThemeProvider({children}) {
    const [theme,setTheme] = UseLocalStorageState(
        "job-tracker-theme",
        "light"
    );
    
    function toggleTheme(){
        setTheme((current) => 
            current === "light" ? "dark" : "light"
        )
    };

    const value = {
        theme,
        setTheme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value= {value}>
            {children}
        </ThemeContext.Provider>
    )
}