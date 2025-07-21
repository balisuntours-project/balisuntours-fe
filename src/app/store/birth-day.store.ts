/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface BirthDayStoreState {
  birthDayMonth: string;
}

interface BirthDayStoreStateAction {
  setBirthDayMonth: (date: string) => void;
}

export const useBirthDayStore = create<BirthDayStoreState & BirthDayStoreStateAction>(
  (set) => ({
    birthDayMonth: "",
    setBirthDayMonth: (date: string) =>
      set({ birthDayMonth: date }),
  })
);
