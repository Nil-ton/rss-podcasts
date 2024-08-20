'use client'
import { useEffect, useRef } from "react"
import { stateManager } from "../../stateManager"

interface IPlayerRoot {
    children: React.ReactNode
}
export function PlayerRoot({ children }: IPlayerRoot) {
    const [selectedPodcastPlay, setControl, volume, muted] = stateManager.useSelectedPodcastPlay((state) => [state.item, state.setControl, state.volume, state.muted])
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (muted) {
            audioRef.current.volume = 0
        }
        if (!muted && volume) {
            audioRef.current.volume = volume
        }

        setControl(audioRef.current)
    }, [audioRef.current])



    return (
        audioRef && (
            <div className="flex justify-between p-4 bg-background w-screen">
                <audio src={selectedPodcastPlay?.enclosures[0].url} ref={audioRef}></audio>
                {children}
            </div>
        )
    )
}