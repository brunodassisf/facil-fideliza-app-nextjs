"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { ClientInfo } from "../type";
import { formatPhoneString, getDateTimeInTimezone } from "../util";
import { logoutSession } from "./session";

export type SearchInfo = (ClientInfo & { rewardReady: boolean }) | undefined;

export const searchClient = async (storeId: string, phone: string) => {
  try {
    const result = await prisma.$transaction(async (conn) => {
      const formatPhone = formatPhoneString(phone);

      const findClient = await conn.user.findFirst({
        where: {
          phone: {
            equals: formatPhone,
          },
          role: "CLIENT",
        },
        include: {
          Client: {
            select: {
              userId: false,
              id: true,
              name: true,
              tag: true,
              birthday: true,
              LoyaltyCard: {
                where: {
                  active: true,
                },
                select: {
                  nextLoyalty: true,
                  active: true,
                  amount: true,
                },
              },
            },
          },
        },
      });

      if (!findClient) {
        throw new Error(
          "Usuário não encontrado, favor verificar o telefone se esta correto"
        );
      }

      const createdAt = await getDateTimeInTimezone();

      const store = await conn.store.findFirst({
        where: {
          id: storeId,
        },
      });

      if (!findClient.Client || !store) {
        throw new Error(
          "Usuário não encontrado, favor verificar o telefone se esta correto"
        );
      }

      if (store?.tag !== findClient?.Client.tag) {
        throw new Error(
          "Usuário não encontrado ou não está cadastrado na sua loja"
        );
      }

      if (
        findClient.Client.LoyaltyCard[0].nextLoyalty &&
        store?.cooldown > 0 &&
        findClient.Client.LoyaltyCard[0].nextLoyalty >= createdAt
      ) {
        throw new Error(
          `Aguarde ${store.cooldown} hora(s) para poder fidelizar esse cliente novamente`
        );
      }

      if (
        findClient.Client.LoyaltyCard[0].amount === store.amountLoyaltyByCard
      ) {
        return { ...findClient, rewardReady: true };
      }

      return { ...findClient, rewardReady: false };
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteAccount = async (id: string) => {
  try {
    const result = await prisma.$transaction(async (conn) => {
      const findUser = await conn.user.findFirst({
        where: {
          id,
        },
        include: {
          Client: true,
          Store: true,
        },
      });

      if (findUser?.Client) {
        await conn.planStore.update({
          where: {
            storeId: findUser.Client.storeId as string,
          },
          data: {
            amountClientsUse: {
              decrement: 1,
            },
          },
        });
      }

      if (findUser?.Store) {
        await conn.user.deleteMany({ where: { StoreId: findUser.Store?.id } });
      }

      await logoutSession();
      return { message: "Conta deletada com sucesso" };
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao deletar conta:", error.message);
      throw new Error("Ocorreu um erro ao deletar conta.");
    }
  }
};

export const reloadPage = async (tag: string) => {
  revalidatePath(`/${tag}/meu-cartao`, "page");
};
