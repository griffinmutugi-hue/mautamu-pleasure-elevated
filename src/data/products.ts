export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  material?: string;
  size?: string;
  careInstructions?: string;
}

export const products: Product[] = [
  // Vibrators
  {
    id: "vib-001",
    name: "Velvet Pulse Vibrator",
    price: 4500,
    description: "Experience waves of pleasure with our signature velvet-soft silicone",
    longDescription: "The Velvet Pulse delivers powerful, customizable vibrations in a luxuriously soft design. Its ergonomic shape finds your pleasure points with ease, while multiple intensity levels let you control every sensation.",
    category: "vibrators",
    images: ["💫", "✨", "🌙", "💎"],
    rating: 4.8,
    reviewCount: 124,
    material: "Medical-grade silicone",
    size: "18cm x 3.5cm",
    careInstructions: "Clean with warm water and toy cleaner. Store in a cool, dry place."
  },
  {
    id: "vib-002",
    name: "Rose Whisper Wand",
    price: 3200,
    description: "Delicate petals meet powerful pleasure in this elegant design",
    longDescription: "A sophisticated rose-inspired massager that combines beauty with function. Gentle suction technology creates unique sensations, perfect for those seeking something extraordinary.",
    category: "vibrators",
    images: ["🌹", "💐", "🌺", "🌸"],
    rating: 4.9,
    reviewCount: 203,
    material: "Body-safe ABS plastic with silicone",
    size: "12cm x 8cm",
    careInstructions: "Wipe clean with toy cleaner. Not waterproof."
  },
  {
    id: "vib-003",
    name: "Midnight Curve",
    price: 5800,
    description: "Sculpted curves designed for your deepest desires",
    longDescription: "This premium curved vibrator is engineered to hit all the right spots. With its dual motors and rechargeable battery, the Midnight Curve offers endless hours of exploration.",
    category: "vibrators",
    images: ["🌙", "⭐", "💫", "✨"],
    rating: 4.7,
    reviewCount: 89,
    material: "Premium silicone",
    size: "22cm x 4cm",
    careInstructions: "Fully waterproof. Clean after each use."
  },
  {
    id: "vib-004",
    name: "Soft Touch Bullet",
    price: 2900,
    description: "Small, discreet, powerful — your secret companion",
    longDescription: "Don't let the size fool you. This compact bullet packs serious power in a travel-friendly design. Perfect for beginners or those who love precision pleasure.",
    category: "vibrators",
    images: ["💎", "💫", "✨", "🌟"],
    rating: 4.6,
    reviewCount: 156,
    material: "Silicone coating",
    size: "8cm x 2cm",
    careInstructions: "Water-resistant. Clean with damp cloth."
  },
  {
    id: "vib-005",
    name: "Desire Pro Max",
    price: 6400,
    description: "Maximum power for the woman who knows what she wants",
    longDescription: "Our most powerful vibrator yet. The Desire Pro Max features 12 vibration modes, app connectivity, and a luxurious design worthy of your pleasure.",
    category: "vibrators",
    images: ["👑", "💎", "⭐", "✨"],
    rating: 5.0,
    reviewCount: 67,
    material: "Platinum-cured silicone",
    size: "20cm x 4.5cm",
    careInstructions: "Fully waterproof and rechargeable via USB."
  },

  // Dildos
  {
    id: "dil-001",
    name: "Classic Velvet",
    price: 3800,
    description: "Timeless design, endless satisfaction",
    longDescription: "The Classic Velvet offers realistic texture in a premium silicone finish. Its flexible yet firm design adapts to your body for perfect pleasure every time.",
    category: "dildos",
    images: ["🌙", "💫", "✨", "🌟"],
    rating: 4.7,
    reviewCount: 98,
    material: "Body-safe silicone",
    size: "18cm x 3.8cm",
    careInstructions: "Boilable and dishwasher safe."
  },
  {
    id: "dil-002",
    name: "Crystal Dream",
    price: 5200,
    description: "Glass elegance meets sensual pleasure",
    longDescription: "Hand-crafted borosilicate glass creates a unique experience. Use warm or cool for temperature play that awakens every nerve.",
    category: "dildos",
    images: ["💎", "🌟", "✨", "⭐"],
    rating: 4.9,
    reviewCount: 76,
    material: "Borosilicate glass",
    size: "16cm x 3cm",
    careInstructions: "Heat-resistant and easy to sterilize."
  },
  {
    id: "dil-003",
    name: "Double Delight",
    price: 4600,
    description: "Dual pleasure for the adventurous",
    longDescription: "Explore double penetration in comfort and style. Designed with two perfectly angled shafts for simultaneous pleasure.",
    category: "dildos",
    images: ["💕", "💖", "💗", "💘"],
    rating: 4.5,
    reviewCount: 54,
    material: "Dual-density silicone",
    size: "20cm total length",
    careInstructions: "Clean thoroughly after each use."
  },
  {
    id: "dil-004",
    name: "Midnight Rider",
    price: 4200,
    description: "Ride your way to ecstasy",
    longDescription: "Featuring a strong suction base, the Midnight Rider lets you enjoy hands-free pleasure exactly how you like it.",
    category: "dildos",
    images: ["🌙", "🖤", "💜", "💙"],
    rating: 4.8,
    reviewCount: 112,
    material: "Premium silicone with suction base",
    size: "19cm x 4.2cm",
    careInstructions: "Waterproof and harness-compatible."
  },
  {
    id: "dil-005",
    name: "Blush Sensation",
    price: 3400,
    description: "Soft curves for gentle exploration",
    longDescription: "Perfect for beginners, the Blush Sensation offers a gentle introduction with its soft, flexible design and comfortable girth.",
    category: "dildos",
    images: ["🌸", "🌺", "💐", "🌷"],
    rating: 4.6,
    reviewCount: 145,
    material: "Soft-touch silicone",
    size: "15cm x 3cm",
    careInstructions: "Easy to clean and store discreetly."
  },

  // Plugs
  {
    id: "plug-001",
    name: "Jewel Temptation",
    price: 2800,
    description: "Beautiful adornment, exquisite sensation",
    longDescription: "This elegant jeweled plug combines aesthetics with pleasure. The smooth taper makes insertion easy, while the crystal base adds a touch of luxury.",
    category: "plugs",
    images: ["💎", "✨", "🌟", "⭐"],
    rating: 4.7,
    reviewCount: 87,
    material: "Stainless steel with crystal",
    size: "8cm x 2.8cm",
    careInstructions: "Non-porous and easy to sterilize."
  },
  {
    id: "plug-002",
    name: "Velvet Starter Kit",
    price: 3200,
    description: "Three sizes to grow with your desires",
    longDescription: "Begin your journey with confidence. This kit includes small, medium, and large plugs in luxurious silicone, perfect for gradual exploration.",
    category: "plugs",
    images: ["🌙", "✨", "💫", "🌟"],
    rating: 4.9,
    reviewCount: 134,
    material: "Medical-grade silicone set",
    size: "Small to Large progression",
    careInstructions: "Boilable between uses."
  },
  {
    id: "plug-003",
    name: "Vibrating Bliss",
    price: 4100,
    description: "Add vibration to new depths of pleasure",
    longDescription: "Experience the best of both worlds. This vibrating plug delivers intense sensations with multiple speed settings and a comfortable base.",
    category: "plugs",
    images: ["💫", "⚡", "✨", "🌟"],
    rating: 4.6,
    reviewCount: 72,
    material: "Silicone with rechargeable motor",
    size: "10cm x 3.2cm",
    careInstructions: "Water-resistant. USB rechargeable."
  },
  {
    id: "plug-004",
    name: "Tail Fantasy",
    price: 3600,
    description: "Unleash your playful side",
    longDescription: "Luxurious faux fur tail attached to a comfortable silicone plug. Perfect for role play and exploring your wild fantasies.",
    category: "plugs",
    images: ["🦊", "🐱", "🐰", "✨"],
    rating: 4.5,
    reviewCount: 61,
    material: "Silicone plug with synthetic fur",
    size: "9cm plug + 30cm tail",
    careInstructions: "Clean plug only. Spot clean tail."
  },
  {
    id: "plug-005",
    name: "Inflatable Explorer",
    price: 4800,
    description: "Expand your horizons, literally",
    longDescription: "This innovative inflatable plug lets you control the size and sensation with a hand pump. Perfect for advanced users seeking new challenges.",
    category: "plugs",
    images: ["🎈", "💫", "✨", "🌟"],
    rating: 4.4,
    reviewCount: 43,
    material: "Inflatable medical-grade material",
    size: "Adjustable up to 5cm diameter",
    careInstructions: "Deflate fully before cleaning."
  },

  // Bondage Kits
  {
    id: "bond-001",
    name: "Surrender Starter Set",
    price: 5500,
    description: "Give in to pleasure, one restraint at a time",
    longDescription: "This luxurious 5-piece set includes wrist cuffs, ankle cuffs, blindfold, and connector straps. Soft yet secure, perfect for beginners.",
    category: "bondage-kits",
    images: ["🔗", "🖤", "💜", "✨"],
    rating: 4.8,
    reviewCount: 156,
    material: "Vegan leather and satin",
    size: "Adjustable straps",
    careInstructions: "Spot clean only."
  },
  {
    id: "bond-002",
    name: "Silken Restraints",
    price: 3800,
    description: "Luxury bondage in soft silk",
    longDescription: "Indulge in the sensation of pure silk against your skin. These restraints are as beautiful as they are functional.",
    category: "bondage-kits",
    images: ["💜", "🎀", "✨", "💫"],
    rating: 4.7,
    reviewCount: 92,
    material: "100% mulberry silk",
    size: "150cm length each",
    careInstructions: "Hand wash in cold water."
  },
  {
    id: "bond-003",
    name: "Under Bed Restraint System",
    price: 6200,
    description: "Transform your bed into a playground",
    longDescription: "Discreet restraint system that slips under any mattress. Includes four adjustable straps and cuffs for complete surrender.",
    category: "bondage-kits",
    images: ["🔗", "🛏️", "🖤", "✨"],
    rating: 4.9,
    reviewCount: 118,
    material: "Reinforced nylon straps",
    size: "Universal fit",
    careInstructions: "Machine washable straps."
  },
  {
    id: "bond-004",
    name: "Blindfold & Feather Set",
    price: 2900,
    description: "Heighten every touch, every sensation",
    longDescription: "Sensory play at its finest. Luxurious satin blindfold paired with a soft feather tickler for teasing pleasure.",
    category: "bondage-kits",
    images: ["🎭", "🪶", "✨", "💫"],
    rating: 4.6,
    reviewCount: 134,
    material: "Satin and natural feathers",
    size: "Adjustable blindfold",
    careInstructions: "Spot clean blindfold."
  },
  {
    id: "bond-005",
    name: "Luxury Collar & Leash",
    price: 4200,
    description: "For those who love to lead... or be led",
    longDescription: "Premium vegan leather collar with D-ring attachment and matching leash. Adjustable for comfort during extended play.",
    category: "bondage-kits",
    images: ["🔗", "👑", "🖤", "✨"],
    rating: 4.7,
    reviewCount: 87,
    material: "Vegan leather with metal hardware",
    size: "Adjustable 30-40cm collar",
    careInstructions: "Wipe clean with damp cloth."
  },

  // Roses & Tools
  {
    id: "rose-001",
    name: "Rose Gold Pleasure",
    price: 3600,
    description: "The viral sensation that delivers real results",
    longDescription: "Experience the phenomenon everyone's talking about. Unique suction technology wrapped in an elegant rose design.",
    category: "roses-tools",
    images: ["🌹", "✨", "💫", "🌟"],
    rating: 5.0,
    reviewCount: 287,
    material: "Silicone and ABS plastic",
    size: "10cm x 8cm",
    careInstructions: "Water-resistant. USB rechargeable."
  },
  {
    id: "rose-002",
    name: "Double Rose Delight",
    price: 4800,
    description: "Two roses, double the pleasure",
    longDescription: "Why choose one when you can have both? Dual suction heads for simultaneous stimulation that will leave you breathless.",
    category: "roses-tools",
    images: ["🌹", "🌹", "💕", "✨"],
    rating: 4.9,
    reviewCount: 165,
    material: "Medical-grade silicone",
    size: "15cm x 10cm",
    careInstructions: "Fully waterproof design."
  },
  {
    id: "rose-003",
    name: "Feather Touch Massager",
    price: 2400,
    description: "Gentle whispers of pleasure",
    longDescription: "Ultra-soft silicone tips create feather-light sensations. Perfect for teasing and building anticipation.",
    category: "roses-tools",
    images: ["🪶", "✨", "💫", "🌟"],
    rating: 4.5,
    reviewCount: 78,
    material: "Silicone tips",
    size: "20cm length",
    careInstructions: "Wipe clean after use."
  },
  {
    id: "rose-004",
    name: "Pleasure Paddle",
    price: 3200,
    description: "A little pain, a lot of pleasure",
    longDescription: "Luxurious vegan leather paddle for those who like their pleasure with a sting. One side soft, one side firm.",
    category: "roses-tools",
    images: ["🖤", "💜", "✨", "💫"],
    rating: 4.7,
    reviewCount: 92,
    material: "Vegan leather",
    size: "30cm x 8cm",
    careInstructions: "Condition leather regularly."
  },
  {
    id: "rose-005",
    name: "Warming Massage Oil Set",
    price: 2800,
    description: "Sensual scents to set the mood",
    longDescription: "Three warming massage oils in aphrodisiac scents: Rose, Vanilla, and Jasmine. Edible and skin-safe.",
    category: "roses-tools",
    images: ["🌹", "🕯️", "✨", "💫"],
    rating: 4.8,
    reviewCount: 203,
    material: "Natural oils",
    size: "3 x 100ml bottles",
    careInstructions: "Store in cool place."
  },

  // Couple Play
  {
    id: "couple-001",
    name: "Connected Bliss Duo",
    price: 7200,
    description: "Share pleasure from anywhere",
    longDescription: "App-controlled couples set that lets you pleasure each other from any distance. Includes his and hers devices with synchronized vibrations.",
    category: "couple-play",
    images: ["💕", "💖", "✨", "💫"],
    rating: 4.9,
    reviewCount: 143,
    material: "Body-safe silicone",
    size: "Ergonomic designs",
    careInstructions: "Fully waterproof set."
  },
  {
    id: "couple-002",
    name: "C-Ring Vibrator",
    price: 3400,
    description: "Enhance him, pleasure her",
    longDescription: "Stretchy vibrating ring that enhances his performance while stimulating her with targeted vibrations. Win-win pleasure.",
    category: "couple-play",
    images: ["💍", "💫", "✨", "💕"],
    rating: 4.6,
    reviewCount: 178,
    material: "Stretchy silicone",
    size: "One size fits most",
    careInstructions: "Disposable or reusable options."
  },
  {
    id: "couple-003",
    name: "Wearable Couples Vibe",
    price: 5800,
    description: "Pleasure during intimacy, hands-free",
    longDescription: "Wear during intercourse for simultaneous pleasure. Flexible design stays in place while adding powerful vibrations.",
    category: "couple-play",
    images: ["💕", "🌙", "✨", "💫"],
    rating: 4.8,
    reviewCount: 167,
    material: "Premium silicone",
    size: "Flexible fit",
    careInstructions: "Rechargeable and waterproof."
  },
  {
    id: "couple-004",
    name: "Foreplay Dice Game",
    price: 1800,
    description: "Let chance decide your pleasure",
    longDescription: "Playful dice set that suggests actions and body parts. Turn foreplay into an exciting game of chance.",
    category: "couple-play",
    images: ["🎲", "💕", "✨", "💫"],
    rating: 4.4,
    reviewCount: 256,
    material: "Acrylic dice",
    size: "Standard dice size",
    careInstructions: "Wipe clean."
  },
  {
    id: "couple-005",
    name: "Intimacy Card Deck",
    price: 2200,
    description: "52 ways to connect deeper",
    longDescription: "Beautifully designed card deck with intimate challenges, questions, and activities to deepen your connection.",
    category: "couple-play",
    images: ["🃏", "💕", "✨", "🌹"],
    rating: 4.7,
    reviewCount: 189,
    material: "Premium card stock",
    size: "Standard playing card size",
    careInstructions: "Keep dry."
  },

  // Beginner Essentials
  {
    id: "begin-001",
    name: "First Time Exploration Kit",
    price: 4200,
    description: "Everything you need to start your journey",
    longDescription: "Complete starter set including a small vibrator, lubricant, and toy cleaner. Perfect for your first step into pleasure.",
    category: "beginner-essentials",
    images: ["🌸", "✨", "💫", "🌟"],
    rating: 4.9,
    reviewCount: 312,
    material: "Body-safe materials",
    size: "Kit includes multiple items",
    careInstructions: "Instructions included."
  },
  {
    id: "begin-002",
    name: "Gentle Touch Bullet",
    price: 1800,
    description: "Small, quiet, perfect for beginners",
    longDescription: "Ultra-quiet bullet vibrator perfect for first-time users. Single button operation makes it foolproof.",
    category: "beginner-essentials",
    images: ["💎", "✨", "💫", "🌟"],
    rating: 4.6,
    reviewCount: 267,
    material: "ABS plastic",
    size: "7cm length",
    careInstructions: "Battery-operated. Easy clean."
  },
  {
    id: "begin-003",
    name: "Silky Smooth Lubricant",
    price: 1200,
    description: "Essential for comfort and pleasure",
    longDescription: "Water-based, glycerin-free formula that's safe for all toys and all bodies. Never sticky, always smooth.",
    category: "beginner-essentials",
    images: ["💧", "✨", "💫", "🌟"],
    rating: 4.8,
    reviewCount: 421,
    material: "Water-based formula",
    size: "100ml bottle",
    careInstructions: "Store at room temperature."
  },
  {
    id: "begin-004",
    name: "Kegel Training Set",
    price: 2600,
    description: "Strengthen and enhance your pleasure",
    longDescription: "Progressive set of three weighted balls to strengthen your pelvic floor for better orgasms and health.",
    category: "beginner-essentials",
    images: ["💪", "✨", "💫", "🌸"],
    rating: 4.7,
    reviewCount: 198,
    material: "Medical-grade silicone",
    size: "Graduated weights",
    careInstructions: "Boilable for sterilization."
  },
  {
    id: "begin-005",
    name: "Discovery Book & Toy",
    price: 3400,
    description: "Learn and explore with confidence",
    longDescription: "Beautiful guidebook on self-pleasure paired with a beginner-friendly vibrator. Knowledge and pleasure in one package.",
    category: "beginner-essentials",
    images: ["📖", "💫", "✨", "🌸"],
    rating: 4.9,
    reviewCount: 234,
    material: "Book and silicone toy",
    size: "Book + compact vibe",
    careInstructions: "Keep book dry."
  },

  // Luxury Line
  {
    id: "lux-001",
    name: "24K Gold Vibrator",
    price: 12800,
    description: "Pleasure worthy of royalty",
    longDescription: "Hand-finished with 24K gold plating, this luxury vibrator is a work of art. Powerful, silent, and absolutely exquisite.",
    category: "luxury",
    images: ["👑", "✨", "💎", "🌟"],
    rating: 5.0,
    reviewCount: 45,
    material: "24K gold-plated brass",
    size: "18cm x 3cm",
    careInstructions: "Polish with soft cloth."
  },
  {
    id: "lux-002",
    name: "Crystal Wand Collection",
    price: 8900,
    description: "Gemstone pleasure for mind, body, soul",
    longDescription: "Set of three crystal wands: Rose Quartz, Jade, and Amethyst. Each carved from genuine gemstones for a transcendent experience.",
    category: "luxury",
    images: ["💎", "🌟", "✨", "💫"],
    rating: 4.9,
    reviewCount: 67,
    material: "Genuine gemstones",
    size: "15-18cm each",
    careInstructions: "Hand wash with care."
  },
  {
    id: "lux-003",
    name: "Designer Leather Set",
    price: 15600,
    description: "Italian craftsmanship meets BDSM luxury",
    longDescription: "Handcrafted in Italy from the finest leather. Complete bondage set that belongs in a museum and your bedroom.",
    category: "luxury",
    images: ["🖤", "👑", "✨", "💎"],
    rating: 5.0,
    reviewCount: 23,
    material: "Italian leather and gold hardware",
    size: "Custom-crafted pieces",
    careInstructions: "Professional leather care."
  },
  {
    id: "lux-004",
    name: "Smart Pleasure System",
    price: 18900,
    description: "AI-powered pleasure perfected",
    longDescription: "The future of pleasure. App-controlled system with AI that learns your preferences and creates custom pleasure patterns.",
    category: "luxury",
    images: ["🤖", "✨", "💫", "🌟"],
    rating: 4.8,
    reviewCount: 34,
    material: "Aerospace-grade materials",
    size: "Complete system",
    careInstructions: "Premium warranty included."
  },
  {
    id: "lux-005",
    name: "Platinum Anniversary Set",
    price: 22400,
    description: "The ultimate luxury gift",
    longDescription: "Limited edition set featuring our finest pieces in a handcrafted presentation box. The pinnacle of sensual luxury.",
    category: "luxury",
    images: ["👑", "💎", "✨", "🌟"],
    rating: 5.0,
    reviewCount: 12,
    material: "Platinum accents, premium materials",
    size: "Luxury presentation box",
    careInstructions: "White-glove care instructions."
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};
