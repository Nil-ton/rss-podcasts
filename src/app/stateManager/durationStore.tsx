import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ISelectedPodcastPlay {
    duration: number
}

interface IActions {
    setDuration: (newDuration: number) => void
}

export const useDurationStore = create(persist<ISelectedPodcastPlay & IActions>(
    (set) => ({
        duration: 0,
        setDuration(newDuration) {
            set({ duration: newDuration })
        },
    }),
    {
        name: 'duration-storage',
        storage: createJSONStorage(() => localStorage),
    }
))