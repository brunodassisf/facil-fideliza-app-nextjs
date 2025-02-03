import { SessionOptions } from "iron-session";

export interface SessionData {
  id?: string;
  createdAt?: Date;
  phone?: string;
  email?: string;
  role?: Role | undefined;
  name?: string;
  storeName?: string;
  storeId?: string;
}

export type SessionStore = {
  storeId: string;
  userId: string;
  phone: string;
  email: string;
  planStoreId: string;
  tag: string;
  name: string;
  amountLoyaltyByCard: number | null;
  reward: string | null;
  bgColor: string | null;
  textColor: string | null;
  cooldown: number | null;
  img: string | null;
  ready: boolean;
  amountClientsUse: number;
  amountClients: number;
  createdAt?: Date;
  role: Role;
};

type Role = "STORE" | "CLIENT" | "ADMIN";

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "ff-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
