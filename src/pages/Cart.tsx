import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Mock cart data - will be replaced with actual cart state later
  const cartItems = [
    {
      id: 1,
      name: "Rose Blossom",
      price: 3500,
      quantity: 1,
      image: "🌹",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">
            Your <span className="text-gradient">Cart</span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-8">Your cart is empty</p>
              <Link to="/collections">
                <Button className="bg-primary hover:bg-primary/90 rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted/30 rounded-lg flex items-center justify-center text-4xl">
                          {item.image}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-primary font-semibold">
                            KES {item.price.toLocaleString()}
                          </p>
                          
                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <Button variant="ghost" size="icon" className="hover:text-destructive">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-gradient-card border-border/50 sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-serif text-2xl">Order Summary</h2>
                    
                    <div className="space-y-2 py-4 border-y border-border/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>KES {shipping.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">KES {total.toLocaleString()}</span>
                    </div>

                    <Link to="/checkout">
                      <Button className="w-full bg-primary hover:bg-primary/90 rounded-full py-6">
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <div className="text-center pt-4">
                      <p className="text-xs text-muted-foreground">
                        🔒 Discreet packaging guaranteed
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
