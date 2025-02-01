"use client";

import { logoutSession } from "@/core/actions/session";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

type SidebarProps = {
  type: "store" | "client";
  tag?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ type, tag }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const options: {
    store: Array<{ name: string; link: string; color?: string }>;
    client: Array<{ name: string; link: string; color?: string }>;
  } = {
    store: [
      {
        name: "Início",
        link: "/loja",
      },
      {
        name: "Personalizar",
        link: "/loja/personalizar",
      },
      {
        name: "Cadastrar produto",
        link: "/loja/cadastrar-produto",
      },
      {
        name: "Meus produtos",
        link: "/loja/produtos",
      },
      {
        name: "Fidelizar participante",
        link: "/loja/fidelizar",
      },
      {
        name: "Deletar conta",
        link: "/loja/deletar-conta",
        color: "text-red-500",
      },
      // {
      //   name: "Meus dados",
      //   link: "/loja/meus-dados",
      // },
      {
        name: "Sair",
        link: "",
      },
    ],
    client: [
      {
        name: "Meu cartão",
        link: `/${tag || ""}/meu-cartao`,
      },
      {
        name: "Ultimas fidelizações",
        link: `/${tag || ""}/meu-cartao/historico`,
      },
      {
        name: "Deletar conta",
        link: `/${tag || ""}/meu-cartao/deletar-conta`,
        color: "text-red-500",
      },
      {
        name: "Sair",
        link: "",
      },
    ],
  };

  const handleStateOpen = () => {
    setOpen(!open);
  };

  const redirectLink = async (link: string) => {
    if (link) {
      router.push(link);
      handleStateOpen();
    } else {
      await logoutSession().then(() => {
        if (tag) {
          router.push(`/${tag}`);
          return;
        }
        router.push("/");
      });
    }
  };

  return (
    <>
      <FaBars size={24} onClick={handleStateOpen} className="cursor-pointer" />
      <Drawer
        open={open}
        anchor="right"
        onClose={handleStateOpen}
        aria-hidden={false}
      >
        <div className="w-full flex justify-end pt-10 px-4 border-b-2 border-gray-100 pb-5">
          <FaXmark size={24} onClick={handleStateOpen} />
        </div>
        <List className="w-64">
          {options[type].map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => redirectLink(item.link)}>
                <ListItemText
                  primary={item.name}
                  className={`text-end ${item?.color || ""}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
