'use client'
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { IRssItem } from "../../../services/rss-to-json"
import { Icon } from "../Icon"
import { stateManager } from "../../stateManager"


export function PlayerControl() {
    const [volume, setVolume]= stateManager.useVolumeStore((state) => [state.volume, state.setVolume])
    const [muted, setMuted]= stateManager.useMutedStore((state) => [state.muted, state.setMuted])
    const audioControl= stateManager.useAudioControl((state) => state.control)

    const setVolumeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value)
        setVolume(newVolume)
        audioControl.volume = newVolume
    }, [audioControl])

    return (
        <div className="flex items-center">
            {
                volume === 0 ? (
                    <Icon.BxsVolumeMute className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMuted(!muted)} />
                ) : !muted ? (
                    volume < 0.65 ? (
                        <Icon.BxsVolumeLow className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMuted(!muted)} />
                    ) : (
                        <Icon.BxsVolumeFull className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMuted(!muted)} />
                    )
                ) : (
                    <Icon.BxsVolumeMute className='h-7 w-7 m-1 cursor-pointer hover:text-white' onClick={() => setMuted(!muted)} />
                )
            }

            <input
                type="range"
                className="h-1"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={setVolumeCallback} />
        </div>
    )
}