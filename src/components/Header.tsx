import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl md:text-3xl font-serif text-gradient">
              mautamu
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm hover:text-primary transition-smooth">
              Home
            </Link>
            <Link to="/collections" className="text-sm hover:text-primary transition-smooth">
              Collections
            </Link>
            <Link to="/best-sellers" className="text-sm hover:text-primary transition-smooth">
              Best Sellers
            </Link>
            <Link to="/about" className="text-sm hover:text-primary transition-smooth">
              About
            </Link>
            <Link to="/faq" className="text-sm hover:text-primary transition-smooth">
              FAQ
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <SearchBar />
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-smooth">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-smooth relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border/50 pt-4">
            <Link
              to="/"
              className="text-sm hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="text-sm hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/best-sellers"
              className="text-sm hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              to="/about"
              className="text-sm hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/faq"
              className="text-sm hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
