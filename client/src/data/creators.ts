export type Creator = {
  id: number;
  name: string;
  role: string;
  emoji: string;
  followers: string;
  niche: string;
  gradient: string;
};

export const creators: Creator[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Tech Reviewer",
    emoji: "💻",
    followers: "1.2M",
    niche: "Tech",
    gradient: "linear-gradient(135deg, #ff3d2e, #7a1a12)",
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Lifestyle Vlogger",
    emoji: "✨",
    followers: "860K",
    niche: "Lifestyle",
    gradient: "linear-gradient(135deg, #ff8a3d, #6b2d0a)",
  },
  {
    id: 3,
    name: "Kabir Singh",
    role: "Gaming Streamer",
    emoji: "🎮",
    followers: "2.1M",
    niche: "Gaming",
    gradient: "linear-gradient(135deg, #7c3dff, #2a1066)",
  },
  {
    id: 4,
    name: "Ananya Rao",
    role: "Fitness Coach",
    emoji: "💪",
    followers: "540K",
    niche: "Fitness",
    gradient: "linear-gradient(135deg, #2ecc71, #0f5a30)",
  },
  {
    id: 5,
    name: "Dev Malhotra",
    role: "Travel Creator",
    emoji: "✈️",
    followers: "970K",
    niche: "Travel",
    gradient: "linear-gradient(135deg, #3d9bff, #123a6b)",
  },
  {
    id: 6,
    name: "Simran Kaur",
    role: "Food Creator",
    emoji: "🍜",
    followers: "1.5M",
    niche: "Food",
    gradient: "linear-gradient(135deg, #ffcc3d, #6b4d0a)",
  },
];
