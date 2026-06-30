import {
  Camera,
  Shirt,
  Utensils,
  Stethoscope,
  Sparkles,
  Laptop,
  Car,
  User,
  Armchair,
  Briefcase,
  School,
  BookOpen,
  type LucideIcon
} from "lucide-react";

export interface WebsiteType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  category: "Retail" | "Services" | "Education" | "Creative";
  popularTools: string[];
  purpose: string;
  keyFeatures: string[];
  bestFor: string[];
  color: string;
}

export const websiteTypes: WebsiteType[] = [
  {
    id: "cloth-stores",
    title: "Clothing Boutiques",
    description: "Modern e-commerce platforms tailored for fashion and apparel, featuring seamless shopping carts and inventory sync.",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800",
    category: "Retail",
    popularTools: ["Secure Checkout", "Inventory Sync", "Size Guides"],
    purpose: "To sell clothing and fashion accessories online with a premium, brand-focused shopping experience.",
    keyFeatures: [
      "Visual product catalogs",
      "Secure payment gateways",
      "Size guides and fitting tools",
      "Wishlist functionality",
      "Order tracking",
      "Customer reviews"
    ],
    bestFor: ["Clothing Brands", "Retail Stores", "Fashion Designers"],
    color: "from-rose-500 to-pink-600"
  },
  {
    id: "restaurants",
    title: "Restaurants & Cafes",
    description: "Appetizing website designs with digital menus, table reservations, and integrated online food ordering systems.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    category: "Services",
    popularTools: ["Digital Menus", "Table Booking", "Online Orders"],
    purpose: "To attract diners, showcase your culinary offerings, and streamline the reservation and takeout process.",
    keyFeatures: [
      "Interactive digital menus",
      "Online table reservations",
      "Takeout and delivery integration",
      "Customer reviews and ratings",
      "Location and operating hours",
      "Event and catering inquiries"
    ],
    bestFor: ["Restaurants", "Cafes", "Food Trucks", "Bakeries"],
    color: "from-orange-500 to-amber-600"
  },
  {
    id: "hospitals",
    title: "Hospitals & Clinics",
    description: "Professional healthcare portals built for patient trust, featuring doctor directories, appointment scheduling, and health resources.",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    category: "Services",
    popularTools: ["Patient Portals", "Doctor Directory", "Telehealth"],
    purpose: "To provide critical health information, establish trust, and allow patients to easily book appointments.",
    keyFeatures: [
      "Secure patient portals",
      "Online appointment booking",
      "Doctor and staff directories",
      "Emergency contact info",
      "Health resource blog",
      "Insurance information"
    ],
    bestFor: ["Hospitals", "Dental Clinics", "Specialists", "Therapists"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "beauty-parlors",
    title: "Beauty Parlors",
    description: "Elegant websites for salons and spas to showcase services, display pricing, and allow clients to book appointments 24/7.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    category: "Services",
    popularTools: ["Service Menus", "24/7 Booking", "Staff Profiles"],
    purpose: "To highlight beauty services and streamline the booking process for recurring salon clients.",
    keyFeatures: [
      "Visual service menus",
      "Automated booking calendars",
      "Stylist/Staff portfolios",
      "Pricing tables",
      "Client testimonials",
      "Product sales"
    ],
    bestFor: ["Beauty Salons", "Spas", "Nail Parlors", "Barbershops"],
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: "photo-studios",
    title: "Photo Studios",
    description: "Stunning galleries and portfolio sites designed to showcase your photography, manage bookings, and attract high-end clients.",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    category: "Creative",
    popularTools: ["Gallery Showcase", "Online Booking", "Client Portals"],
    purpose: "To display high-resolution imagery beautifully and capture leads for photography sessions.",
    keyFeatures: [
      "High-res masonry galleries",
      "Private client photo portals",
      "Package pricing displays",
      "Session booking calendars",
      "Social media integration",
      "Print store integration"
    ],
    bestFor: ["Photographers", "Videographers", "Creative Studios"],
    color: "from-slate-600 to-slate-800"
  },
  {
    id: "electronics",
    title: "Tech & Mobiles",
    description: "High-performance tech e-commerce sites optimized for electronic accessories, featuring rich product specs and quick checkout.",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
    category: "Retail",
    popularTools: ["Product Specs", "Quick Checkout", "Tech Support"],
    purpose: "To sell electronics with detailed technical specifications and a fast, reliable purchasing flow.",
    keyFeatures: [
      "Advanced product filtering",
      "Technical specification tables",
      "Product comparison tools",
      "Secure checkout",
      "Warranty registration",
      "Live chat support"
    ],
    bestFor: ["Mobile Shops", "Computer Stores", "Accessory Retailers"],
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: "automotive",
    title: "Bike & Car Showrooms",
    description: "Sleek automotive websites to showcase vehicle models, schedule test drives, and highlight financing options.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    category: "Retail",
    popularTools: ["Vehicle Galleries", "Test Drives", "Finance Calculators"],
    purpose: "To display luxury vehicles and convert online interest into in-person showroom visits.",
    keyFeatures: [
      "360-degree vehicle views",
      "Test drive scheduling",
      "Finance and EMI calculators",
      "Inventory search",
      "Service booking",
      "Spare parts store"
    ],
    bestFor: ["Car Dealerships", "Bike Showrooms", "Auto Repair"],
    color: "from-red-500 to-orange-600"
  },
  {
    id: "personal-portfolios",
    title: "Personal Portfolios",
    description: "Showcase your individual talent, professional resume, and past projects with a uniquely branded digital identity.",
    icon: User,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
    category: "Creative",
    popularTools: ["Resume Download", "Case Studies", "Contact Forms"],
    purpose: "To build a strong personal brand and attract recruiters, clients, or freelance gigs.",
    keyFeatures: [
      "Personal branding elements",
      "Downloadable CV/Resume",
      "Project case studies",
      "Skills visualization",
      "Direct contact forms",
      "Blog integration"
    ],
    bestFor: ["Freelancers", "Designers", "Developers", "Artists"],
    color: "from-teal-500 to-emerald-600"
  },
  {
    id: "furnitures",
    title: "Furniture Stores",
    description: "Visually rich online catalogs and stores to display interior pieces, featuring room visualizations and delivery scheduling.",
    icon: Armchair,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    category: "Retail",
    popularTools: ["Room Visualizer", "Delivery Tracking", "Catalog Browsing"],
    purpose: "To sell home goods and furniture with high-quality imagery that helps buyers visualize items in their space.",
    keyFeatures: [
      "Room scene galleries",
      "Color and material selectors",
      "Bulk delivery scheduling",
      "Augmented reality (AR) previews",
      "Interior design blog",
      "Trade programs"
    ],
    bestFor: ["Furniture Retailers", "Home Decor", "Interior Designers"],
    color: "from-amber-600 to-orange-700"
  },
  {
    id: "consultancies",
    title: "Consultancies",
    description: "Corporate websites designed to establish authority, highlight case studies, and generate high-quality B2B leads.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    category: "Services",
    popularTools: ["Case Studies", "Lead Generation", "Client Portals"],
    purpose: "To build B2B trust, showcase expertise, and convert high-value corporate clients.",
    keyFeatures: [
      "Professional service overviews",
      "In-depth case studies",
      "Whitepaper downloads",
      "Consultation booking",
      "Team leadership bios",
      "Secure client portals"
    ],
    bestFor: ["Business Consultants", "Law Firms", "Financial Advisors"],
    color: "from-slate-700 to-slate-900"
  },
  {
    id: "academics",
    title: "Schools & Colleges",
    description: "Comprehensive institutional portals for academics, featuring student notices, admission portals, and faculty directories.",
    icon: School,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    category: "Education",
    popularTools: ["Admission Portals", "Notice Boards", "Faculty Directory"],
    purpose: "To provide an informational hub for students, parents, and staff, streamlining admissions and communications.",
    keyFeatures: [
      "Online admission forms",
      "Digital notice boards",
      "Academic calendars",
      "Faculty and staff directories",
      "Alumni networks",
      "Fee payment portals"
    ],
    bestFor: ["Colleges", "Schools", "Universities", "Kindergartens"],
    color: "from-emerald-600 to-green-700"
  },
  {
    id: "coaching-centers",
    title: "Coaching Centers",
    description: "Dynamic platforms for institutes to sell courses, conduct online tests, and share student success stories and results.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    category: "Education",
    popularTools: ["Online Courses", "Mock Tests", "Success Stories"],
    purpose: "To attract students, offer online learning materials, and highlight the institute's track record of success.",
    keyFeatures: [
      "Course catalogs and syllabus",
      "Student success stories/rankings",
      "Mock test platforms",
      "Video lectures integration",
      "Doubt clearing forums",
      "Study material downloads"
    ],
    bestFor: ["Coaching Institutes", "Tutors", "Test Prep Centers"],
    color: "from-violet-600 to-indigo-700"
  }
];

export const categories = ["All", "Retail", "Services", "Education", "Creative"] as const;
export type Category = typeof categories[number];
