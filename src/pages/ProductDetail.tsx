import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductReviews from "@/components/ProductReviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Shield, Truck, Package, Star, Minus, Plus } from "lucide-react";
import { getProductById, getProductsByCategory } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : null;
  const isWishlisted = product ? isInWishlist(Number(product.id)) : false;
  const relatedProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4) : [];

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
            <Link to="/collections">
              <Button className="bg-primary hover:bg-primary/90 rounded-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    }, quantity);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(Number(product.id));
    } else {
      addToWishlist({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <span className="mx-2">/</span>
            <Link to={`/collections/${product.category}`} className="hover:text-primary transition-colors">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Product Main Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery */}
            <ProductImageGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-serif mb-4">
                  <span className="text-gradient">{product.name}</span>
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-3xl font-semibold text-primary mb-6">
                  KES {product.price.toLocaleString()}
                </p>
              </div>

              <p className="text-foreground/90 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      className="h-10 w-10 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                      className="h-10 w-10 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary/90 rounded-full py-6"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleToggleWishlist}
                    variant="outline"
                    size="icon"
                    className={`h-14 w-14 rounded-full ${
                      isWishlisted ? "text-primary border-primary" : ""
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                <div className="text-center space-y-2">
                  <Package className="h-6 w-6 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Discreet<br/>Packaging</p>
                </div>
                <div className="text-center space-y-2">
                  <Truck className="h-6 w-6 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Fast<br/>Delivery</p>
                </div>
                <div className="text-center space-y-2">
                  <Shield className="h-6 w-6 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Secure<br/>Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-20">
            <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-6">About This Product</h3>
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    {product.longDescription}
                  </p>
                  {product.careInstructions && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <h4 className="font-semibold mb-3 text-foreground">Care Instructions</h4>
                      <p className="text-foreground/90">{product.careInstructions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-6">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.material && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Material</p>
                        <p className="font-medium text-foreground">{product.material}</p>
                      </div>
                    )}
                    {product.size && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium text-foreground">{product.size}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Reviews Section */}
          <ProductReviews productName={product.name} totalReviews={product.reviewCount} rating={product.rating} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                You May Also <span className="text-gradient">Like</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden">
                    <CardContent className="p-0">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <div className="aspect-square bg-muted/30 flex items-center justify-center text-6xl cursor-pointer group-hover:scale-105 transition-smooth">
                          {relatedProduct.images[0]}
                        </div>
                      </Link>
                      <div className="p-4 space-y-2">
                        <Link to={`/product/${relatedProduct.id}`}>
                          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-smooth">
                            {relatedProduct.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(relatedProduct.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({relatedProduct.reviewCount})
                          </span>
                        </div>
                        <p className="text-xl font-serif text-primary">
                          KES {relatedProduct.price.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;