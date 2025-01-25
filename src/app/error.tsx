"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

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
      <div className="h-screen flex flex-col justify-center items-center">
        <h3 className="text-5xl font-bold mb-4">Ops</h3>
        <h5 className="text-xl">{error.message}</h5>
      </div>
    </div>
  );
}
