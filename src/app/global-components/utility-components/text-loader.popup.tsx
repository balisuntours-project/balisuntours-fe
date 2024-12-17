"use client";

import { useLoaderStore } from "@/app/store/loader.store";

export interface TextDialogProps {
  title: string;
  text: string;
}

export function TextLoader(props: TextDialogProps) {
  const isLoading = useLoaderStore((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4  lg:max-w-sm transform -translate-y-1/2">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-primary mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 150"
              >
                <path
                  fill="none"
                  stroke="#FF156D"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeDasharray="300 385"
                  strokeDashoffset="0"
                  d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    calcMode="spline"
                    dur="2"
                    values="685;-685"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animate>
                </path>
              </svg>
              <p className="text-lg font-semibold">{props.title}</p>
            </div>
            <p className="text-gray-600 text-center">{props.text}</p>
          </div>
        </div>
      )}
    </>
  );
}
