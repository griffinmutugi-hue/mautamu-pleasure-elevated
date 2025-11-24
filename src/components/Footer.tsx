import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-gradient">mautamu</h3>
            <p className="text-sm text-muted-foreground">
              Empowering pleasure, celebrating desire.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/collections" className="text-muted-foreground hover:text-primary transition-smooth">
                All Collections
              </Link>
              <Link to="/best-sellers" className="text-muted-foreground hover:text-primary transition-smooth">
                Best Sellers
              </Link>
              <Link to="/new-arrivals" className="text-muted-foreground hover:text-primary transition-smooth">
                New Arrivals
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-smooth">
                FAQ
              </Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-smooth">
                Shipping & Delivery
              </Link>
              <Link to="/returns" className="text-muted-foreground hover:text-primary transition-smooth">
                Returns
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-smooth">
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2024 Mautamu. All rights reserved. Discreet packaging guaranteed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
