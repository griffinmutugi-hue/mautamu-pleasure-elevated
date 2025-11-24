import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              <span className="text-gradient">Disclaimer</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: November 2024
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">General Information</h2>
              <p className="text-muted-foreground">
                The information provided on Mautamu's website is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Medical Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                Mautamu is not a medical or healthcare provider. Our products are designed for adult pleasure and wellness, not for medical treatment or diagnosis.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Products are not intended to diagnose, treat, cure, or prevent any disease or medical condition</li>
                <li>Consult your healthcare provider before using any wellness products, especially if you have medical conditions or concerns</li>
                <li>If you experience pain, discomfort, or adverse reactions, discontinue use immediately and seek medical attention</li>
                <li>Pregnant or nursing individuals should consult a physician before using any intimate products</li>
                <li>Our products are not FDA-approved medical devices</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Product Safety & Use</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Read All Instructions:</span> Always read and follow product instructions, warnings, and care guidelines before use.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Individual Results May Vary:</span> Product experiences and results differ from person to person. What works for one individual may not work for another.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Allergies & Sensitivities:</span> Check all product materials and ingredients. If you have known allergies or sensitivities, verify compatibility before use.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Proper Hygiene:</span> Maintain proper hygiene before and after using any intimate products. Clean products according to manufacturer instructions.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Not for Sharing:</span> For hygiene and safety reasons, intimate products should not be shared between individuals.
                </p>
              </div>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">External Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Product Availability & Pricing</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Product availability is subject to change without notice</li>
                <li>Prices may be updated at any time and are only guaranteed at the time of purchase</li>
                <li>Product images are for illustration purposes and may vary slightly from actual items</li>
                <li>We reserve the right to limit quantities or refuse orders</li>
                <li>Promotional offers are subject to terms and conditions and may expire without notice</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">No Professional Advice</h2>
              <p className="text-muted-foreground mb-4">
                Content on our website, including product descriptions and blog posts, should not be considered:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Medical, therapeutic, or healthcare advice</li>
                <li>Professional counseling or therapy</li>
                <li>Relationship or sexual health counseling</li>
                <li>Legal advice</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Always seek the guidance of qualified professionals for specific concerns.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Mautamu, its owners, employees, or affiliates be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>Loss of data or profits arising out of or in connection with the use of this website</li>
                <li>Product use or misuse</li>
                <li>Allergic reactions or adverse effects from product use</li>
                <li>Decisions made based on information provided on our website</li>
                <li>Technical issues, website downtime, or data loss</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Age Restriction</h2>
              <p className="text-muted-foreground">
                All products and services offered by Mautamu are strictly for individuals 18 years of age or older. By accessing this website and purchasing products, you confirm that you meet this age requirement. We reserve the right to verify age and refuse service to anyone who cannot provide adequate proof of age.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Discretion & Confidentiality</h2>
              <p className="text-muted-foreground">
                While we guarantee discreet packaging and confidential handling of your orders, we cannot control how packages are handled once they leave our facility. We are not responsible for breaches of privacy that occur outside our direct control, such as packages being opened by household members or delivery personnel.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Technical Accuracy</h2>
              <p className="text-muted-foreground">
                We strive to ensure that all technical specifications, features, and product information are accurate. However, manufacturers may change product specifications without notice. We are not liable for any discrepancies between website descriptions and actual product specifications.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">User Responsibility</h2>
              <p className="text-muted-foreground mb-4">
                By using Mautamu's website and purchasing products, you acknowledge and accept that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You are solely responsible for how you use our products</li>
                <li>You will use products safely, legally, and as intended</li>
                <li>You have read and understood all product instructions and warnings</li>
                <li>You accept all risks associated with product use</li>
                <li>You will not hold Mautamu liable for misuse or improper use of products</li>
              </ul>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Changes to This Disclaimer</h2>
              <p className="text-muted-foreground">
                We reserve the right to update or modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of our website and services after any changes constitutes acceptance of the updated disclaimer.
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions or concerns about this disclaimer:
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:legal@mautamu.store" className="text-primary hover:underline">legal@mautamu.store</a><br />
                Phone: +254 712 345 678
              </p>
            </section>

            <section className="bg-gradient-card border border-border/50 rounded-lg p-8">
              <p className="text-sm text-muted-foreground italic">
                By using Mautamu's website and services, you acknowledge that you have read, understood, and agree to this disclaimer in its entirety.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;