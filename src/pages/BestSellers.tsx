import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BestSellers from "@/components/BestSellers";

const BestSellersPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <BestSellers />
      </main>
      <Footer />
    </div>
  );
};

export default BestSellersPage;
