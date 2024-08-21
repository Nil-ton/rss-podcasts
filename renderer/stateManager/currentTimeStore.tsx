import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    currentTime: number
}

interface IActions {
    setCurrentTime: (newCurrent: number) => void
}

export const useCurrentTimeStore = create(persist<ISelectedPodcastPlay & IActions>(
    (set, get) => ({
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