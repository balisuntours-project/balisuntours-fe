"use client";

import { GoogleMapViewParamater } from "@/app/paramaters/google-map/paramater";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { GoogleMapViewComponent } from "./google-map.view";

// Komponen yang menerima children
export function GoogleMapDialogComponent(
  props: Partial<GoogleMapViewParamater> & {
    children: React.ReactNode;
    readonlyMap?: boolean;
    scopedId?: string;
  }
) {
  const setMapPayload = useGoogleMapStore((state) => state.setMapPayload);
  const setMapScopedState = useGoogleMapStore((state) => state.setScopedState);

  useEffect(() => {
    if (props.lat && props.lng) {
      setMapPayload({
        lat: props.lat,
        lng: props.lng,
        zoom: props.zoom,
      });

      if(props.scopedId) {
        setMapScopedState(props.scopedId, "mapScopedPayload", {
          lat: props.lat,
          lng: props.lng,
          zoom: props.zoom,
        });
      }
    }
  }, [props, setMapPayload]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Render children dari komponen parent */}
        <div>{props.children}</div>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] rounded-lg md:max-w-2xl lg:max-w-5xl w-full px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-10">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          {/* Menampilkan komponen peta */}
          <GoogleMapViewComponent
            mapStyle="w-full h-[200px] md:h-[450px]"
            readonlyMap={props.readonlyMap}
            scopedId={props.scopedId}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
