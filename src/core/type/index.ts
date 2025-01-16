import { Client, Loyalty, LoyaltyCard, LoyaltyProducts } from "@prisma/client";

export const COOKIE_ACCESS_USER = "userData";
export const COOKIE_ACCESS_STORE = "storeAccess";
export const COOKIE_ACCESS_CLIENT = "clientAccess";
export const COOKIE_TAG = "tagData";
export const COOKIE_LOYALTY_CARD = "loyaltyCard";

export type UserInfo = {
  role: string;
  sub: string;
  createdAt: string;
  phone: string;
  email: string;
  access_token: string;
};

export type Store = {
  name: string;
  tag: string;
  amountLoyaltyByCard: number;
  cooldown: number;
  bgColor: string;
  img: string | null;
  reward: string;
  ready: boolean;
  textColor: string;
  PlanStore: PlanStore;
};

type Plan = {
  id: string;
  title: string;
  amountClients: number;
  isCustom: boolean;
};

type PlanStore = {
  amountClientsUse: number | null;
  amountProductUse: number | null;
  Plan: Plan;
};

export type ClientInfo = {
  Client: Client | null;
} & UserInfo;

export type StoreInfo = {
  Store: Store;
} & UserInfo;

export type StoreLoaderData = {
  data: Store;
};

export type IOpions<T = unknown> = {
  label: string;
  value: string;
  data?: T;
};

export type Product = {
  name: string;
  id: string;
  description: string | null;
  price: number;
};

type HistotyLoyaltyProducts = {
  product: Product;
} & LoyaltyProducts;

export type HistoryLoyalty = {
  LoyaltyProducts: HistotyLoyaltyProducts[];
} & Loyalty;

export type HistoryData =
  | (LoyaltyCard & { loyaltys: HistoryLoyalty[] | null })
  | undefined;
