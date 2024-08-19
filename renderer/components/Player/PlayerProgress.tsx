import { useEffect, useState } from "react";
import { Icon } from "../Icon";

interface IPlayerControl {
    audioRef: HTMLAudioElement
}

export function PlayerProgress({ audioRef }: IPlayerControl) {
    const [isPlay, setIsPlay] = useState(false)
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    function startPlay() {
        audioRef.play()
        setIsPlay(true)
    }
    function pausePlay() {
        audioRef.pause()
        setIsPlay(false)
    }

    function handleRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newTime = (parseFloat(event.target.value) / 100) * duration;
        audioRef.currentTime = newTime;
    }

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    useEffect(() => {
        if (audioRef) {
            const updateProgress = () => {
                setCurrentTime(audioRef.currentTime);
                setProgress((audioRef.currentTime / audioRef.duration) * 100);
            };

            const handleLoadedMetadata = () => {
                setDuration(audioRef.duration);
            };

            audioRef.addEventListener("timeupdate", updateProgress);
            audioRef.addEventListener("loadedmetadata", handleLoadedMetadata);

            return () => {
                audioRef.removeEventListener("timeupdate", updateProgress);
                audioRef.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [audioRef]);


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
                    value={progress || 0}
                    onChange={handleRangeChange}
                />
                <div>{formatTime(duration)}</div>
            </div>
        </div>
    )
}