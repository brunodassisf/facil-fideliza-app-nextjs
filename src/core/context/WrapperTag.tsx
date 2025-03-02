"use client";

import { StyleTag } from "@/presentation/components";
import { createContext, useContext, useEffect, useState } from "react";

type WrapperStoreProps = {
  children: React.ReactNode;
  data: WrapperTagContext;
};

type WrapperTagContext = {
  tag: string;
  name: string;
  amountLoyaltyByCard: number | null;
  bgColor: string | null;
  textColor: string | null;
  cooldown: number | null;
  img: string | null;
};

interface WrapperTagContextProps {
  tag: WrapperTagContext | null;
}

const WrapperTagCtx = createContext<WrapperTagContextProps | null>(null);

const WrapperTag: React.FC<WrapperStoreProps> = ({ children, data }) => {
  const [tag, setData] = useState<WrapperTagContext | null>(data || null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(data);
    }
  }, [data]);

  return (
    <WrapperTagCtx.Provider value={{ tag }}>
      <StyleTag bgColor={tag?.bgColor || ""} textColor={tag?.textColor || ""} />
      {children}
    </WrapperTagCtx.Provider>
  );
};

export const useTag = () => {
  const context = useContext(WrapperTagCtx);
  if (!context) {
    throw new Error("Erro ao carregar useTag");
  }
  return context;
};

export default WrapperTag;
