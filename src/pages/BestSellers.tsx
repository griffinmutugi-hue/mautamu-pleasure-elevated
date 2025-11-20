import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BestSellers from "@/components/BestSellers";

const BestSellersPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif mb-4">
                <span className="text-gradient">Best</span> Sellers
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our most loved products, chosen by women like you
              </p>
            </div>
          </div>
        </section>
        <BestSellers />
      </main>
      <Footer />
    </div>
  );
};

export default BestSellersPage;
