"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { FaQuestion, FaX } from "react-icons/fa6";
import { Button } from "@/presentation/components";

const ButtonHelper: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setOpen(!open);
  };

  return (
    <div className="flex justify-center">
      <Button onClick={handleOpenModal} variant="outlined">
        Como funciona <FaQuestion size={14} className="mb-1" />
      </Button>
      <Dialog
        open={open}
        onClose={handleOpenModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="relative">
          <FaX className="absolute top-4 right-4" onClick={handleOpenModal} />
          <DialogTitle>Como funciona as fidelizações</DialogTitle>
          <DialogContent>
            Para participar e preciso realizar os seguintes passos:
            <ul className="list-disc pl-5 text-sm mt-2">
              <li>Realize uma compra na loja</li>
              <li>
                Após fazer a compra, solicite ao atendente que você quer
                fidelizar
              </li>
              <li>
                Informe o número do seu telefone da sua conta e confirme os seus
                dados
              </li>
              <li>
                Após a fidelização ser concluida, observe quando vc poderá fazer
                a próxima fidelização.
              </li>
              <li>
                Continue juntando fidelizações, complete seu cartão e resgate
                sua recompensa!
              </li>
            </ul>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default ButtonHelper;
