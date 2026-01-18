import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBestsellerProducts } from "@/hooks/useProducts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const BestSellersPage = () => {
  const { data: products, isLoading } = useBestsellerProducts();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = (product: { id: string; name: string; price: number; images: string[]; category: string }) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "🎁",
      category: product.category,
    });
  };

  const handleToggleWishlist = (product: { id: string; name: string; price: number; images: string[]; category: string }) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "🎁",
        category: product.category,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Best <span className="text-gradient">Sellers</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most loved products, trusted by thousands of satisfied customers
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="bg-gradient-card border-border/50">
                  <CardContent className="p-0">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-6">
                No bestsellers at the moment.
              </p>
              <Link to="/collections">
                <Button>Explore All Collections</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden shadow-soft hover-lift">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square bg-muted/30 flex items-center justify-center text-6xl cursor-pointer group-hover:scale-110 transition-all duration-500">
                          {product.images[0] || "🎁"}
                        </div>
                      </Link>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 ${
                          isInWishlist(product.id) ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
                        }`}
                        onClick={() => handleToggleWishlist(product)}
                      >
                        <Heart className={`h-5 w-5 transition-all duration-300 ${isInWishlist(product.id) ? "fill-current animate-heart-pop" : ""}`} />
                      </Button>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.category.replace('-', ' ')}
                      </p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-smooth">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating || 0)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.review_count || 0})
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-xl font-serif text-primary">
                          KES {product.price.toLocaleString()}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.quantity === 0}
                          className="rounded-full bg-primary hover:bg-primary/90"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BestSellersPage;
