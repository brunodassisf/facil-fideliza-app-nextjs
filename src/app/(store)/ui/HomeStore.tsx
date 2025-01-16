"use client";

import { DeletePhoto, Photo, ShareLink } from "@/presentation/components";
import { useResourceStore } from "@/core/context/WrapperStore";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  FaCartFlatbed,
  FaCheck,
  FaGift,
  FaShareNodes,
  FaShop,
  FaWhatsapp,
} from "react-icons/fa6";

const tips = [
  {
    title: "1. Cadastre um produto",
    icon: <FaCartFlatbed size={32} />,
  },
  {
    title: "2. Customize sua loja",
    icon: <FaShop size={32} />,
  },
  {
    title: "3. Compartilhe o link para seus clientes fidelizazem",
    icon: <FaShareNodes size={32} />,
  },
  {
    title: "4. A cada compra do cliente, marque uma fidelização",
    icon: <FaCheck size={32} />,
  },
  {
    title:
      "5. Quando o cliente completa seu cartão, você poderá entregar a recompensa e outro cartão será gerado para ele",
    icon: <FaGift size={32} />,
  },
];

export default function HomeStore() {
  const { store } = useResourceStore();

  return (
    <div className="mt-2 text-stone-600">
      <div className="w-full">
        {store?.img !== null ? (
          <DeletePhoto>
            <div
              className="w-[200px] h-[200px] rounded-full overflow-hidden"
              style={{ backgroundColor: store?.textColor || "#000000" }}
            >
              <Image
                width={100}
                height={100}
                src={process.env.NEXT_PUBLIC_URL_BASE_IMAGE! + store?.img}
                alt="logo"
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
          </DeletePhoto>
        ) : (
          <Photo />
        )}
      </div>
      <div className=" mt-5">
        <p>Em caso de dúvida, entre em contato conosco.</p>
        <Link
          target="_blank"
          href="https://wa.me/5521982947600?text=Ol%C3%A1,%20gostaria%20de%20ajuda%20para%20configurar%20meu%20cart%C3%A3o%20de%20fidelidade!"
        >
          <div className="flex items-center gap-2 my-2">
            <FaWhatsapp size={22} />
            <strong>Falar com o atendente</strong>
          </div>
        </Link>
        <ul className="list-disc pl-5 text-sm">
          <li>Dúvidas sobre como usar.</li>
          <li>Treinamentos para usar a ferramenta.</li>
        </ul>
      </div>
      <div>
        <ShareLink />
        <div className="mt-5">
          <Typography variant="h5">Dicas iniciais</Typography>
        </div>
        <div className="mt-2 flex flex-wrap gap-4">
          {tips.map((item) => (
            <div
              key={item.title}
              className="p-3 w-full lg:w-72 rounded flex flex-col gap-y-3 justify-center items-center"
              style={{
                border: `1px solid ${store?.bgColor}`,
                color: store?.bgColor || "#000000",
              }}
            >
              {item.icon}
              <Typography variant="body2" className="text-center">
                {item.title}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
