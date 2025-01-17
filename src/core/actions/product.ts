"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

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
}: Product) => {
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
        throw new Error("Você já tem um produto cadastrado com esse nome");
      }
      const formatPrice = parseInt(
        price.toString().replace(/\D/g, "") || "",
        10
      );

      await conn.product.create({
        data: { name, description, price: formatPrice, storeId },
      });

      revalidatePath("/loja");
      return { message: "Produto cadastrado com sucesso" };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar produto:", error.message);
      throw new Error(error.message);
    }
  }
};

export const updateProduct = async (product: UpdateProductDto) => {
  try {
    const { id, name, description, price } = product;

    const formatPrice = parseInt(price.toString().replace(/\D/g, "") || "", 10);

    await prisma.product.update({
      where: { id },
      data: { name, description, price: formatPrice },
    });

    revalidatePath("/loja/produtos");
    return {
      message: "Produto editado com sucesso",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar produto:", error.message);
      throw new Error("Ocorreu um erro ao atualizar o produto.");
    }
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/loja");
    return {
      message: "Produto removido com sucesso",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao remover produto:", error.message);
      throw new Error("Ocorreu um erro ao remover o produto.");
    }
  }
};

export const getProducts = async (
  id: string
): Promise<ListProductDto[] | null> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        Store: {
          userId: id,
        },
      },
    });

    return products;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao obter produtos:", error.message);
      throw new Error("Ocorreu um erro ao obter os produtos.");
    }
    throw error;
  }
};
