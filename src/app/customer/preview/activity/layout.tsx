    import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
    




    export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
       <>
       <Toaster />
        {children}
       </>
    );
    }
