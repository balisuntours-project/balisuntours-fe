"use client"

import { GoogleMapViewParamater } from "@/app/paramaters/google-map/paramater";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { GoogleMapViewComponent } from "./google-map.view";

// Komponen yang menerima children
export function GoogleMapDialogComponent(props: GoogleMapViewParamater & { children: React.ReactNode }) {
    const setMapPayload = useGoogleMapStore((state) => state.setMapPayload);

    useEffect(() => {
       
        setMapPayload({
            lat: props.lat,
            lng: props.lng,
            zoom: props.zoom,
        });
    }, [props, setMapPayload]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* Render children dari komponen parent */}
                <div>
                    {props.children}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[340px] rounded-lg md:max-w-2xl lg:max-w-5xl w-full px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-10">
                <DialogHeader>
                    <DialogTitle >
                       
                    </DialogTitle>
                    {/* Menampilkan komponen peta */}
                    <GoogleMapViewComponent />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
