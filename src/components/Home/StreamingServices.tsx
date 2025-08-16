"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";
import { MovieProvider } from "@/app/models/MovieProvider";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useToast } from "@/context/ToastContext";
import Image from "next/image";

interface Props {
  selectedService: MovieProvider;
  onSelect: (str: MovieProvider) => void;
}
function StreamingServicesComponent({ selectedService, onSelect }: Props) {
  const { providerStore } = useStore();
  const { streamingServices, error } = providerStore;
  const { error: showErrorToast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useOutsideClick(() => {
    setShowDropdown(false);
  });

  useEffect(() => {
    providerStore.loadStreamingServices();
  }, [providerStore]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error, showErrorToast]);

  if (!selectedService) return null;

  return (
    <div
      className="relative min-w-15"
      onClick={() => setShowDropdown((prev) => !prev)}
      ref={dropdownRef}
    >
      <div className="flex items-center justify-center gap-4 p-1.5 rounded-[10px] border-2 bg-transparent border-[#222c38] w-full cursor-pointer">
        <img
          width={40}
          height={40}
          src={`https://image.tmdb.org/t/p/w185${selectedService.logo_path}`}
          alt="logo"
        />
        <Image
          className={`${
            showDropdown ? "rotate-180" : ""
          } transform transition duration-200`}
          width={30}
          height={30}
          src="/icons/arrow-down.svg"
          alt="arrow-down"
        />
      </div>
      {showDropdown && (
        <div className="absolute z-100 top-15 w-[240px] right-0 bg-[#222c38] p-2">
          <div className="grid grid-cols-4">
            {streamingServices.map((str) => {
              console.log(
                "IMAGE",
                `https://image.tmdb.org/t/p/w185${str.logo_path}`
              );
              return (
                <div
                  key={str.provider_id}
                  className="p-1 cursor-pointer"
                  onClick={() => onSelect(str)}
                >
                  <img
                    width={40}
                    height={40}
                    src={`https://image.tmdb.org/t/p/w185${str.logo_path}`}
                    alt="logo"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(StreamingServicesComponent);
