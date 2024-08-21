import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    progress: number
}

interface IActions {
    setProgress: (newProgress: number) => void
}

export const useProgressStore = create(persist<ISelectedPodcastPlay & IActions>(
    (set) => ({
        progress: 0,
        setProgress(newProgress) {
            set({ progress: newProgress })
        },
    }),
    {
        name: 'progress-storage',
        storage: createJSONStorage(() => localStorage),
    }
))