import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const collectionInfo: Record<string, { title: string; description: string }> = {
  vibrators: {
    title: "Vibrators",
    description: "Powerful pleasure devices designed to awaken every sensation"
  },
  dildos: {
    title: "Dildos",
    description: "Classic satisfaction in premium materials and luxurious designs"
  },
  plugs: {
    title: "Plugs",
    description: "Explore new depths of pleasure with our curated selection"
  },
  "bondage-kits": {
    title: "Bondage Kits",
    description: "Surrender to desire with our premium restraint collections"
  },
  "roses-tools": {
    title: "Roses & Tools",
    description: "Delicate pleasure tools and viral sensations"
  },
  "couple-play": {
    title: "Couple Play",
    description: "Share intimate moments and deepen your connection"
  },
  "beginner-essentials": {
    title: "Beginner Essentials",
    description: "Start your pleasure journey with confidence and care"
  },
  luxury: {
    title: "Luxury Line",
    description: "Indulge in the finest pleasure products crafted for discerning tastes"
  }
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<"popularity" | "price-low" | "price-high" | "new">("popularity");
  
  const info = slug ? collectionInfo[slug] : null;
  const products = slug ? getProductsByCategory(slug) : [];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popularity":
        return b.reviewCount - a.reviewCount;
      case "new":
        return 0;
      default:
        return 0;
    }
  });

  if (!info) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif mb-4">Collection Not Found</h1>
            <Link to="/collections">
              <Button>Browse All Collections</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Collection Header */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif mb-4">
                <span className="text-gradient">{info.title}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {info.description}
              </p>
            </div>
          </div>
        </section>

        {/* Sort Options */}
        <section className="py-6 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-background border border-border/50 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="new">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square bg-muted/30 flex items-center justify-center text-6xl cursor-pointer group-hover:scale-105 transition-smooth">
                        {product.images[0]}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-smooth">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <p className="text-2xl font-serif text-primary">
                        KES {product.price.toLocaleString()}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Link to={`/product/${product.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Product
                          </Button>
                        </Link>
                        <Button 
                          className="flex-1"
                          onClick={() => addToCart({
                            id: Number(product.id),
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            category: product.category,
                          })}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionPage;
