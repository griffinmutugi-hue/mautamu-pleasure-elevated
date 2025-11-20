import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const collections = [
  { name: "Vibrators", slug: "vibrators", emoji: "💫", description: "Explore endless pleasure" },
  { name: "Dildos", slug: "dildos", emoji: "🌙", description: "Classic satisfaction" },
  { name: "Plugs", slug: "plugs", emoji: "✨", description: "New sensations" },
  { name: "Bondage Kits", slug: "bondage", emoji: "🔗", description: "Surrender control" },
  { name: "Roses & Tools", slug: "roses", emoji: "🌹", description: "Delicate pleasure" },
  { name: "Couple Play", slug: "couples", emoji: "💕", description: "Share the moment" },
  { name: "Beginner Essentials", slug: "beginner", emoji: "🌸", description: "Start your journey" },
  { name: "Luxury Line", slug: "luxury", emoji: "👑", description: "Indulge yourself" },
];

const CollectionsGrid = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Explore <span className="text-gradient">Collections</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated selections for every desire and experience level
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link key={collection.slug} to={`/collection/${collection.slug}`}>
              <Card className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="text-5xl group-hover:scale-110 transition-smooth">
                    {collection.emoji}
                  </div>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-smooth">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
