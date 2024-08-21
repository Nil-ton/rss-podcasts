'use client'
import { useCallback, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { stateManager } from "../../stateManager";

export function PlayerProgress() {
    const audioControl= stateManager.useAudioControl((state) => state.control)
    const setSelected= stateManager.useSelectedPodcastPlay((state) => state.setItem)
    const [isPlay, setIsPlay]= stateManager.useIsPlay((state) => [state.isPlay, state.setIsPlay])
    const [currentTime, setCurrentTime]= stateManager.useCurrentTimeStore((state) => [state.currentTime, state.setCurrentTime])
    const [progress, setProgress]= stateManager.useProgressStore((state) => [state.progress, state.setProgress])
    const [duration, setDuration]= stateManager.useDurationStore((state) => [state.duration, state.setDuration])
    const volume= stateManager.useVolumeStore((state) => state.volume)

    const [isManuallyChanging, setIsManuallyChanging] = useState(false);

    function startPlay() {
        audioControl.currentTime = currentTime
        audioControl.volume = volume
        setIsPlay(true)
        audioControl.play()
    }

    function pausePlay() {
        setIsPlay(false)
        audioControl.pause()
    }



    function handleRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newTime = (parseFloat(event.target.value) / 100) * duration;
        setCurrentTime(newTime);
        audioControl.currentTime = newTime;
        setProgress(parseFloat(event.target.value));
        setIsManuallyChanging(true)
    }

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    useEffect(() => {
        let isMounted = true
        if (audioControl && isMounted) {
            const updateProgress = () => {
                if(!isManuallyChanging) {
                    setCurrentTime(audioControl.currentTime);
                    setProgress((audioControl.currentTime / audioControl.duration) * 100);

                }
            };

            const handleLoadedMetadata = () => {
                setDuration(audioControl.duration);
            };

            const handleEnded = () => {
                stateManager.useSelectedPodcastPlay.persist.clearStorage()
                setSelected(null)
            };

            audioControl.addEventListener("timeupdate", updateProgress);
            audioControl.addEventListener("loadedmetadata", handleLoadedMetadata);
            audioControl.addEventListener("ended", handleEnded);

            return () => {
                audioControl.removeEventListener("timeupdate", updateProgress);
                audioControl.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audioControl.removeEventListener("ended", handleEnded);
                isMounted = false
            };
        }
    }, [audioControl]);

    useEffect(() => {
        let timer:NodeJS.Timeout 
        let isMounted = true
    
        if(isMounted) {
             timer = setTimeout(() => {
                setIsManuallyChanging(false);
            }, 100);
        }

        return () => {
            clearTimeout(timer);
            isMounted = false
        }
    }, [progress]);


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-3 items-center">
                {/* <img className="w-5 h-5 filter invert cursor-pointer m-2" src="https://cdn-icons-png.freepik.com/512/84/84268.png" /> */}
                {!isPlay && <Icon.PlayCircle className="h-10 w-10 cursor-pointer hover:text-white" onClick={startPlay} />}
                {isPlay && <Icon.PauseCircle className="h-10 w-10 cursor-pointer hover:text-white" onClick={pausePlay} />}
                {/* <img className="w-5 h-5 filter invert cursor-pointer m-2 transform -scale-x-100" src="https://cdn-icons-png.freepik.com/512/84/84268.png" /> */}
            </div>
            <div className="flex items-center">
                <div>{formatTime(currentTime)}</div>
                <input
                    type="range"
                    className="w-[500px] h-1 m-5"
                    max={100}
                    value={progress}
                    onChange={handleRangeChange}
                />
                <div>{formatTime(duration)}</div>
            </div>
        </div>
    )
}