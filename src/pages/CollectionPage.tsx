import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useProductsByCategory } from "@/hooks/useProducts";
import { useCollectionBySlug } from "@/hooks/useCollections";

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<"popularity" | "price-low" | "price-high" | "new">("popularity");
  
  const { data: collection, isLoading: collectionLoading } = useCollectionBySlug(slug || "");
  const { data: products = [], isLoading: productsLoading } = useProductsByCategory(slug || "");

  const isLoading = collectionLoading || productsLoading;

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popularity":
        return b.review_count - a.review_count;
      case "new":
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!collection) {
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
                {collection.emoji && <span className="mr-3">{collection.emoji}</span>}
                <span className="text-gradient">{collection.name}</span>
              </h1>
              {collection.description && (
                <p className="text-lg text-muted-foreground">
                  {collection.description}
                </p>
              )}
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
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products in this collection yet.</p>
                <Link to="/collections" className="mt-4 inline-block">
                  <Button variant="outline">Browse Other Collections</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square bg-muted/30 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-smooth overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-6xl">📦</span>
                          )}
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
                            ({product.review_count})
                          </span>
                        </div>

                        {/* Price */}
                        <p className="text-2xl font-serif text-primary">
                          KES {product.price.toLocaleString()}
                        </p>

                        {/* Stock Status */}
                        {product.quantity === 0 && (
                          <p className="text-sm text-destructive font-medium">Out of Stock</p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Link to={`/product/${product.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Product
                            </Button>
                          </Link>
                          <Button 
                            className="flex-1"
                            disabled={product.quantity === 0}
                            onClick={() => addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.images?.[0] || "",
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionPage;
