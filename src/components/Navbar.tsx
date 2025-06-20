
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from './ThemeProvider';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Chat', path: '/chat' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isScrolled 
      ? "bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-3" 
      : "bg-transparent dark:bg-transparent py-5"
  );

  return (
    <header className={navbarClasses}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-portfolio-purple transition-colors">
          SumitVerse
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "nav-link",
                location.pathname === item.path && "nav-link-active"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="default" className="bg-portfolio-blue hover:bg-portfolio-purple transition-colors duration-300 dark:shadow-[0_0_10px_rgba(114,9,183,0.3)]">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Trigger and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg animate-fade-in border-t border-border/50 dark:border-gray-700/50">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={cn(
                  "text-lg py-2 px-4 hover:bg-muted rounded-md transition-colors dark:hover:bg-gray-800",
                  location.pathname === item.path && "text-primary font-medium dark:text-portfolio-purple"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" className="bg-portfolio-blue hover:bg-portfolio-purple transition-colors w-full dark:shadow-[0_0_10px_rgba(114,9,183,0.3)]">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
