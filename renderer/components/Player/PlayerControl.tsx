import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { IRssItem } from "../../../services/rss-to-json"
import { Icon } from "../Icon"

interface IPlayerControl {
    audioRef: HTMLAudioElement
    selectedRssItem: IRssItem
}

export function PlayerControl({ audioRef, selectedRssItem }: IPlayerControl) {
    const [volume, setVolume] = useState<number>(audioRef.volume)
    const [muted, setMuted] = useState(false)

    const setVolumeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value)
        setVolume(newVolume)
        audioRef.volume = newVolume
        localStorage.setItem('volume', `${newVolume}`)
    }, [])

    const setMutedCallback = useCallback((mute: boolean) => {
        const volStorage = Number(localStorage.getItem('volume'))
        if (!mute) {
            localStorage.removeItem('muted')
            setMuted(mute)
            setVolume(volStorage)
            audioRef.volume = volStorage
        }

        if (mute) {
            localStorage.setItem('muted', 'true')
            setMuted(mute)
            setVolume(0)
            audioRef.volume = 0
        }
    }, [])

    useEffect(() => {
        const mutedStorage = localStorage.getItem('muted') || null
        if (mutedStorage) {
            setVolume(0)
            audioRef.volume = 0
        }

        if (!mutedStorage) {
            const volStorage = Number(localStorage.getItem('volume'))
            setVolume(volStorage)
            audioRef.volume = volStorage
        }

    }, [selectedRssItem])


    return (
        <div className="flex items-center">
            {
                volume === 0 ? (
                    <Icon.BxsVolumeMute className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMutedCallback(!muted)} />
                ) : !muted ? (
                    volume < 0.65 ? (
                        <Icon.BxsVolumeLow className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMutedCallback(!muted)} />
                    ) : (
                        <Icon.BxsVolumeFull className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMutedCallback(!muted)} />
                    )
                ) : (
                    <Icon.BxsVolumeMute className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMutedCallback(!muted)} />
                )
            }

            <input
                type="range"
                className="h-1"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                disabled={volume === 0}
                onChange={setVolumeCallback} />
        </div>
    )
}