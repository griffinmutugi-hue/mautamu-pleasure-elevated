import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewArrivals } from "@/hooks/useProducts";

const NewArrivals = () => {
  const { data: newProducts, isLoading } = useNewArrivals();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              New <span className="text-gradient">Arrivals</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our latest collection of premium pleasure products, curated for your satisfaction
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gradient-card border border-border/50 rounded-lg overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : !newProducts || newProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-6">
                No new arrivals at the moment.
              </p>
              <Link to="/collections">
                <Button>Explore All Collections</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="bg-gradient-card border border-border/50 rounded-lg overflow-hidden hover:shadow-elegant transition-smooth">
                    <div className="relative">
                      <div className="aspect-square bg-muted/30 flex items-center justify-center text-6xl">
                        {product.images[0] || "🎁"}
                      </div>
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                        New
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-smooth">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          KES {product.price.toLocaleString()}
                        </span>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivals;
