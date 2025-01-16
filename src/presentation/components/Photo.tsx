"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { saveImgStore } from "@/core/actions/photo";
import { useResourceStore } from "../../core/context/WrapperStore";

const ImageUploader: React.FC = () => {
  const { store } = useResourceStore();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) {
      setError("Nenhuma imagem selecionada.");
      return;
    }

    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setError("Apenas imagens no formato PNG ou JPG são permitidas.");
      return;
    }

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("O tamanho da imagem não pode exceder 1 MB.");
      return;
    }

    setError("");
    setImage(file);

    // Gera o preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (): void => {
    setImage(null);
    setPreviewUrl("");
    setError("");
  };

  const handleDivClick = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadImage = async () => {
    setIsLoading(true);
    await saveImgStore(store?.userId as string, image as File).finally(() =>
      setIsLoading(false)
    );
  };

  return (
    <>
      {isLoading && <ProgressBar />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {previewUrl ? (
          <div className="relative">
            <FaTimes
              size={32}
              onClick={handleRemoveImage}
              className="border rounded-full bg-gray-300 p-1 text-gray-700 cursor-pointer absolute top-3 right-6"
            />
            <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center shadow-md mb-3">
              <Image
                width={100}
                height={100}
                src={previewUrl}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <Button fullWidth variant="contained" onClick={handleUploadImage}>
              Salvar logo
            </Button>
          </div>
        ) : (
          <div>
            <div
              onClick={handleDivClick}
              className="border-2 border-dashed border-gray-400 p-5 text-center max-w-sm bg-gray-100 mx-auto cursor-pointer"
            >
              <p>Clique para escolher uma imagem para sua logo</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef}
                style={{ display: "none" }} // Torna o input invisível
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
