import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const products = [
  {
    id: "best-001",
    name: "Rose Blossom",
    price: 3500,
    category: "Vibrators",
    image: "🌹",
    rating: 5,
    reviews: 127
  },
  {
    id: "best-002",
    name: "Velvet Touch",
    price: 4200,
    category: "Dildos",
    image: "💎",
    rating: 5,
    reviews: 89
  },
  {
    id: "best-003",
    name: "Whisper Vibrator",
    price: 3800,
    category: "Vibrators",
    image: "✨",
    rating: 4.8,
    reviews: 156
  },
  {
    id: "best-004",
    name: "Luxury Silk Set",
    price: 6500,
    category: "Bondage",
    image: "🎀",
    rating: 5,
    reviews: 64
  },
];

const BestSellers = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }, 1);
  };

  const handleToggleWishlist = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            <span className="text-gradient">Best</span> Sellers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most loved products, chosen by women like you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden shadow-soft hover-lift">
              <CardContent className="p-0">
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square bg-muted/30 flex items-center justify-center text-7xl group-hover:scale-110 transition-all duration-500">
                      {product.image}
                    </div>
                  </Link>
                  
                  {/* Wishlist Heart Overlay */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 ${
                      isInWishlist(product.id) ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleWishlist(product);
                    }}
                  >
                    <Heart className={`h-5 w-5 transition-all duration-300 ${isInWishlist(product.id) ? "fill-current animate-heart-pop" : ""}`} />
                  </Button>
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif text-lg group-hover:text-primary transition-smooth">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-accent">★★★★★</span>
                    <span className="text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-serif text-primary">
                      KES {product.price.toLocaleString()}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 rounded-full shadow-soft hover:shadow-glow-button transition-all duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/best-sellers">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 transition-all duration-300 hover:shadow-soft">
              Discover All Best Sellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
