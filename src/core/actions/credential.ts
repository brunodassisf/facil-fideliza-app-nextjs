"use server";

import { compare, encrypt } from "../lib/bcrypt";
import prisma from "../lib/prisma";
import {
  formatarStringToTag,
  formatPhoneString,
  getDateTimeInTimezone,
} from "../util";
import { getSession } from "./session";

export const credentials = async (data: {
  phone: string;
  password: string;
  role?: string;
}) => {
  try {
    const session = await getSession();
    const cleanPhone = data.phone?.replace(/\D/g, "") || "";

    const user = await prisma.user.findFirst({
      where: {
        phone: cleanPhone,
      },
      include: {
        Store: true,
        Client: {
          include: {
            Store: {
              select: {
                name: true,
              },
            },
          },
        },
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
    session.role = user.role;

    if (user.Client !== null) {
      const { Client } = user;
      session.name = Client?.name;
      session.storeName = Client?.Store?.name;
    }

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
        where: { OR: [{ phone: formatPhone }, { email }] },
      });

      if (existPhoneOrEmail.length > 0) {
        throw new Error("Usuário já cadastrado");
      }

      const store = await conn.store.findFirst({
        where: {
          tag: {
            equals: createTag,
          },
        },
      });

      if (store) {
        throw new Error("Loja já cadastrada");
      }

      const generateHash = await encrypt(password);

      const freePlan = await conn.plan.findFirst({
        where: { title: "Bronze" },
      });

      if (!freePlan) {
        throw new Error("Plano Bronze não encontrado");
      }

      const createdAt = await getDateTimeInTimezone();

      const data = {
        name,
        tag: createTag,
      };

      const newUser = await conn.user.create({
        data: {
          email,
          phone: formatPhone,
          hash: generateHash,
          role: "STORE",
          createdAt,
          Store: {
            create: { ...data, PlanStore: { create: { planId: freePlan.id } } },
          },
        },
        include: {
          Store: {
            include: {
              PlanStore: true,
            },
          },
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

export const registerClient = async ({
  tag,
  email,
  name,
  phone,
  password,
}: {
  tag: string;
  phone: string;
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const session = await getSession();

    const result = await prisma.$transaction(async (conn) => {
      const phoneFormat = formatPhoneString(phone);

      const existPhoneOrEmail = await conn.user.findMany({
        where: { OR: [{ phone: phoneFormat }, { email }] },
      });

      if (existPhoneOrEmail.length > 0) {
        throw new Error("E-mail/telefone já existem");
      }

      const store = await conn.store.findFirst({
        where: {
          tag: {
            equals: tag,
          },
        },
        include: {
          PlanStore: {
            select: {
              id: false,
              planId: false,
              Plan: true,
              amountClientsUse: true,
              Store: false,
            },
          },
        },
      });

      if (!store) {
        throw new Error(
          "Essa loja não esta cadastrada, não e possível cadastrar um cliente "
        );
      }

      const generateHash = await encrypt(password);

      const data = {
        name,
        tag: store.tag,
        storeId: store.id,
      };

      const createdAt = await getDateTimeInTimezone();

      const newUser = await conn.user.create({
        data: {
          email,
          phone: phoneFormat,
          hash: generateHash,
          role: "CLIENT",
          createdAt,
          StoreId: store.id,
          Client: { create: { ...data } },
        },
        include: {
          Client: true,
        },
      });

      await conn.loyaltyCard.create({
        data: {
          clientId: newUser?.Client?.id,
          createdAt,
        },
      });

      await conn.planStore.update({
        where: {
          storeId: store.id,
        },
        data: {
          amountClientsUse: {
            increment: 1,
          },
        },
      });

      session.id = newUser.id;
      session.phone = newUser.phone;
      session.email = newUser.email;
      session.role = newUser.role;

      await session.save();

      return { message: "Usuário cadastrado com sucesso" };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// const getIncludesByRole = (role: string) => {
//   switch (role) {
//     case "Client":
//       return {
//         Client: {
//           select: {
//             id: true,
//             User: false,
//             userId: false,
//             name: true,
//             tag: true,
//             birthday: true,
//           },
//         },
//       };
//     default:
//       return {
//         Store: {
//           select: {
//             id: false,
//             User: false,
//             userId: false,
//             name: true,
//             tag: true,
//             amountLoyaltyByCard: true,
//             cooldown: true,
//             reward: true,
//             ready: true,
//             bgColor: true,
//             textColor: true,
//             img: true,
//             PlanStore: {
//               select: {
//                 id: false,
//                 planId: false,
//                 Store: false,
//                 Plan: true,
//                 amountClientsUse: true,
//               },
//             },
//           },
//         },
//       };
//   }
// };
