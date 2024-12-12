import { create } from "zustand";

interface DatePickerStoreState {
  diffDaysNumber: number;
  cleanCalendar: boolean;
  selectedDate: Date | undefined;
}

interface DatePickerStoreStateAction {
  setDiffDaysNumber: (payload: number) => void;
  setCleanCalender: (status: boolean) => void;
  setSelectedDate: (date: Date | undefined) => void;
}

export const useDatePickerStore = create<
  DatePickerStoreState & DatePickerStoreStateAction
>((set) => ({
  diffDaysNumber: 1,
  setDiffDaysNumber: (payload: number) => set({ diffDaysNumber: payload }),

  cleanCalendar: false,
  setCleanCalender: (status: boolean) => set({ cleanCalendar: status }),

  selectedDate: undefined,
  setSelectedDate: (date: Date | undefined) => set({ selectedDate: date }),
}));
