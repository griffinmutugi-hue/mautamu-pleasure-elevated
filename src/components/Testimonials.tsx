import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Amara K.",
    location: "Nairobi",
    rating: 5,
    text: "Finally, a brand that understands what I want. The packaging was so discreet, and the quality is amazing. I feel empowered.",
  },
  {
    name: "Zara M.",
    location: "Mombasa",
    rating: 5,
    text: "Mautamu changed everything for me. The products are beautiful, safe, and exactly what I needed. No shame, just pleasure.",
  },
  {
    name: "Nyambura W.",
    location: "Kisumu",
    rating: 5,
    text: "I was nervous ordering at first, but the experience was seamless. Fast delivery, complete privacy, and incredible products.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Loved by <span className="text-gradient">Women</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from confident women across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1 text-accent text-lg">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  "{testimonial.text}"
                </p>

                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
