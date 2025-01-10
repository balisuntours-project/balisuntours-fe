"use client";

import { useLoaderStore } from "@/app/store/loader.store";
import { LoaderSvg } from "./loader.svg";
import { useEffect } from "react";

export interface TextDialogProps {
  title: string;
  text: string;
}

export function TextLoader(props: TextDialogProps) {
  const isLoading = useLoaderStore((state) => state.isLoading);

  useEffect(() => {
      console.log(isLoading)
  }, [isLoading])
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4  lg:max-w-sm transform -translate-y-1/2">
            <div className="flex items-center justify-center mb-4">
              <LoaderSvg />
              <p className="text-lg font-semibold">{props.title}</p>
            </div>
            <p className="text-gray-600 text-center">{props.text}</p>
          </div>
        </div>
      )}
    </>
  );
}
