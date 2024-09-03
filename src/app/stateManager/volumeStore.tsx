import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ISelectedPodcastPlay {
    volume: number
}

interface IActions {
    setVolume: (number: number) => void
}

export const useVolumeStore= create(persist<ISelectedPodcastPlay & IActions>(
    (set) => ({
        volume: 0,
       
        setVolume(number) {
            set({ volume: number })
        },
    }),
    {
        name: 'volume-storage',
        storage: createJSONStorage(() => localStorage),
    }
))