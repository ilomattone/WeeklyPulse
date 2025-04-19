import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, ChevronDown } from "lucide-react";
import { useWindowSize } from "@/hooks/use-mobile";

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { isMobile } = useWindowSize();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled 
          ? "bg-white/95 shadow-md py-2" 
          : "bg-white/80 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-xl overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:from-primary/90 group-hover:to-primary transition-all duration-300">
                  MacPaw<span className="text-neutral-800 ml-1">Blog</span>
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
              {[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: 'Categories', href: '#', hasDropdown: true },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <div key={item.name} className="relative group">
                  <Link 
                    href={item.href} 
                    className={`${
                      (location === item.href || (item.href === '/blog' && location.startsWith('/blog/')))
                        ? "text-primary font-medium"
                        : "text-neutral-700 hover:text-primary"
                    } inline-flex items-center px-1 py-2 text-sm font-medium transition-all duration-200`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                  
                  {/* Bottom highlight animation */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                      (location === item.href || (item.href === '/blog' && location.startsWith('/blog/')))
                        ? "scale-x-100"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </nav>
          </div>
          
          {/* Search and CTA */}
          <div className="hidden md:flex md:items-center md:space-x-5">
            {onSearch && (
              <Search 
                placeholder="Search articles..." 
                onSearch={onSearch} 
                className="w-64"
              />
            )}
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium shadow-sm hover:shadow-md transition-all">
              Subscribe
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-700 hover:text-primary hover:bg-neutral-100/60 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div 
          className="md:hidden bg-white/95 backdrop-blur-md shadow-lg animate-fade-in border-t border-neutral-100" 
          id="mobile-menu"
        >
          <div className="pt-3 pb-4 px-4 space-y-2">
            {[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: 'Categories', href: '#categories' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className={`${
                  (location === item.href || (item.href === '/blog' && location.startsWith('/blog/')))
                    ? "bg-primary/10 text-primary font-medium border-l-4 border-primary"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-primary border-l-4 border-transparent"
                } block px-3 py-3 text-base font-medium rounded-lg transition-all duration-150`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {onSearch && (
            <div className="pt-2 pb-5 border-t border-neutral-200 px-4 space-y-4">
              <div className="mt-3">
                <Search 
                  placeholder="Search articles..." 
                  onSearch={term => {
                    if (onSearch) onSearch(term);
                    closeMenu();
                  }} 
                  className="w-full"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
                Subscribe
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
