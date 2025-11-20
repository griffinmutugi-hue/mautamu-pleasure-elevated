import { Card, CardContent } from "@/components/ui/card";
import { Package, Shield, Truck, Clock } from "lucide-react";

const DiscreetPromise = () => {
  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Your <span className="text-gradient">Privacy</span> Matters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete discretion from order to delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Discreet Packaging</h3>
              <p className="text-sm text-muted-foreground">
                Plain, unmarked boxes with no indication of contents
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                M-Pesa & card payments with encrypted transactions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Nationwide Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Fast shipping across Kenya with tracking
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Private customer support ready to help
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DiscreetPromise;
