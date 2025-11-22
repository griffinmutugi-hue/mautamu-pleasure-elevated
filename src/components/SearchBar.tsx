import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchProducts, getProductsByCategory } from "@/data/products";
import { Button } from "./ui/button";

const collections = [
  { name: "Vibrators", slug: "vibrators" },
  { name: "Dildos", slug: "dildos" },
  { name: "Plugs", slug: "plugs" },
  { name: "Bondage Kits", slug: "bondage-kits" },
  { name: "Roses & Tools", slug: "roses-tools" },
  { name: "Couple Play", slug: "couple-play" },
  { name: "Beginner Essentials", slug: "beginner-essentials" },
  { name: "Luxury Line", slug: "luxury" },
];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      // Search products
      const productResults = searchProducts(query).slice(0, 5);
      
      // Search collections
      const collectionResults = collections.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions([
        ...collectionResults.map(c => ({ type: "collection", ...c })),
        ...productResults.map(p => ({ type: "product", ...p }))
      ]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if query matches a collection
    const collection = collections.find(c => 
      c.name.toLowerCase() === query.toLowerCase()
    );

    if (collection) {
      navigate(`/collections/${collection.slug}`);
    } else {
      // Check if query matches a single product
      const products = searchProducts(query);
      if (products.length === 1) {
        navigate(`/product/${products[0].id}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }

    setIsOpen(false);
    setQuery("");
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === "collection") {
      navigate(`/collections/${suggestion.slug}`);
    } else {
      navigate(`/product/${suggestion.id}`);
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-primary transition-smooth"
      >
        <Search className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-[90vw] md:w-96 bg-background border border-border/50 rounded-lg shadow-elegant p-4 z-50">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or collections..."
              className="w-full bg-muted/30 border border-border/50 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSuggestions([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-smooth flex items-center gap-3"
                >
                  {suggestion.type === "collection" ? (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                        📁
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{suggestion.name}</p>
                        <p className="text-xs text-muted-foreground">Collection</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-2xl">
                        {suggestion.images[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{suggestion.name}</p>
                        <p className="text-xs text-muted-foreground">
                          KES {suggestion.price.toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}

          {query && suggestions.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground text-center">
              No results found. Try a different search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
