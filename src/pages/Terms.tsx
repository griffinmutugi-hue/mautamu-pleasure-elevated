import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: November 2024
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Mautamu's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Age Requirement</h2>
              <p className="text-muted-foreground mb-4">
                You must be at least 18 years old to use our services and purchase products from Mautamu. By using this website, you represent and warrant that you are 18 years or older.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to request age verification and refuse service to anyone who cannot provide proof of age.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Product Information & Accuracy</h2>
              <p className="text-muted-foreground mb-4">
                We strive to provide accurate product descriptions, images, and specifications. However:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Product images are for illustration purposes and may vary slightly from actual items</li>
                <li>We reserve the right to correct any errors in product information, pricing, or availability</li>
                <li>Product availability is subject to change without notice</li>
                <li>Colors may appear differently depending on your device screen</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Ordering & Payment</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  When you place an order through our website:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are making an offer to purchase the product(s) selected</li>
                  <li>We reserve the right to accept or decline your order</li>
                  <li>Payment must be completed before order processing begins</li>
                  <li>All prices are in Kenyan Shillings (KES) and include applicable taxes</li>
                  <li>We accept M-Pesa and major credit/debit cards</li>
                  <li>Payment confirmation will be sent via SMS and email</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Shipping & Delivery</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>All orders are shipped in discreet, unmarked packaging</li>
                <li>Delivery times are estimates and not guaranteed</li>
                <li>You are responsible for providing accurate delivery information</li>
                <li>Risk of loss transfers to you upon delivery to the specified address</li>
                <li>Failed deliveries due to incorrect information may incur additional fees</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Returns & Refunds</h2>
              <p className="text-muted-foreground mb-4">
                Due to the intimate nature of our products:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Opened or unsealed products cannot be returned for hygiene reasons</li>
                <li>Defective products must be reported within 7 days of delivery</li>
                <li>Returns must be in original, unopened packaging</li>
                <li>Refunds are processed within 7-14 business days after approval</li>
                <li>Shipping costs are non-refundable unless the error was ours</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Please refer to our detailed Returns Policy for complete information.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Product Warranty</h2>
              <p className="text-muted-foreground">
                Electronic products come with a 3-month manufacturer's warranty against defects under normal use. The warranty does not cover damage from misuse, accidents, improper storage, or normal wear and tear.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Product Usage & Safety</h2>
              <p className="text-muted-foreground mb-4">
                By purchasing from Mautamu, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use products safely and as intended</li>
                <li>Read and follow all product instructions and safety warnings</li>
                <li>Maintain proper hygiene before and after product use</li>
                <li>Store products appropriately and away from children</li>
                <li>Discontinue use if irritation or discomfort occurs</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Privacy & Confidentiality</h2>
              <p className="text-muted-foreground">
                We are committed to protecting your privacy and maintaining confidentiality. All personal information is handled according to our Privacy Policy. We will never share your purchase history or personal details with third parties except as required for order fulfillment or by law.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on this website, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Text, images, graphics, logos, and design elements</li>
                <li>Product descriptions and photography</li>
                <li>Website functionality and features</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Are the property of Mautamu and protected by intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use our services for any unlawful purpose</li>
                <li>Resell our products without authorization</li>
                <li>Attempt to hack, disrupt, or compromise our website security</li>
                <li>Submit false or misleading information</li>
                <li>Use our content without permission</li>
                <li>Engage in fraudulent payment activities</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, Mautamu shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services. Our total liability shall not exceed the amount paid for the product in question.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service are governed by the laws of the Republic of Kenya. Any disputes shall be resolved in the courts of Kenya.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service:
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:legal@mautamu.store" className="text-primary hover:underline">legal@mautamu.store</a><br />
                Phone: +254 712 345 678
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;