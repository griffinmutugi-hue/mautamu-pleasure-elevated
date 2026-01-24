import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { useCreateOrder } from "@/hooks/useOrders";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "254794043792";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().regex(/^(\+?254|0)7\d{8}$/, "Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)"),
  location: z.string().trim().min(3, "Location must be at least 3 characters").max(100, "Location must be less than 100 characters"),
  address: z.string().trim().min(5, "Address must be at least 5 characters").max(200, "Address must be less than 200 characters"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CHECKOUT_STORAGE_KEY = "mautamu_checkout_details";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved checkout details from localStorage
  const getSavedDetails = (): Partial<CheckoutFormData> => {
    try {
      const saved = localStorage.getItem(CHECKOUT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: getSavedDetails(),
  });

  // Watch all form fields for localStorage persistence
  const formValues = watch();

  // Save form details to localStorage whenever they change
  useEffect(() => {
    if (formValues.fullName || formValues.phone || formValues.location || formValues.address) {
      localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(formValues));
    }
  }, [formValues]);

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
              Add some items to your cart first.
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

  const generateWhatsAppMessage = (data: CheckoutFormData): string => {
    const cartItems = items
      .map((item) => `- ${item.name} (Qty: ${item.quantity}) — KES ${(item.price * item.quantity).toLocaleString()}`)
      .join("\n");

    return `Hi, I'd like to place an order.

Name: ${data.fullName}
Phone: ${data.phone}
Delivery Location: ${data.location}
Address: ${data.address}

My Cart:
${cartItems}

Total: KES ${total.toLocaleString()}

Please confirm availability.`;
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      // Save order to database
      await createOrder.mutateAsync({
        customer_name: data.fullName,
        customer_phone: data.phone,
        delivery_location: data.location,
        delivery_address: data.address,
        subtotal,
        shipping,
        total,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      // Clear cart after successful order
      clearCart();
      
      // Open WhatsApp
      const message = encodeURIComponent(generateWhatsAppMessage(data));
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(whatsappUrl, "_blank");

      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">
            <span className="text-gradient">Checkout</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Customer Details Form */}
              <div className="space-y-6">
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-serif text-xl">Customer Details</h2>
                    
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
                        placeholder="Your phone number" 
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Delivery Location (Town/Area) *</Label>
                      <Input 
                        id="location"
                        {...register("location")}
                        className={errors.location ? "border-destructive" : ""}
                        placeholder="e.g., Westlands, Karen, Mombasa"
                      />
                      {errors.location && (
                        <p className="text-xs text-destructive">{errors.location.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address / Exact Drop-off *</Label>
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
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-gradient-card border-border/50 sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-serif text-2xl">Order Summary</h2>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-3 border-b border-border/50">
                          <div className="w-16 h-16 bg-muted/30 rounded flex items-center justify-center overflow-hidden">
                            {item.image?.startsWith('http') ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-2xl">{item.image}</span>
                            )}
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
                      disabled={!isValid || isSubmitting}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full py-6 text-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <MessageCircle className="w-5 h-5" />
                      )}
                      {isSubmitting ? "Placing Order..." : "Order on WhatsApp"}
                    </Button>

                    <div className="space-y-2 pt-4">
                      <p className="text-xs text-center text-muted-foreground">
                        📦 Discreet packaging guaranteed
                      </p>
                      <p className="text-xs text-center text-muted-foreground">
                        🚚 Fast delivery across Kenya
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
