"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import { deleteImgStore } from "@/core/actions/photo";
import { useResourceStore } from "../../core/context/WrapperStore";

type DeletePhotoProps = {
  children: React.ReactNode;
};

const DeletePhoto: React.FC<DeletePhotoProps> = ({ children }) => {
  const { store } = useResourceStore();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleModal = (): void => {
    setOpen(!open);
  };

  const handleDeletePhoto = async () => {
    setIsLoading(true);
    handleToggleModal();
    await deleteImgStore({
      userId: store?.userId as string,
      img: store?.img as string,
    })
      .then((res) => toast.success(res?.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <ProgressBar />}
      <div className="mt-5 flex justify-center">
        <div className="relative border-4 border-stone-400 rounded-full w-fit">
          <div className="absolute top-1 right-5 cursor-pointer bg-red-600 text-white p-2 rounded-full flex justify-center items-center">
            <FaTrash onClick={handleToggleModal} />
          </div>
          {children}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleToggleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remover logo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja remover sua logo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleToggleModal}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={handleDeletePhoto}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePhoto;
