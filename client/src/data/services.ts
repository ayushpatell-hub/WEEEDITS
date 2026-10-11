export type ServiceCategory =
  | "Social Media Content"
  | "Commercial Videos"
  | "Event Videography"
  | "Video Editing"
  | "Paid Promotions"
  | "Creator Services";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  emoji: string;
  description: string;
  audience: string;
  deliverables: string[];
  gradient: string;
};

export const categories: ("All Services" | ServiceCategory)[] = [
  "All Services",
  "Social Media Content",
  "Commercial Videos",
  "Event Videography",
  "Video Editing",
  "Paid Promotions",
  "Creator Services",
];

export const services: Service[] = [
  {
    id: "reels",
    name: "Instagram Reels and YouTube Shorts",
    category: "Social Media Content",
    emoji: "📱",
    description: "Short vertical videos made to hold attention and fit each platform.",
    audience: "Creators, brands, colleges",
    deliverables: ["Concept and hook ideas", "Editing with music and captions", "Platform-ready export"],
    gradient: "from-red-600/60 to-zinc-900",
  },
  {
    id: "social-packages",
    name: "Social Media Content Packages",
    category: "Social Media Content",
    emoji: "🗓️",
    description: "Regular content each month: promo reels, behind-the-scenes, podcast clips and more.",
    audience: "Businesses and personal brands",
    deliverables: ["Monthly content plan", "Set number of videos", "Captions and formats"],
    gradient: "from-rose-600/60 to-zinc-900",
  },
  {
    id: "restaurant-cafe",
    name: "Restaurant and Cafe Videos",
    category: "Commercial Videos",
    emoji: "☕",
    description: "Cinematic videos of your ambience, menu, food preparation and customer experience.",
    audience: "Restaurants, cafes, bakeries",
    deliverables: ["Planning and shoot", "Edited reels or film", "Music and captions"],
    gradient: "from-amber-600/60 to-zinc-900",
  },
  {
    id: "business-promo",
    name: "Business and Product Promotion",
    category: "Commercial Videos",
    emoji: "🏬",
    description: "Promo videos for gyms, salons, clothing stores, hotels, coaching institutes and startups.",
    audience: "Local businesses and startups",
    deliverables: ["Concept planning", "Filming and editing", "Delivery in platform formats"],
    gradient: "from-orange-600/60 to-zinc-900",
  },
  {
    id: "real-estate",
    name: "Brand Films and Property Showcase",
    category: "Commercial Videos",
    emoji: "🏢",
    description: "Brand films, corporate videos and property showcase videos.",
    audience: "Companies and real estate",
    deliverables: ["Script or outline", "Shoot and edit", "Final film and cutdowns"],
    gradient: "from-sky-600/60 to-zinc-900",
  },
  {
    id: "college-events",
    name: "College and Cultural Events",
    category: "Event Videography",
    emoji: "🎓",
    description: "Coverage of fests, freshers, farewells, competitions, concerts and sports events.",
    audience: "Colleges and organizers",
    deliverables: ["Event coverage", "Highlight film", "Short event reels"],
    gradient: "from-purple-600/60 to-zinc-900",
  },
  {
    id: "corporate-events",
    name: "Corporate and Private Events",
    category: "Event Videography",
    emoji: "🎤",
    description: "Conferences, seminars, launches, awards, workshops, birthdays and celebrations.",
    audience: "Companies and families",
    deliverables: ["Speaker and interview clips", "Highlight film", "Behind-the-scenes footage"],
    gradient: "from-fuchsia-600/60 to-zinc-900",
  },
  {
    id: "long-form",
    name: "YouTube and Long-Form Editing",
    category: "Video Editing",
    emoji: "🎬",
    description: "Editing for YouTube, podcasts, interviews, documentaries and corporate videos.",
    audience: "Creators and companies with their own footage",
    deliverables: ["Cuts and pacing", "Audio cleanup", "Titles and subtitles"],
    gradient: "from-red-700/60 to-zinc-900",
  },
  {
    id: "grading-motion",
    name: "Color, Motion Graphics and Sound",
    category: "Video Editing",
    emoji: "🎨",
    description: "Color grading, animated titles, sound design and green-screen work.",
    audience: "Any project that needs a premium finish",
    deliverables: ["Color correction and grading", "Motion graphics", "Sound design"],
    gradient: "from-indigo-600/60 to-zinc-900",
  },
  {
    id: "campaigns",
    name: "Paid Social Campaigns",
    category: "Paid Promotions",
    emoji: "📈",
    description: "Planning and running Instagram, Facebook and YouTube ads. Results are never guaranteed.",
    audience: "Businesses that want more reach or leads",
    deliverables: ["Campaign plan", "Ad creatives", "Performance reports"],
    gradient: "from-blue-600/60 to-zinc-900",
  },
  {
    id: "launch-local",
    name: "Product Launch and Local Awareness",
    category: "Paid Promotions",
    emoji: "🚀",
    description: "Campaigns for launches, local awareness and lead generation. Ad budget is paid by the client.",
    audience: "Launches and local businesses",
    deliverables: ["Creative production", "Audience setup", "Clear fee and ad budget split"],
    gradient: "from-cyan-600/60 to-zinc-900",
  },
  {
    id: "creator-edit",
    name: "Creator and Influencer Content",
    category: "Creator Services",
    emoji: "⭐",
    description: "Editing for creators, UGC-style product videos, sponsored content and repurposing.",
    audience: "Creators, influencers and brands",
    deliverables: ["Personal brand videos", "Sponsored content editing", "Monthly creator packages"],
    gradient: "from-pink-600/60 to-zinc-900",
  },
];