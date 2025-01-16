"use server";

import { ProductLoaylty } from "@/app/(store)/ui/Loyalty";
import prisma from "../lib/prisma";
import { getDateTimeInTimezone } from "../util";
import { getSession } from "./session";

export const getLoyaltyCard = async (id: string) => {
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

    return card;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar cartão de fidelização:", error.message);
      throw new Error(error.message);
    }
  }
};

export const historyLoyaltyCards = async () => {
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

    return card;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar cartões de fidelização:", error.message);
      throw new Error(error.message);
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
}) => {
  try {
    const result = await prisma.$transaction(async (conn) => {
      const store = await conn.store.findFirst({
        where: {
          id,
        },
      });

      if (!store) {
        throw new Error("Loja não encontrada.");
      }

      const card = await conn.loyaltyCard.findFirst({
        where: {
          clientId,
          active: true,
        },
      });

      if (!card) {
        throw new Error("Cartão de fidelização ativo não encontrado.");
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

      return { message: "Recompensa entregue ao cliente com sucesso" };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar a fidelização:", error.message);
      throw new Error(error.message);
    }
  }
};

export type NewLoyalty = {
  storeId: string;
  clientId: string;
  products: ProductLoaylty[];
};

export const createLoyalty = async (newLoyalty: NewLoyalty) => {
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
        throw new Error("Loja nao encontrada.");
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

      return { message: "Fidelização feita com sucesso" };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao cadastrar a fidelização:", error.message);
      throw new Error(error.message);
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
