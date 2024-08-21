import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    control: HTMLAudioElement | null
}

interface IActions {
    setControl: (ref: HTMLAudioElement) => void
}

export const useAudioControl = create<ISelectedPodcastPlay & IActions>((set) => ({
        control: null,
        setControl(ref) {
            set({ control: ref })
        },
    }),
)