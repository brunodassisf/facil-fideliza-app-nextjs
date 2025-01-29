"use server";

import { compare, encrypt } from "../lib/bcrypt";
import prisma from "../lib/prisma";
import { formatarStringToTag, getDateTimeInTimezone } from "../util";
import { getSession } from "./session";

export const credentialsStore = async (data: {
  phone: string;
  password: string;
}) => {
  try {
    const session = await getSession();
    const cleanPhone = data.phone?.replace(/\D/g, "") || "";

    const user = await prisma.user.findFirst({
      where: {
        phone: cleanPhone,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorretos");
    }

    const isValidPassword = await compare(data.password, user.hash);

    if (!user || !isValidPassword) {
      throw new Error("Usuário ou senha incorretos");
    }

    session.id = user.id;
    session.phone = user.phone;
    session.email = user.email;
    session.role = "STORE";

    await session.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const registerStore = async ({
  email,
  name,
  phone,
  password,
}: {
  phone: string;
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const session = await getSession();

    const result = await prisma.$transaction(async (conn) => {
      const formatPhone = phone.replace(/[ ()-]/g, "");
      const createTag = formatarStringToTag(name);

      const existPhoneOrEmail = await conn.user.findMany({
        where: { OR: [{ phone: phone }, { email }] },
      });

      if (existPhoneOrEmail.length > 0) {
        throw new Error("Usuário já cadastrado");
      }

      const existStore = await conn.store.findFirst({
        where: {
          tag: {
            equals: createTag,
          },
        },
      });

      if (existStore) {
        throw new Error("Loja já cadastrada");
      }

      const store = await conn.store.findFirst({
        where: {
          tag: {
            equals: createTag,
          },
        },
      });

      const generateHash = await encrypt(password);

      const freePlan = await conn.plan.findFirst({
        where: { title: "Bronze" },
      });

      if (!freePlan) {
        throw new Error("Plano Bronze não encontrado");
      }

      const generatePlanStore = await conn.planStore.create({
        data: {
          planId: freePlan.id,
          storeId: store?.id as string,
        },
      });

      const createdAt = await getDateTimeInTimezone();

      const data = {
        name,
        tag: createTag,
        planStoreId: generatePlanStore.id,
      };

      const newUser = await conn.user.create({
        data: {
          email,
          phone: formatPhone,
          hash: generateHash,
          role: "STORE",
          createdAt,
          Store: { create: { ...data } },
        },
        include: {
          Store: true,
        },
      });

      session.id = newUser.id;
      session.phone = newUser.phone;
      session.email = newUser.email;
      session.role = "STORE";

      await session.save();

      return { message: "Loja cadastrada com sucesso" };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
