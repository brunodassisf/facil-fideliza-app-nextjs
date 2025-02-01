"use client";

import { StyleTag } from "@/presentation/components";
import { Product } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

type WrapperStoreProps = {
  data: WrapperStoreContext;
  children: React.ReactNode;
};

type WrapperStoreContext = {
  id?: string;
  userId?: string;
  planStoreId?: string;
  tag?: string;
  name?: string;
  amountLoyaltyByCard?: number | null;
  reward?: string | null;
  bgColor?: string | null;
  textColor?: string | null;
  img?: string | null;
  ready?: boolean;
  PlanStore?: {
    id?: string;
    planId?: string;
    amountClientsUse?: number;
    updateAt?: string | Date;
    Plan?:
      | {
          id?: string;
          title?: string;
          amountClients?: number;
          isCustom?: boolean | null;
        }
      | undefined;
  } | null;
  Products: Product[] | null;
} | null;

interface WrapperStoreContextProps {
  store: WrapperStoreContext;
  setData: React.Dispatch<React.SetStateAction<WrapperStoreContext>>;
}

const WrapperStoreCtx = createContext<WrapperStoreContextProps | undefined>(
  undefined
);

const WrapperStore: React.FC<WrapperStoreProps> = ({ children, data }) => {
  const [store, setData] = useState<WrapperStoreContext | null>(data || null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(data);
    }
  }, [data]);

  return (
    <WrapperStoreCtx.Provider value={{ store, setData }}>
      <StyleTag
        bgColor={store?.bgColor || ""}
        textColor={store?.textColor || ""}
      />
      <div className="flex flex-col px-4 h-full">{children}</div>
    </WrapperStoreCtx.Provider>
  );
};

export const useResourceStore = () => {
  const context = useContext(WrapperStoreCtx);
  if (!context) {
    throw new Error("Erro ao carregar useStore");
  }
  return context;
};

export default WrapperStore;
