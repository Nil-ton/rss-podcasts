import { create } from 'zustand'
import { IRssItem } from '../../services/rss-to-json'

interface IRecentlyAddedPodcasts {
    items: IRssItem[]
}

interface IActions {
    setItems(offset: number, limit: number): Promise<void>
}

export const useRecentlyAddedPodcasts = create<IRecentlyAddedPodcasts & IActions>((set, get) => ({
    items: [],
    setItems: async (offset: number, limit: number) => {
        const newItems: IRssItem[] = await window.ipc.handle('rss-get-items', [offset, limit])
        set({ items: newItems})
    },
}))


