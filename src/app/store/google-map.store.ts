import { create } from "zustand";
import { GoogleMapViewParamater } from "../paramaters/google-map/paramater";

interface GoogleMapStoreState {
  mapPayload: GoogleMapViewParamater;
}

interface GoogleMapStoreStateAction {
  setMapPayload: (payload: GoogleMapViewParamater) => void;
}

export const useGoogleMapStore = create<
  GoogleMapStoreState & GoogleMapStoreStateAction
>((set) => ({
  mapPayload: {
    lat: -0.789275,
    lng: 113.921327,
    zoom: 9,
  },
  setMapPayload: (payload: GoogleMapViewParamater) =>
    set({ mapPayload: payload }),
}));
