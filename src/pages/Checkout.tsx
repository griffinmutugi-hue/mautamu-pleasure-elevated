import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  phone: z.string().regex(/^(07|2547)\d{8}$/, "Please enter a valid Kenyan phone number (07XXXXXXXX or 2547XXXXXXXX)"),
  location: z.string().trim().min(3, "Location must be at least 3 characters").max(100, "Location must be less than 100 characters"),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(200, "Address must be less than 200 characters"),
  mpesaPhone: z.string().optional(),
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              <span className="text-gradient">Your cart is empty</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some pleasure to your cart first.
            </p>
            <Button onClick={() => navigate("/collections")} className="rounded-full px-8 py-6 text-lg">
              Explore Collections
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shipping = 500;
  const total = subtotal + shipping;

  const onSubmit = (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === "mpesa") {
        toast({
          title: "STK Push Sent",
          description: `Payment processing. You'll receive an M-Pesa prompt on ${data.phone} shortly.`,
        });
      } else {
        toast({
          title: "Payment Processing",
          description: "Please wait while we process your card payment.",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">
            <span className="text-gradient">Checkout</span>
          </h1>

          <div className="mb-6 p-4 bg-muted/30 border border-border/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              ⚠️ Payment processing requires backend integration. This is currently a UI demonstration.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div className="space-y-6">
                {/* Contact Information */}
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-serif text-xl">Contact Information</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName" 
                        {...register("fullName")}
                        className={errors.fullName ? "border-destructive" : ""}
                        placeholder="Your full name"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-destructive">{errors.fullName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                        placeholder="07XX XXX XXX or 2547XX XXX XXX" 
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-serif text-xl">Delivery Address</h2>

                    <div className="space-y-2">
                      <Label htmlFor="location">Delivery Location (Area/Estate) *</Label>
                      <Input 
                        id="location"
                        {...register("location")}
                        className={errors.location ? "border-destructive" : ""}
                        placeholder="e.g., Westlands, Karen, etc."
                      />
                      {errors.location && (
                        <p className="text-xs text-destructive">{errors.location.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Full Delivery Address *</Label>
                      <Input 
                        id="address"
                        {...register("address")}
                        className={errors.address ? "border-destructive" : ""}
                        placeholder="Building name, floor, apartment number"
                      />
                      {errors.address && (
                        <p className="text-xs text-destructive">{errors.address.message}</p>
                      )}
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
                        <Input 
                          id="mpesaPhone" 
                          type="tel" 
                          {...register("mpesaPhone")}
                          placeholder="254XXXXXXXXX" 
                        />
                        <p className="text-xs text-muted-foreground">Leave blank to use contact number above</p>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            {...register("cardNumber")}
                            placeholder="1234 5678 9012 3456" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry" 
                              {...register("expiry")}
                              placeholder="MM/YY" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              {...register("cvv")}
                              placeholder="123" 
                              maxLength={3}
                            />
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
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-3 border-b border-border/50">
                          <div className="w-16 h-16 bg-muted/30 rounded flex items-center justify-center text-2xl">
                            {item.image}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.category} • Qty: {item.quantity}
                            </p>
                            <p className="text-sm text-primary">
                              KES {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 py-4 border-y border-border/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
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

                    <Button 
                      type="submit"
                      disabled={!isValid || isProcessing}
                      className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 text-lg"
                    >
                      {isProcessing ? "Processing..." : "Complete Order"}
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
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
