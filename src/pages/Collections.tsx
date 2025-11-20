import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionsGrid from "@/components/CollectionsGrid";

const Collections = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif mb-4">
                <span className="text-gradient">Explore</span> Collections
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our curated collections designed to awaken every desire
              </p>
            </div>
          </div>
        </section>
        <CollectionsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
