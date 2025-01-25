"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { Button, ProgressBar } from "@/presentation/components";
import { toast } from "react-toastify";
import { deleteAccount } from "@/core/actions/user";
import { useRouter } from "next/navigation";

type DeleteAccountProps = {
  id: string;
  text: string;
};

const DeleteAccount: React.FC<DeleteAccountProps> = ({ id, text }) => {
  const navigate = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setOpen(!open);
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    await deleteAccount(id)
      .then((res) => {
        toast.success(res?.message);
        navigate.push("/");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <ProgressBar />}
      <div className="flex flex-col gap-y-10 justify-center pt-5">
        <div>
          <h3 className="text-2xl font-bold text-center mb-3">Atenção</h3>
          <p className="text-lg text-justify leading-7">{text}</p>
        </div>
        <Button
          fullWidth
          onClick={handleOpenModal}
          color="error"
          variant="outlined"
          className="mb-5"
        >
          Deletar conta
        </Button>
        <Dialog
          open={open}
          onClose={handleOpenModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="relative">
            <FaX className="absolute top-4 right-4" onClick={handleOpenModal} />
            <DialogTitle>Confirmar exclução</DialogTitle>
            <DialogContent>
              Caso estejá ciente, clique em confirmar para deletar a sua conta.
              <Button
                fullWidth
                onClick={handleDeleteAccount}
                color="error"
                variant="contained"
                className="mt-5"
              >
                Confirmar
              </Button>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default DeleteAccount;
