'use client'

import { stateManager } from "../../stateManager"

export function SideBarLibrary() {
    const podcasts = stateManager.usePodcasts((state) => state.items)
  
    return (
        <div className="h-full overflow-y-auto">
            <p className='text-xl font-semibold p-2'>Sua Biblioteca</p>
                {podcasts.map((podcast) => ( podcast.title &&
                    <div key={podcast?.title + '_library'} className="flex items-center mb-4 mx-2">
                        <img src={podcast?.image} className="w-12 rounded"/>
                        <span className="px-3 text-white">{podcast?.title}</span>
                    </div>
                ))}
        </div>
    )
}