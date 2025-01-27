// import { uploadFileToS3 } from "@/core/lib/awsS3";
// import prisma from "@/core/lib/prisma";
// import { v4 as uuidv4 } from "uuid";
// import type { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(500).send("Error nos arquivos enviados");
//     }

//     const id = fields.id;
//     const file = files.file;

//     if (!id || !file) {
//       return res.status(400).send("Error nos arquivos enviados");
//     }

//     const filePath = file[0].filepath;
//     const buffer = fs.readFileSync(filePath);
//     const uuid = uuidv4();
//     const timestamp = Date.now();

//     const generateId = `${uuid}-${timestamp}`;

//     try {
//       const key = await uploadFileToS3(
//         buffer,
//         generateId,
//         file[0]?.mimetype as string
//       );

//       await prisma.store.update({
//         where: {
//           userId: id[0] as string,
//         },
//         data: {
//           img: key,
//         },
//       });

//       return res.status(200).send("Logo salva com sucesso");
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log(error.message);
//         return res.status(500).send("Error ao salvar logo");
//       }
//     }
//   });
// }
