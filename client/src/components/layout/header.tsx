import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useWindowSize } from "@/hooks/use-mobile";

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isMobile } = useWindowSize();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-primary">TechBlog</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className={`${
                  location === "/"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-800"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link 
                href="/blog" 
                className={`${
                  location === "/blog" || location.startsWith("/blog/")
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-800"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className={`${
                  location === "/about"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-800"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`${
                  location === "/contact"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-800"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Search and CTA */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {onSearch && (
              <Search 
                placeholder="Search articles..." 
                onSearch={onSearch} 
                className="w-64"
              />
            )}
            <Button className="bg-[#FF6B35] hover:bg-opacity-90 text-white">
              Subscribe
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
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
        <div className="sm:hidden bg-white" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className={`${
                location === "/"
                  ? "bg-primary text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
              } block pl-3 pr-4 py-2 text-base font-medium`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={`${
                location === "/blog" || location.startsWith("/blog/")
                  ? "bg-primary text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
              } block pl-3 pr-4 py-2 text-base font-medium`}
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className={`${
                location === "/about"
                  ? "bg-primary text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
              } block pl-3 pr-4 py-2 text-base font-medium`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${
                location === "/contact"
                  ? "bg-primary text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
              } block pl-3 pr-4 py-2 text-base font-medium`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
          {onSearch && (
            <div className="pt-4 pb-3 border-t border-neutral-200">
              <div className="flex items-center px-4">
                <Search 
                  placeholder="Search articles..." 
                  onSearch={term => {
                    if (onSearch) onSearch(term);
                    closeMenu();
                  }} 
                  className="w-full"
                />
              </div>
              <div className="mt-3 px-2">
                <Button className="w-full bg-[#FF6B35] hover:bg-opacity-90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
