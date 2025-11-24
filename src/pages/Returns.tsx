import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Returns <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Your satisfaction and safety are our top priorities
            </p>
          </div>

          <div className="space-y-8">
            {/* Important Notice */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Important Notice</h2>
                  <p className="text-muted-foreground">
                    Due to the intimate and personal nature of our products, we maintain strict hygiene and safety standards. For health and safety reasons, we cannot accept returns on products once the packaging has been opened or the seal has been broken.
                  </p>
                </div>
              </div>
            </section>

            {/* Eligible for Return */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Eligible for Return or Replacement</h2>
                  <p className="text-muted-foreground mb-4">
                    We will accept returns or provide replacements in the following situations:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>
                      <span className="font-semibold text-foreground">Defective Products:</span> Items that are damaged, broken, or not functioning properly upon arrival
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Wrong Item:</span> You received a product different from what you ordered
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Damaged in Transit:</span> Products that arrived with visible damage to the item or packaging
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Unopened Products:</span> Items with the original seal intact may be returned within 7 days of delivery
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Not Eligible */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif mb-4">Not Eligible for Return</h2>
                  <p className="text-muted-foreground mb-4">
                    We cannot accept returns in these situations:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Products with broken seals or opened packaging</li>
                    <li>• Items damaged due to misuse or improper care</li>
                    <li>• Products purchased more than 7 days ago (for unopened items)</li>
                    <li>• Items without original packaging or accessories</li>
                    <li>• Change of mind after opening the product</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">How to Request a Return</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">Step 1:</span> Contact our customer support within 7 days of receiving your order
                </div>
                <div>
                  <span className="font-semibold text-foreground">Step 2:</span> Provide your order number and photos of the defect or damage
                </div>
                <div>
                  <span className="font-semibold text-foreground">Step 3:</span> Our team will review your request within 24 hours
                </div>
                <div>
                  <span className="font-semibold text-foreground">Step 4:</span> If approved, we'll arrange pickup or send a replacement
                </div>
              </div>
            </section>

            {/* Warranty */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Product Warranty</h2>
              <p className="text-muted-foreground mb-4">
                All electronic products come with a <span className="font-semibold text-foreground">3-month manufacturer's warranty</span> against defects under normal use.
              </p>
              <p className="text-muted-foreground">
                If your product stops working within this period, contact us for a free replacement. The warranty does not cover damage from misuse, accidents, or normal wear and tear.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-4">
                Our customer support team is here to help with any questions about returns or product issues.
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:support@mautamu.store" className="text-primary hover:underline">support@mautamu.store</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;