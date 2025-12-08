export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: PricingFeature[];
  isPopular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 14.99,
    features: [
      { name: "Free Setup", included: true },
      { name: "Bandwidth Limit 10 GB", included: true },
      { name: "20 User Connection", included: true },
      { name: "Analytics Report", included: false },
      { name: "Public API Access", included: false },
      { name: "Plugins Integration", included: false },
      { name: "Custom Content Management", included: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 49.99,
    features: [
      { name: "Free Setup", included: true },
      { name: "Bandwidth Limit 10 GB", included: true },
      { name: "20 User Connection", included: true },
      { name: "Analytics Report", included: false },
      { name: "Public API Access", included: false },
      { name: "Plugins Integration", included: false },
      { name: "Custom Content Management", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 89.99,
    features: [
      { name: "Free Setup", included: true },
      { name: "Bandwidth Limit 10 GB", included: true },
      { name: "20 User Connection", included: true },
      { name: "Analytics Report", included: true },
      { name: "Public API Access", included: true },
      { name: "Plugins Integration", included: true },
      { name: "Custom Content Management", included: true },
    ],
    isPopular: true,
  },
];

