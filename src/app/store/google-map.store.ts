import { create } from "zustand";
import { GoogleMapViewParamater } from "../paramaters/google-map/paramater";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "@/lib/global.constant";

export const defaultScopedMapCoordinate: {
  mapScopedPayload: (GoogleMapViewParamater & { name?: string }) | undefined;
} = {
  mapScopedPayload: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
};

export interface GoogleMapScopedState {
  mapScopedPayload: GoogleMapViewParamater | undefined;
}

interface GoogleMapStoreState {
  mapScopedState: Record<string, GoogleMapScopedState>;

  mapPayload: GoogleMapViewParamater;
}

interface GoogleMapStoreStateAction {
  setScopedState: (
    id: string,
    key: keyof GoogleMapScopedState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => void;
  getScopedState: (id: string) => GoogleMapScopedState;
  resetScopedState: (id: string) => void;

  setMapPayload: (payload: GoogleMapViewParamater) => void;
}

export const useGoogleMapStore = create<
  GoogleMapStoreState & GoogleMapStoreStateAction
>((set, get) => ({
  mapScopedState: {},

  setScopedState: (id, key, value) => {
    set((state) => ({
      mapScopedState: {
        ...state.mapScopedState,
        [id]: {
          ...state.mapScopedState[id],
          [key]: value,
        },
      },
    }));
  },

  getScopedState: (id) => {
    const state = get().mapScopedState[id];
    return state || defaultScopedMapCoordinate;
  },

  resetScopedState: (id) => {
    set((state) => ({
      mapScopedState: {
        ...state.mapScopedState,
        [id]: defaultScopedMapCoordinate,
      },
    }));
  },

  mapPayload: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
  setMapPayload: (payload: GoogleMapViewParamater) =>
    set({ mapPayload: payload }),
}));
