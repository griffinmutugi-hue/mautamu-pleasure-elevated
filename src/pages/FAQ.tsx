import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my order really discreet?",
    answer: "Absolutely. All orders are shipped in plain, unmarked packaging with no indication of contents. The return address and description on the package will not mention Mautamu or give any hint of what's inside. Your privacy is our top priority.",
  },
  {
    question: "How long does delivery take in Kenya?",
    answer: "Delivery times vary by location. Nairobi and major cities typically receive orders within 1-3 business days. Other areas may take 3-5 business days. You'll receive tracking information once your order ships.",
  },
  {
    question: "Are your products body-safe?",
    answer: "Yes, all our products are made from premium, body-safe materials such as medical-grade silicone, ABS plastic, and stainless steel. We prioritize your health and safety with every product we offer.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa (Lipa na M-Pesa), Visa, and Mastercard. All payments are processed securely and appear as a discrete transaction on your statement.",
  },
  {
    question: "Can I return a product?",
    answer: "Due to the intimate nature of our products, we cannot accept returns once the packaging has been opened. However, if you receive a defective or damaged product, please contact us within 7 days for a replacement.",
  },
  {
    question: "How do I clean and maintain my products?",
    answer: "Most products can be cleaned with warm water and mild soap or a specialized toy cleaner. Always check the care instructions that come with your product. Store in a cool, dry place away from direct sunlight.",
  },
  {
    question: "Do you offer a warranty?",
    answer: "Yes, all electronic products come with a 3-month manufacturer's warranty against defects. If your product stops working within this period under normal use, we'll replace it free of charge.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our discreet customer support team via email at support@mautamu.store or through our contact form. We typically respond within 24 hours.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-muted-foreground">
              Everything you need to know about ordering and our products
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-card border border-border/50 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary transition-smooth">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
