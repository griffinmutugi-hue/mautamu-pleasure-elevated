import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">
            <span className="text-gradient">Checkout</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-serif text-xl">Contact Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="07XX XXX XXX" />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-serif text-xl">Delivery Address</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-serif text-xl">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                        <span className="font-semibold">M-Pesa</span>
                        <p className="text-sm text-muted-foreground">Pay with Lipa na M-Pesa</p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <span className="font-semibold">Card Payment</span>
                        <p className="text-sm text-muted-foreground">Visa or Mastercard</p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "mpesa" && (
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                      <Input id="mpesaPhone" type="tel" placeholder="254XXXXXXXXX" />
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-gradient-card border-border/50 sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-serif text-2xl">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 pb-3 border-b border-border/50">
                      <div className="w-16 h-16 bg-muted/30 rounded flex items-center justify-center text-2xl">
                        🌹
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Rose Blossom</p>
                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                        <p className="text-sm text-primary">KES 3,500</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 py-4 border-y border-border/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>KES 3,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>KES 500</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">KES 4,000</span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 text-lg">
                    Complete Order
                  </Button>

                  <div className="space-y-2 pt-4">
                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Secure encrypted payment
                    </p>
                    <p className="text-xs text-center text-muted-foreground">
                      📦 Discreet packaging guaranteed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
