import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isScrolled?: boolean;
}

const ThemeToggle = ({ isScrolled = true }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-full transition-all duration-300 ${
        isScrolled 
          ? "hover:bg-secondary" 
          : "hover:bg-white/20 text-white"
      }`}
      aria-label="Toggle theme"
    >
      <Sun className={`h-4 w-4 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 ${!isScrolled ? "text-white" : ""}`} />
      <Moon className={`h-4 w-4 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 ${!isScrolled ? "text-white" : ""}`} />
    </Button>
  );
};

export default ThemeToggle;
