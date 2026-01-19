import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollections } from "@/hooks/useCollections";

const CollectionsGrid = () => {
  const { data: collections, isLoading } = useCollections();

  if (isLoading) {
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
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-gradient-card border-border/50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!collections || collections.length === 0) {
    return null;
  }

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
            <Link key={collection.id} to={`/collections/${collection.slug}`}>
              <Card className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-smooth overflow-hidden h-full shadow-soft hover-lift">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="text-5xl group-hover:scale-125 transition-all duration-500">
                    {collection.emoji || '✨'}
                  </div>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-smooth">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-smooth">
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
