"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { getSession } from "./session";

type StoreUpdate = {
  amountLoyaltyByCard: number;
  bgColor: string;
  textColor: string;
};

export const getStore = async () => {
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

  return store;
};

export const getStoreNotifications = async () => {
  const session = await getSession();

  const notification = await prisma.notification.findMany({
    where: {
      storeId: session.storeId,
    },
  });

  return notification;
};

export const updateNotification = async (id: string) => {
  await prisma.notification.update({
    where: {
      id,
    },
    data: {
      view: false,
    },
  });
  revalidatePath("/loja");
};

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
      ok: true,
      message: "Loja atualizada com sucesso",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
}
