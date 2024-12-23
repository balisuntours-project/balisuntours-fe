import { create } from "zustand";

interface ScopedState {
  diffDaysNumber: number;
  cleanCalendar: boolean;
  selectedDate: Date | undefined;
}

interface DatePickerScopedStore {
  scopedStates: Record<string, ScopedState>;
  setScopedState: (id: string, key: keyof ScopedState, value: any) => void;
  getScopedState: (id: string) => ScopedState;
  resetScopedState: (id: string) => void;
}

export const defaultScopedDatePickerState = {
    diffDaysNumber: 1,
    cleanCalendar: false,
    selectedDate: undefined,
};

export const useDatePickerScopedStore = create<DatePickerScopedStore>((set, get) => ({
  scopedStates: {},

  setScopedState: (id, key, value) => {
    set((state) => ({
      scopedStates: {
        ...state.scopedStates,
        [id]: {
          ...state.scopedStates[id],
          [key]: value,
        },
      },
    }));
  },

  getScopedState: (id) => {
    const state = get().scopedStates[id];
    return (
      state || {
        diffDaysNumber: 1,
        cleanCalendar: false,
        selectedDate: undefined,
      }
    );
  },

  resetScopedState: (id) => {
    set((state) => ({
      scopedStates: {
        ...state.scopedStates,
        [id]: {
          diffDaysNumber: 1,
          cleanCalendar: false,
          selectedDate: undefined,
        },
      },
    }));
  },
}));
