import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif mb-6">
                About <span className="text-gradient">Mautamu</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Empowering Kenyan women to explore their desires
              </p>
            </div>

            <div className="space-y-8 text-foreground">
              <div className="space-y-4">
                <h2 className="text-2xl font-serif text-gradient">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mautamu was born from a simple truth: every woman deserves to experience pleasure on her own terms. 
                  We're breaking the silence around women's sexuality in Kenya, creating a safe, discreet space where 
                  desires are celebrated, not hidden.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-serif text-gradient">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide premium, body-safe pleasure products with complete discretion and privacy. 
                  We believe that sexual wellness is essential to every woman's well-being, and we're committed 
                  to making it accessible, luxurious, and unapologetically empowering.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-serif text-gradient">Our Promise</h2>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl">🔒</div>
                    <h3 className="font-semibold">100% Discreet</h3>
                    <p className="text-sm text-muted-foreground">
                      Plain packaging, no branding, total privacy
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl">✨</div>
                    <h3 className="font-semibold">Premium Quality</h3>
                    <p className="text-sm text-muted-foreground">
                      Only body-safe, medical-grade materials
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl">🇰🇪</div>
                    <h3 className="font-semibold">Kenya Proud</h3>
                    <p className="text-sm text-muted-foreground">
                      Fast, reliable delivery nationwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
