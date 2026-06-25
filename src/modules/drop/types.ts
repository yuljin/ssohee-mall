export type DropStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "OPEN"
  | "CLOSED"
  | "ORDERING"
  | "FULFILLING"
  | "COMPLETED"
  | "CANCELLED";

export type ProductOption = {
  id: string;
  label: string;
  detail?: string;
  price: number;
  available: boolean;
};

export type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageTone: "ivory" | "green" | "charcoal";
  maxQuantity: number;
};

export type RewardTier = {
  threshold: number;
  title: string;
  description: string;
};

export type Drop = {
  id: string;
  slug: string;
  sequence: number;
  type: "WEEKLY_LOOK" | "SPECIAL";
  status: DropStatus;
  title: string;
  subtitle: string;
  description: string;
  opensAt: string;
  closesAt: string;
  shippingStartsAt: string;
  basePrice: number;
  compareAtPrice?: number;
  shippingPrice: number;
  freeShippingThreshold: number;
  paidQuantity: number;
  targetQuantity: number;
  model: {
    height: string;
    weight: string;
    wearing: string;
  };
  material: string;
  care: string;
  sizeOptions: ProductOption[];
  addOns: AddOn[];
  rewards: RewardTier[];
  palette: string[];
};
