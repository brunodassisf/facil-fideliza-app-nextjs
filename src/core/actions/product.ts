"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

type IResponse<T = undefined> = {
  ok: boolean;
  message?: string;
  data?: T;
};

export type Product = {
  storeId: string | null;
  name: string;
  description: string | null;
  price: string | number;
};

type UpdateProductDto = { id: string } & Product;
export type ListProductDto = { id: string } & Product;

export const createProduct = async ({
  storeId,
  name,
  description,
  price,
}: Product): Promise<IResponse | undefined> => {
  try {
    const result = await prisma.$transaction(async (conn) => {
      const hasSameProduct = await conn.product.findFirst({
        where: {
          name: {
            equals: name,
          },
          storeId: storeId,
        },
      });

      if (hasSameProduct) {
        return {
          ok: false,
          message: "Você já tem um produto cadastrado com esse nome",
        };
      }
      const formatPrice = parseInt(
        price.toString().replace(/\D/g, "") || "",
        10
      );

      await conn.product.create({
        data: { name, description, price: formatPrice, storeId },
      });

      revalidatePath("/loja");
      return {
        ok: true,
        message: "Produto cadastrado com sucesso",
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

export const updateProduct = async (
  product: UpdateProductDto
): Promise<IResponse | undefined> => {
  try {
    const { id, name, description, price } = product;

    const formatPrice = parseInt(price.toString().replace(/\D/g, "") || "", 10);

    await prisma.product.update({
      where: { id },
      data: { name, description, price: formatPrice },
    });

    revalidatePath("/loja/produtos");
    return {
      ok: true,
      message: "Produto editado com sucesso",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
};

export const deleteProduct = async (
  id: string
): Promise<IResponse | undefined> => {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/loja");
    return {
      ok: true,
      message: "Produto removido com sucesso",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
};

export const getProducts = async (
  id: string
): Promise<ListProductDto[] | null> => {
  const products = await prisma.product.findMany({
    where: {
      Store: {
        userId: id,
      },
    },
  });

  return products;
};
