import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    isPlay: boolean
}

interface IActions {
    setIsPlay: (isPlay: boolean) => void
}

export const useIsPlay = create<ISelectedPodcastPlay & IActions>((set) => ({
    isPlay: null,
    setIsPlay(isPlay) {
        set({ isPlay })
    },
}),
)