type Product = {
  description: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
};

export type LoyaltyProducts = {
  id: string;
  amount: number;
  loyaltyId: string;
  product: Product;
};

export type Loyalty = {
  LoyaltyProducts: LoyaltyProducts[];
  createdAt: string;
  id: string;
  loyaltyCardId: string;
};

export type LoyaltyCard = {
  active: boolean;
  clientId: string;
  createdAt: string;
  nextLoyalty: string;
  reward: string;
  id: string;
  amount: number;
  loyaltys: Loyalty[];
};
