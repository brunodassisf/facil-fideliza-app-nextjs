"use server";

import { ProductLoaylty } from "@/app/(store)/ui/Loyalty";
import prisma from "../lib/prisma";
import { getDateTimeInTimezone } from "../util";
import { getSession } from "./session";
import { Loyalty, LoyaltyCard, LoyaltyProducts, Product } from "@prisma/client";

type IResponse<T = undefined> = {
  ok: boolean;
  message?: string;
  data?: T;
};

export type ListProduct = {
  product: Product;
} & LoyaltyProducts;

type LoyaltysProducts = {
  LoyaltyProducts: ListProduct[];
} & Loyalty;

export type UserCard = {
  loyaltys: LoyaltysProducts[];
} & LoyaltyCard;

export const getLoyaltyCard = async (
  id: string
): Promise<IResponse<UserCard> | undefined> => {
  try {
    const card = await prisma.loyaltyCard.findFirst({
      where: {
        Client: {
          userId: id,
        },
        active: true,
      },
      include: {
        loyaltys: {
          include: {
            LoyaltyProducts: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return { ok: true, data: card || undefined };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
  }
};

export const historyLoyaltyCards = async (): Promise<
  IResponse<UserCard[]> | undefined
> => {
  try {
    const session = await getSession();
    const card = await prisma.loyaltyCard.findMany({
      where: {
        Client: {
          userId: session.id,
        },
        active: false,
      },
      include: {
        loyaltys: {
          include: {
            LoyaltyProducts: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return { ok: true, data: card };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
  }
};

export const updateLoyaltyCard = async ({
  id,
  clientId,
  reward,
}: {
  id: string;
  clientId: string;
  reward: string;
}): Promise<IResponse | undefined> => {
  try {
    const result = await prisma.$transaction(async (conn) => {
      const store = await conn.store.findFirst({
        where: {
          id,
        },
      });

      if (!store) {
        return { ok: false, message: "Loja não encontrada" };
      }

      const card = await conn.loyaltyCard.findFirst({
        where: {
          clientId,
          active: true,
        },
      });

      if (!card) {
        return {
          ok: false,
          message: "Cartão de fidelização ativo não encontrado",
        };
      }

      const createdAt = await getDateTimeInTimezone();

      await conn.loyaltyCard.update({
        where: {
          id: card.id,
        },
        data: {
          active: false,
          reward,
          nextLoyalty: createdAt,
        },
      });

      await conn.loyaltyCard.create({
        data: { clientId, createdAt },
      });

      return {
        ok: true,
        message: "Recompensa entregue ao cliente com sucesso",
      };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
};

export type NewLoyalty = {
  storeId: string;
  clientId: string;
  products: ProductLoaylty[];
};

export const createLoyalty = async (
  newLoyalty: NewLoyalty
): Promise<IResponse | undefined> => {
  try {
    const result = await prisma.$transaction(async (conn) => {
      const loyaltyCard = await conn.loyaltyCard.findFirst({
        where: {
          clientId: newLoyalty.clientId,
          active: true,
        },
      });

      const store = await conn.store.findFirst({
        where: {
          id: newLoyalty.storeId,
        },
      });

      if (!store) {
        return {
          ok: false,
          message: "Loja nao encontrada",
        };
      }

      const createdAt = await getDateTimeInTimezone();

      const loaylty = await conn.loyalty.create({
        data: { loyaltyCardId: loyaltyCard?.id, createdAt },
      });

      const products = createLoyaltyProductsList(
        newLoyalty.products,
        loaylty.id
      );

      await prisma.loyaltyProducts.createMany({
        data: products,
      });

      //const nextLoyalty = await getDateTimeInTimezone(store.cooldown);
      const data = new Date();

      const nextLoyalty = new Date(
        data.setHours(data.getHours() + store.cooldown)
      );

      await conn.loyaltyCard.update({
        where: {
          id: loyaltyCard?.id,
        },
        data: {
          amount: {
            increment: 1,
          },
          nextLoyalty,
        },
      });

      return {
        ok: true,
        message: "Fidelização feita com sucesso",
      };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
};

const createLoyaltyProductsList = (
  products: ProductLoaylty[],
  loyaltyId: string
) => {
  const loyaltyProducts = [];

  for (let i = 0; i < products.length; i++) {
    loyaltyProducts.push({
      amount: products[i].amount,
      productId: products[i].id,
      loyaltyId,
    });
  }

  return loyaltyProducts;
};
