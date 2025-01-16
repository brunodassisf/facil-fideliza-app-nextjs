"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useResourceStore } from "../../core/context/WrapperStore";

const ShareLink: React.FC = () => {
  const { store } = useResourceStore();
  const [urlStore, setUrlStore] = useState<string | null>(null);
  const [copied, setCopied] = useState<string>("copy");

  useEffect(() => {
    if (store?.ready) {
      const url = `${process.env.NEXT_PUBLIC_URL_APP}${store.tag}`;
      setUrlStore(url);
    }
  }, [store]);

  return (
    <>
      {store?.ready && (
        <div
          className="mb-4 drop-shadow border text-center py-3 px-2 mt-4 mx-2 cursor-pointer"
          onClick={async () => {
            await navigator.clipboard.writeText(urlStore as string);
            setCopied("write-text");
            toast.info(
              "Link copiado! Compartilhe o link personalizado com seus clientes."
            );
          }}
        >
          <Typography variant="caption" className="leading-6">
            Compartilhe o link com seus clientes
          </Typography>
          <div className="text-blue-500 ">
            {copied === "write-text" ? "Link copiado!" : "Copiar link"}
          </div>
        </div>
      )}
    </>
  );
};

export default ShareLink;
