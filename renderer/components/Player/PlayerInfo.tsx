'use client'
import { stateManager } from "../../stateManager";

interface IPlayerInfo {
    image: string;
    author: string;
    title: string;
}

export function PlayerInfo() {
    const selectedPodcastPlay= stateManager.useSelectedPodcastPlay((state) => state.item)

    return (
        <div className="flex gap-2 items-center">
            <img className="w-14 rounded" src={selectedPodcastPlay?.itunes_image.href} />
            <div className="flex flex-col">
                <p className="font-bold text-white hover:underline">{selectedPodcastPlay?.title}</p>
                <p className="text-sm hover:underline hover:text-white">{selectedPodcastPlay?.author}</p>
            </div>
        </div>
    )
}