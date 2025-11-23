import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionsGrid from "@/components/CollectionsGrid";

const Collections = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <CollectionsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
