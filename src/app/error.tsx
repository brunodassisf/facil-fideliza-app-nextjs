"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { FaGears } from "react-icons/fa6";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center px-4 text-center">
        <FaGears size={48} className="mb-3 text-tag" />
        <h3 className="text-xl font-bold">Ops, ocorreu um erro inesperado</h3>
        <h5>Contate o suporte o mais breve possível</h5>
      </div>
    </div>
  );
}
