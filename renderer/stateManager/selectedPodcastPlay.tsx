import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    item: IRssItem | null
    isLoading: boolean
    control: HTMLAudioElement | null
    volume: number
    muted: boolean
}

interface IActions {
    update(newItem: IRssItem): Promise<void>
    setIsLoading(isLoading: boolean): void
    setControl: (ref: HTMLAudioElement) => void
    setVolume: (number:number) => void
    setMuted: (boolean: boolean) => void
}

export const useSelectedPodcastPlay = create(persist<ISelectedPodcastPlay & IActions>(
    (set, get) => ({
        item: null,
        isLoading: false,
        control: null,
        volume: 0,
        muted: false,
        setMuted(boolean) {
            if(boolean) {
                get().control.volume = 0
            } 

            if(!boolean) {
                get().control.volume = get().volume
            }
            set({muted: boolean})
        },
        setVolume(number) {
            set({volume: number})
            get().control.volume = number
        },
        setControl(ref) {
            set({control: ref})
        },
        setIsLoading(isLoading) {
            set({ isLoading })
        },
        update: async (newItem) => {
            if (get().isLoading) return
            get().setIsLoading(true)
            set({ item: newItem })
            get().setIsLoading(false)
            get().control.autoplay = true
        },
    }),
    {
        name: 'selected-podcast-play-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) =>  Object.fromEntries(Object.entries(state).filter(([key]) => !['isLoading', 'control'].includes(key))) as (ISelectedPodcastPlay & IActions),
    }
))