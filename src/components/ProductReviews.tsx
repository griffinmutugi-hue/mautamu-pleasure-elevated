import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  productName: string;
  totalReviews: number;
  rating: number;
}

// Mock reviews data
const reviews = [
  {
    id: 1,
    author: "Amina K.",
    location: "Nairobi",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Absolutely Worth It",
    content: "I was hesitant at first, but this has completely changed my self-care routine. The quality is exceptional and the delivery was so discreet - my family had no idea what arrived! Highly recommend for any woman exploring her pleasure.",
  },
  {
    id: 2,
    author: "Grace M.",
    location: "Mombasa",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "Game Changer",
    content: "This product is luxurious, powerful, and exactly what I needed. The packaging was elegant and completely discreet. Customer service was also very helpful when I had questions. Will definitely be ordering again!",
  },
  {
    id: 3,
    author: "Wanjiru N.",
    location: "Kisumu",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Beautiful Quality",
    content: "The material feels premium and the design is so elegant. It's clear this was made with women in mind. Shipping was fast and the discreet packaging made me feel comfortable ordering. Every woman deserves this kind of self-love.",
  },
  {
    id: 4,
    author: "Sarah L.",
    location: "Nakuru",
    rating: 4.5,
    date: "1 week ago",
    verified: true,
    title: "Very Satisfied",
    content: "Great product overall! The quality exceeded my expectations and it's so easy to use. Only minor thing is I wish it came with more detailed instructions, but I figured it out quickly. Very happy with my purchase.",
  },
];

const ProductReviews = ({ productName, totalReviews, rating }: ProductReviewsProps) => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          Customer <span className="text-gradient">Reviews</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{rating}</span>
          <span className="text-muted-foreground">({totalReviews} reviews)</span>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{review.author}</p>
                        {review.verified && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {review.location} • {review.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(review.rating)
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-foreground/90 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8">
          Load More Reviews
        </Button>
      </div>
    </section>
  );
};

export default ProductReviews;