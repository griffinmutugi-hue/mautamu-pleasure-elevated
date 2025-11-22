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
import { useToast } from "@/hooks/use-toast";

// Mock product data - in real app this would come from a database
const products = [
  {
    id: 1,
    name: "Rose Blossom",
    price: 3500,
    category: "Vibrators",
    images: ["🌹", "🌹", "🌹", "🌹"],
    rating: 5,
    reviews: 127,
    description: "Experience exquisite pleasure with the Rose Blossom. Designed with the modern woman in mind, this elegant piece combines powerful yet whisper-quiet vibrations with an ergonomic shape that adapts to your body. Its velvety-soft silicone exterior feels divine against your skin, while 10 customizable intensity levels ensure you find your perfect rhythm.",
    features: [
      "10 vibration modes with customizable intensity",
      "Whisper-quiet operation for complete discretion",
      "100% medical-grade silicone",
      "USB rechargeable with 2-hour playtime",
      "Waterproof for bath and shower play"
    ],
    specifications: {
      material: "Medical-grade silicone",
      size: "18cm length, 3.5cm diameter",
      power: "USB rechargeable",
      waterproof: "IPX7 rated",
      warranty: "1 year manufacturer warranty"
    },
    inStock: true
  },
  {
    id: 2,
    name: "Velvet Touch",
    price: 4200,
    category: "Dildos",
    images: ["💎", "💎", "💎", "💎"],
    rating: 5,
    reviews: 89,
    description: "The Velvet Touch redefines luxury in intimate pleasure. Crafted from the finest body-safe materials, this elegantly curved piece features a realistic yet refined design that delivers deep, satisfying pleasure. The ultra-smooth surface glides effortlessly, while the flexible shaft adapts to your unique anatomy.",
    features: [
      "Dual-density design for realistic feel",
      "Strong suction cup base for hands-free play",
      "Body-safe, phthalate-free material",
      "Temperature responsive for warm or cool sensations",
      "Easy to clean and maintain"
    ],
    specifications: {
      material: "Premium TPE with silicone coating",
      size: "20cm length, 4cm diameter",
      power: "Manual",
      waterproof: "Fully submersible",
      warranty: "6 months manufacturer warranty"
    },
    inStock: true
  },
  {
    id: 3,
    name: "Whisper Vibrator",
    price: 3800,
    category: "Vibrators",
    images: ["✨", "✨", "✨", "✨"],
    rating: 4.8,
    reviews: 156,
    description: "Indulge in discreet pleasure with the Whisper Vibrator. This sleek, sophisticated design combines powerful performance with near-silent operation, making it perfect for the woman who values both pleasure and privacy. The ergonomic curve targets all the right spots while the smooth silicone finish feels luxurious.",
    features: [
      "Ultra-quiet motor technology",
      "8 vibration patterns plus 5 speeds",
      "Ergonomic G-spot curve",
      "Travel-lock feature for discretion",
      "Quick-charge USB with LED indicator"
    ],
    specifications: {
      material: "Premium silicone",
      size: "16cm length, 3cm diameter",
      power: "Rechargeable lithium battery",
      waterproof: "IPX6 splash-proof",
      warranty: "1 year manufacturer warranty"
    },
    inStock: true
  },
  {
    id: 4,
    name: "Luxury Silk Set",
    price: 6500,
    category: "Bondage",
    images: ["🎀", "🎀", "🎀", "🎀"],
    rating: 5,
    reviews: 64,
    description: "Explore the art of sensual restraint with our Luxury Silk Set. This exquisite collection includes premium silk restraints, a satin blindfold, and a delicate feather tickler—all presented in a discreet velvet pouch. Perfect for couples seeking to add an element of anticipation and surrender to their intimate moments.",
    features: [
      "100% pure mulberry silk restraints",
      "Adjustable for comfort and security",
      "Satin-lined blindfold for complete darkness",
      "Premium ostrich feather tickler",
      "Comes in elegant velvet storage pouch"
    ],
    specifications: {
      material: "Mulberry silk, satin, ostrich feather",
      size: "Restraints: adjustable up to 90cm",
      power: "Manual",
      waterproof: "Not waterproof",
      warranty: "6 months manufacturer warranty"
    },
    inStock: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const product = products.find(p => p.id === parseInt(id || "0"));

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
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted 
        ? `${product.name} removed from your wishlist`
        : `${product.name} saved to your wishlist`,
    });
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
            <Link to={`/collections/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
              {product.category}
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
                  {product.category}
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
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-3xl font-semibold text-primary mb-6">
                  KES {product.price.toLocaleString()}
                </p>
              </div>

              <p className="text-foreground/90 leading-relaxed">
                {product.description}
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
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
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
          <Tabs defaultValue="features" className="mb-20">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-6">Product Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-6">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <p className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-medium text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-6">Care & Cleaning Guide</h3>
                  <div className="space-y-6 text-foreground/90">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Before First Use</h4>
                      <p>Clean thoroughly with warm water and mild antibacterial soap. Pat dry with a lint-free cloth.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">After Each Use</h4>
                      <p>Wash immediately with toy cleaner or mild soap. Ensure all residue is removed before storage.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Storage</h4>
                      <p>Store in a cool, dry place away from direct sunlight. Keep in the provided pouch or storage case.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Important Notes</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use only water-based lubricants with silicone products</li>
                        <li>Never use harsh chemicals or alcohol-based cleaners</li>
                        <li>Charge fully before first use and after prolonged storage</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Reviews Section */}
          <ProductReviews productName={product.name} totalReviews={product.reviews} rating={product.rating} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;