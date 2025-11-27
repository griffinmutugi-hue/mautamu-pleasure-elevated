import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Trash2, ShoppingCart, Heart } from "lucide-react";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    }, 1);
    removeFromWishlist(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-md mx-auto">
              <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-3xl font-serif mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Save your favorite items for later
              </p>
              <Link to="/collections">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-serif">
              My <span className="text-gradient">Wishlist</span>
            </h1>
            <Button
              onClick={clearWishlist}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full"
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden">
                <CardContent className="p-0">
                  <Link to={`/product/${item.id}`}>
                    <div className="aspect-square bg-muted/30 flex items-center justify-center text-7xl group-hover:scale-105 transition-smooth cursor-pointer">
                      {item.image}
                    </div>
                  </Link>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold group-hover:text-primary transition-smooth">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>

                    <p className="text-lg font-semibold text-primary">
                      KES {item.price.toLocaleString()}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 bg-primary hover:bg-primary/90 rounded-full"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(item.id)}
                        variant="outline"
                        size="icon"
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
