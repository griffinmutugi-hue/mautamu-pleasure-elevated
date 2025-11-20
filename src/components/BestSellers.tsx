import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Rose Blossom",
    price: 3500,
    category: "Vibrators",
    image: "🌹",
    rating: 5,
    reviews: 127
  },
  {
    id: 2,
    name: "Velvet Touch",
    price: 4200,
    category: "Dildos",
    image: "💎",
    rating: 5,
    reviews: 89
  },
  {
    id: 3,
    name: "Whisper Vibrator",
    price: 3800,
    category: "Vibrators",
    image: "✨",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 4,
    name: "Luxury Silk Set",
    price: 6500,
    category: "Bondage",
    image: "🎀",
    rating: 5,
    reviews: 64
  },
];

const BestSellers = () => {
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
            <Card key={product.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden">
              <CardContent className="p-0">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-muted/30 flex items-center justify-center text-7xl group-hover:scale-105 transition-smooth">
                    {product.image}
                  </div>
                </Link>
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold group-hover:text-primary transition-smooth">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-accent">★★★★★</span>
                    <span className="text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">
                      KES {product.price.toLocaleString()}
                    </span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
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
          <Link to="/bestsellers">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8">
              View All Best Sellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
