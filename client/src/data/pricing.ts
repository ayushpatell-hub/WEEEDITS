export type Plan = {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
};

export const plans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    price: "₹4,999",
    period: "per month",
    description: "For new creators who want clean, quick edits.",
    features: [
      "4 short videos / month",
      "Basic color and sound",
      "2 revisions per video",
      "48 hour delivery",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Growth",
    price: "₹12,999",
    period: "per month",
    description: "For creators who post often and want to grow fast.",
    features: [
      "12 videos / month",
      "Motion graphics and captions",
      "Unlimited revisions",
      "24 hour delivery",
      "Basic paid promotion",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Pro",
    price: "₹29,999",
    period: "per month",
    description: "For brands and big channels with full needs.",
    features: [
      "30 videos / month",
      "Cinematic edits and VFX",
      "Dedicated editor",
      "Priority delivery",
      "Full paid promotion",
      "Monthly analytics report",
    ],
    popular: false,
  },
];