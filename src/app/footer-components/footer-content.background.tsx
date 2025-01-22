import React from "react";

export function FooterBackgroundContent({children, backgroundColor} : {children: React.ReactNode, backgroundColor?: string}) {
    return (
        <div className={`w-full max-w-full ${backgroundColor ? backgroundColor : "bg-white"}`}>
        <div className="mx-auto w-full md:w-3/4 lg:w-2/4 py-4 md:py-20">
         {children}
        </div>
      </div>
    )
}