import { create } from 'zustand'
import { IRss } from '../../services/rss-to-json'

interface IPodcasts {
    items: IRss[]
}

interface IActions {
    setItems(): Promise<void>
}

export const usePodcasts = create<IPodcasts& IActions>((set) => ({
    items: [],
    setItems: async () => {
        const newItems: IRss[] = await window.ipc.handle('rss-get-podcasts')
        set({ items: newItems})
    },
}))


