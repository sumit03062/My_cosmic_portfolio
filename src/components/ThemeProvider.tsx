
import { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) return savedTheme;
      
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    // Apply theme class to html element
    const root = window.document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle relative p-2 rounded-full transition-transform hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun 
        className={`transition-all ${
          theme === 'light' 
            ? 'rotate-0 scale-100 text-portfolio-blue animate-pulse-glow' 
            : 'rotate-90 scale-0 text-portfolio-purple'
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} 
      />
      <Moon 
        className={`transition-all ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 text-portfolio-purple animate-pulse-glow' 
            : '-rotate-90 scale-0 text-portfolio-blue'
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} 
      />
      <span className={`absolute inset-0 rounded-full bg-muted opacity-20 ${theme === 'dark' ? 'scale-100' : 'scale-0'} transition-transform`}></span>
    </button>
  );
};
