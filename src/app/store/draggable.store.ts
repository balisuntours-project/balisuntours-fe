import { create } from "zustand";
import React from "react";

export interface DraggableType<T> {
  id: number;
  content: React.ReactNode;
  data?: T;
}

export interface DraggableScopedState {
  selectedDraggable: Array<DraggableType<any>>;
}

export const defaultDraggableScopedState = {
  selectedDraggable: [],
};

interface DraggableStoreState {
  draggableScopedStates: Record<string, DraggableScopedState>;

  items: Array<DraggableType<any>>;
}

interface DraggableStoreStateAction {
  setScopedState: (
    id: string,
    key: keyof DraggableScopedState,
    value: any
  ) => void;
  getScopedState: (id: string) => DraggableScopedState;
  resetScopedState: (id: string) => void;

  setItems: (
    updateFn: (items: Array<DraggableType<any>>) => Array<DraggableType<any>>
  ) => void;
}

export const useDraggableStore = create<
  DraggableStoreState & DraggableStoreStateAction
>((set, get) => ({
  draggableScopedStates: {},

  setScopedState: (
    id,
    key,
    valueOrUpdater: ((prevValue: any) => any) | any
  ) => {
    set((state) => {
      const currentValue =
        state.draggableScopedStates[id]?.[key] || defaultDraggableScopedState[key];
  
      const newValue =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(currentValue)
          : valueOrUpdater;
  
      return {
        draggableScopedStates: {
          ...state.draggableScopedStates,
          [id]: {
            ...state.draggableScopedStates[id],
            [key]: newValue,
          },
        },
      };
    });
  },
  

  getScopedState: (id) => {
    const state = get().draggableScopedStates[id];
    return state || defaultDraggableScopedState;
  },

  resetScopedState: (id) => {
    set((state) => ({
      draggableScopedStates: {
        ...state.draggableScopedStates,
        [id]: defaultDraggableScopedState,
      },
    }));
  },

  items: [],
  setItems: (updateFn) => set((state) => ({ items: updateFn(state.items) })),
}));
