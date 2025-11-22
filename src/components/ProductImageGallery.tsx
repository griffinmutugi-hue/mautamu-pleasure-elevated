import { useState } from "react";
import { Card } from "@/components/ui/card";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="bg-gradient-card border-border/50 overflow-hidden">
        <div className="aspect-square bg-muted/30 flex items-center justify-center text-9xl p-8">
          {images[selectedImage]}
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-4xl transition-all hover:border-primary/50 ${
              selectedImage === index
                ? "border-2 border-primary shadow-glow"
                : "border border-border/50"
            }`}
          >
            {image}
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <p className="text-center text-sm text-muted-foreground">
        {selectedImage + 1} / {images.length}
      </p>
    </div>
  );
};

export default ProductImageGallery;