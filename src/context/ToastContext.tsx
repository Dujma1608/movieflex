"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  theme: "light",
};

interface ToastContextProps {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const success = (message: string) => {
    toast.success(message, defaultOptions);
  };

  const error = (message: string) => {
    toast.error(message, defaultOptions);
  };

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextProps {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
