import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, Clock, MapPin, Shield } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Shipping & <span className="text-gradient">Delivery</span>
            </h1>
            <p className="text-muted-foreground">
              Fast, discreet delivery across Kenya
            </p>
          </div>

          <div className="space-y-8">
            {/* Delivery Areas */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Delivery Areas</h2>
                  <p className="text-muted-foreground mb-4">
                    We currently deliver to all major towns and cities across Kenya, including:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                    <li>• Nairobi & Surrounding Areas</li>
                    <li>• Mombasa</li>
                    <li>• Kisumu</li>
                    <li>• Nakuru</li>
                    <li>• Eldoret</li>
                    <li>• Thika</li>
                    <li>• Malindi</li>
                    <li>• Kisii</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Don't see your area? Contact us - we're expanding our delivery network regularly.
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery Timeline */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Delivery Timeline</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Nairobi & Major Cities</h3>
                      <p className="text-muted-foreground">1-3 business days</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Other Urban Areas</h3>
                      <p className="text-muted-foreground">3-5 business days</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Remote Locations</h3>
                      <p className="text-muted-foreground">5-7 business days</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    All orders placed before 2 PM are processed the same day. Orders placed after 2 PM or on weekends are processed the next business day.
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping Cost */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Shipping Cost</h2>
                  <p className="text-muted-foreground mb-4">
                    Standard shipping fee: <span className="font-semibold text-foreground">KES 500</span>
                  </p>
                  <p className="text-muted-foreground">
                    Free shipping on orders over <span className="font-semibold text-primary">KES 10,000</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Discreet Packaging */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Discreet Packaging</h2>
                  <p className="text-muted-foreground mb-4">
                    Your privacy is our priority. All orders are shipped in plain, unmarked packaging:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• No branding or logos on the outside</li>
                    <li>• Neutral return address and description</li>
                    <li>• No indication of contents</li>
                    <li>• Secure, tamper-proof sealing</li>
                    <li>• Product information only inside the package</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tracking */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Order Tracking</h2>
              <p className="text-muted-foreground">
                Once your order ships, you'll receive an SMS and email with tracking information. You can monitor your delivery status in real-time through our courier partner's tracking system.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;