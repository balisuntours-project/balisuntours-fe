import { create } from 'zustand';

interface LoaderStoreState {
    isLoading: boolean,
   
}

interface LoaderStoreStateAction {
    setIsLoading: (status: boolean) => void
    
}

export const useLoaderStore = create<LoaderStoreState & LoaderStoreStateAction>((set) => ({
   
    isLoading: false,
    setIsLoading: (status) => set({isLoading: status})
}))
