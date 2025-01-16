import { create } from "zustand";

interface PaginationStore {
  currentPage: number;
  totalPage: number;
  onChangePage: boolean,
}

interface PaginationStoreAction {
  setCurrentPage: (current: number) => void;
  setTotalPage: (total: number) => void;
  setOnChangePage: (status: boolean) => void;
}

export const usePaginationStore = create<PaginationStore & PaginationStoreAction>(
  (set) => ({
    currentPage: 1,
    setCurrentPage: (current) => set({ currentPage: current }),

    totalPage: 1,
    setTotalPage: (total) => set({ totalPage: total }),

    onChangePage: false,
    setOnChangePage: (status) => set({ onChangePage: status }),
  })
);
