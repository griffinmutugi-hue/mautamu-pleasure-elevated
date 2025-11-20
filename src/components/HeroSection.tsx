import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero z-0" />
      
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
            Awaken Your{" "}
            <span className="text-gradient">Desire</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            For the woman who knows what she wants — and isn't afraid to explore it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/collections">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full glow-primary transition-smooth"
              >
                Explore Your Pleasure
              </Button>
            </Link>
            <Link to="/bestsellers">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-full transition-smooth"
              >
                Best Sellers
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-accent text-2xl">🔒</div>
              <h3 className="font-semibold text-sm">Discreet Delivery</h3>
              <p className="text-xs text-muted-foreground">100% private packaging</p>
            </div>
            <div className="space-y-2">
              <div className="text-accent text-2xl">✨</div>
              <h3 className="font-semibold text-sm">Premium Quality</h3>
              <p className="text-xs text-muted-foreground">Body-safe materials</p>
            </div>
            <div className="space-y-2">
              <div className="text-accent text-2xl">🇰🇪</div>
              <h3 className="font-semibold text-sm">Kenya Delivery</h3>
              <p className="text-xs text-muted-foreground">Fast & reliable shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
