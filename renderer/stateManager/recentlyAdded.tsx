import { create } from 'zustand'
import { IRssItem } from '../../services/rss-to-json'

interface IRecentlyAddedPodcasts {
    items: IRssItem[]
    isLoading: boolean
}

interface IActions {
    setItems(offset: number, limit: number): Promise<void>
    setIsLoading(isLoading: boolean): void
}

export const useRecentlyAddedPodcasts = create<IRecentlyAddedPodcasts & IActions>((set, get) => ({
    items: [],
    isLoading: false,
    setIsLoading(isLoading) {
        set({isLoading: isLoading})
    },
    setItems: async (offset: number, limit: number) => {
        if(get().isLoading) return
        get().setIsLoading(true)
        const newItems: IRssItem[] = await window.ipc.handle('rss-get-items', [offset, limit])
        set({ items: newItems})
        get().setIsLoading(false)
    },
}))


