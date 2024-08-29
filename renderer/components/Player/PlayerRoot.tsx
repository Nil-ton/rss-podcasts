'use client'
import { useEffect, useRef } from "react"
import { stateManager } from "../../stateManager"

interface IPlayerRoot {
    children: React.ReactNode
}

export function PlayerRoot({ children }: IPlayerRoot) {
    const selectedPodcastPlay = stateManager.useSelectedPodcastPlay((state) => state.item)
    const setControl = stateManager.useAudioControl((state) => state.setControl)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        let isMounted = true
        if(audioRef && isMounted) {
            setControl(audioRef.current)
        }
        return () => {
            isMounted = false
        }
    }, [audioRef])

    return (
        <>
            <audio src={selectedPodcastPlay?.enclosures[0].url} ref={audioRef} />
            {selectedPodcastPlay && (
                <div className="flex justify-between p-4 bg-background">
                    {children}
                </div>
            )}
        </>
    )
}
