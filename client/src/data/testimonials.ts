export type Testimonial = {
  id: number;
  name: string;
  role: string;
  emoji: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Tech Reviewer",
    emoji: "💻",
    quote:
      "WEEEDITS cut my edit time in half. My videos look sharper and my views keep growing.",
    rating: 5,
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Lifestyle Vlogger",
    emoji: "✨",
    quote:
      "The team understands my style. Every delivery feels premium and arrives on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Kabir Singh",
    role: "Gaming Streamer",
    emoji: "🎮",
    quote:
      "The paid promotion boosted my channel fast. Best decision I made this year.",
    rating: 5,
  },
];