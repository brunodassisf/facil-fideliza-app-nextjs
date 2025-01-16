import { uploadFileToS3 } from "@/core/lib/awsS3";
import prisma from "@/core/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const file = formData.get("file") as File;

    if (!id || !file) {
      return new Response("Missing id or file", {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uuid = uuidv4();
    const timestamp = Date.now();
    const generateId = `${uuid}-${timestamp}`;
    await uploadFileToS3(buffer, generateId, file?.type).then(async (key) => {
      await prisma.store.update({
        where: {
          userId: id as string,
        },
        data: {
          img: key,
        },
      });
    });

    return new Response("Logo salva com sucesso", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}
