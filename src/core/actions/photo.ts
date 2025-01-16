"use server";

import { revalidatePath } from "next/cache";
import { deleteFileToS3 } from "../lib/awsS3";
import prisma from "../lib/prisma";

export const deleteImgStore = async ({
  userId,
  img,
}: {
  userId: string;
  img: string;
}) => {
  try {
    await deleteFileToS3(img);
    await prisma.store.update({
      where: {
        userId,
      },
      data: {
        img: null,
      },
    });

    revalidatePath("/loja");

    return { message: "Imagem deletada com sucesso" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const saveImgStore = async (id: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file as File);

    await fetch(`${process.env.NEXT_PUBLIC_URL_APP}/api/upload`, {
      method: "POST",
      body: formData,
    });

    revalidatePath("/loja");

    return { message: "Imagem salva com sucesso" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
