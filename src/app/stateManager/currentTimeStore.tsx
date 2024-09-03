import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ISelectedPodcastPlay {
    currentTime: number
}

interface IActions {
    setCurrentTime: (newCurrent: number) => void
}

export const useCurrentTimeStore = create(persist<ISelectedPodcastPlay & IActions>(
    (set) => ({
        currentTime: 0,
        setCurrentTime(newCurrent) {
            set({ currentTime: newCurrent })
        },
    }),
    {
        name: 'current-time-storage',
        storage: createJSONStorage(() => localStorage),
       
    }
))