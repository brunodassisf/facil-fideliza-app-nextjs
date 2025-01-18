"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { getSession } from "./session";

type StoreUpdate = {
  amountLoyaltyByCard: number;
  cooldown: number;
  reward: string;
  bgColor: string;
  textColor: string;
};

export async function getStore() {
  const session = await getSession();

  const store = await prisma.store.findFirst({
    where: {
      userId: session.id,
    },
    include: {
      PlanStore: {
        include: {
          Plan: true,
        },
      },
      Products: true,
    },
  });

  if (!store) {
    throw new Error("Loja não encontrada");
  }

  return store;
}

export async function getStoreByTag(tag: string) {
  const store = await prisma.store.findFirst({
    where: {
      tag: {
        equals: tag,
      },
    },
    include: {
      PlanStore: {
        include: {
          Plan: true,
        },
      },
      Products: true,
    },
  });

  if (!store) {
    throw new Error("Loja não encontrada");
  }

  return store;
}

export async function updateStore(id: string, obj: StoreUpdate) {
  try {
    await prisma.store.update({
      where: {
        id,
      },
      data: {
        ready: true,
        ...obj,
      },
    });

    revalidatePath("/loja");
    return {
      message: "Loja atualizada com sucesso",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao atulizar loja:", error.message);
      throw new Error("Ocorreu um erro ao atulizar loja.");
    }
  }
}
