import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CollectionsGrid from "@/components/CollectionsGrid";
import BestSellers from "@/components/BestSellers";
import Testimonials from "@/components/Testimonials";
import DiscreetPromise from "@/components/DiscreetPromise";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <CollectionsGrid />
        <BestSellers />
        <DiscreetPromise />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
