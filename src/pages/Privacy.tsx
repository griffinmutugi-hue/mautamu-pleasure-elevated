import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: November 2024
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                At Mautamu, we understand that privacy is paramount when purchasing intimate wellness products. This Privacy Policy explains how we collect, use, protect, and handle your personal information with the utmost discretion and security.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full name and contact details (email, phone number)</li>
                    <li>Delivery address and location information</li>
                    <li>Payment information (processed securely through encrypted channels)</li>
                    <li>Order history and product preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Browser type and device information</li>
                    <li>IP address and browsing patterns (anonymized)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Process and fulfill your orders with complete discretion</li>
                <li>Communicate order status, shipping updates, and customer support</li>
                <li>Improve our product selection and user experience</li>
                <li>Send promotional offers (only with your consent)</li>
                <li>Prevent fraud and ensure secure transactions</li>
                <li>Comply with legal obligations under Kenyan law</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Discreet Packaging & Billing</h2>
              <p className="text-muted-foreground mb-4">
                We guarantee complete discretion in all aspects of your purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>All packages are shipped in plain, unmarked packaging with no reference to Mautamu or product contents</li>
                <li>Billing descriptors on your bank or M-Pesa statement will appear as a neutral business name</li>
                <li>No product information is visible on the outside of packages</li>
                <li>Return addresses use generic business names</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Information Sharing & Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, rent, or trade your personal information. We only share information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-semibold text-foreground">Delivery Partners:</span> Only necessary information (name, address, phone) for order fulfillment</li>
                <li><span className="font-semibold text-foreground">Payment Processors:</span> Secure, encrypted payment information for transaction processing</li>
                <li><span className="font-semibold text-foreground">Legal Authorities:</span> Only when required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>SSL/TLS encryption for all data transmission</li>
                <li>Secure payment gateways compliant with PCI-DSS standards</li>
                <li>Regular security audits and updates</li>
                <li>Restricted employee access to personal data</li>
                <li>Encrypted data storage</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Under Kenyan data protection laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications at any time</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Cookies & Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser, though some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Age Verification</h2>
              <p className="text-muted-foreground">
                Our products are intended for adults 18 years and older. By using our website, you confirm that you meet this age requirement. We do not knowingly collect information from individuals under 18.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or a notice on our website.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:privacy@mautamu.store" className="text-primary hover:underline">privacy@mautamu.store</a><br />
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

export default Privacy;