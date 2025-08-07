"use client";

import { useToast } from "@/context/ToastContext";
import { useEffect, useRef } from "react";

interface ErrorProps {
  error: Error;
}

export default function GlobalError({ error }: ErrorProps) {
  const { error: showErrorToast } = useToast();
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (!hasShownToastRef.current) {
      showErrorToast(error.message);
      hasShownToastRef.current = true;
    }
  }, [error, showErrorToast]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <h2 className="text-lg lg:text-xl text-yellow-300">
        Oops! Something went wrong.
      </h2>
      <p className="text-sm font-medium">{error.message}</p>
      <p className="text-xl">Try refreshing the page.</p>
    </div>
  );
}
