import { create } from 'zustand'
import { IRssItem } from '../../services/rss-to-json'

interface IRecentlyAddedPodcasts {
    items: IRssItem[]
    update(offset: number, limit: number): Promise<void>
}

export const recentlyAddedPodcasts = create<IRecentlyAddedPodcasts>(set => ({
    items: [],
    update: async (offset: number, limit: number) => {
        const newItems: IRssItem[] = await window.ipc.handle('rss-get-items', [offset, limit])
        set(state => ({ items: [...state.items, ...newItems] }))
    }
}))
