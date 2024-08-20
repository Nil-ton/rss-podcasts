import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    item: IRssItem | null
    isLoading: boolean
    control: HTMLAudioElement | null
    volume: number
    muted: boolean
    currentTime: number
    isPlay: boolean 
    progress: number
    duration:number
}

interface IActions {
    setItem(newItem: IRssItem): Promise<void>
    setIsLoading(isLoading: boolean): void
    setControl: (ref: HTMLAudioElement) => void
    setVolume: (number:number) => void
    setMuted: (boolean: boolean) => void
    setCurrentTime: (newCurrent: number) => void
    setIsPlay: (boolean: boolean) => void
    setProgress: (newProgress: number) => void
    setDuration: (newDuration: number) => void
}

export const useSelectedPodcastPlay = create(persist<ISelectedPodcastPlay & IActions>(
    (set, get) => ({
        item: null,
        isLoading: false,
        control: null,
        volume: 0,
        muted: false,
        currentTime: 0,
        isPlay: false,
        progress: 0,
        duration: 0,
        setDuration(newDuration) {
            set({duration: newDuration})
        },
        setProgress(newProgress) {
            set({progress: newProgress})
        },
        setIsPlay(boolean) {
            set({isPlay: boolean})
        },
        setCurrentTime(newCurrent) {
            set({currentTime: newCurrent})
        },
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
        setItem: async (newItem) => {
            if (get().isLoading) return
            get().setIsLoading(true)
            set({ item: newItem })
            set({isPlay: true})
            get().setIsLoading(false)

            if(get().item.title !== newItem.title || get().control.paused && get().item.title === newItem.title) {
                get().control.currentTime = get().currentTime
                get().control.autoplay = true
            }

        },
    }),
    {
        name: 'selected-podcast-play-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) =>  Object.fromEntries(Object.entries(state).filter(([key]) => !['isLoading', 'control', 'isPlay'].includes(key))) as (ISelectedPodcastPlay & IActions),
    }
))