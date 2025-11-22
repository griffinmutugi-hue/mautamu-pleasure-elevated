import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { searchProducts } from "@/data/products";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = searchProducts(query);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Search Header */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif mb-4">
                Search Results
              </h1>
              <p className="text-lg text-muted-foreground">
                {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
              </p>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-6">
                  No products found matching your search.
                </p>
                <Link to="/collections">
                  <Button>Explore All Collections</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((product) => (
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
                          <Button className="flex-1">
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

export default SearchResults;
