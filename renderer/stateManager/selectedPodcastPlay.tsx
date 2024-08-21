import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IRssItem } from '../../services/rss-to-json'

interface ISelectedPodcastPlay {
    item: IRssItem | null
}

interface IActions {
    setItem(newItem: IRssItem): Promise<void>
}

export const useSelectedPodcastPlay = create(persist<ISelectedPodcastPlay & IActions>(
    (set, get) => ({
        item: null,
        setItem: async (newItem) => {
            const current = get().item;
            if (!current || current && current.title !== newItem.title) {
                set({ item: newItem });
            }
        },
    }),
    {
        name: 'selected-podcast-play-storage',
        storage: createJSONStorage(() => localStorage),
    }
))