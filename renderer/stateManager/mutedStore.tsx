import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ISelectedPodcastPlay {
    muted: boolean
}

interface IActions {
    setMuted: (boolean: boolean) => void
}

export const useMutedStore = create(persist<ISelectedPodcastPlay & IActions>(
    (set) => ({
        muted: false,
      
        setMuted(boolean) {
            set({ muted: boolean })
        },
    }),
    {
        name: 'muted-storage',
        storage: createJSONStorage(() => localStorage)
    }
))