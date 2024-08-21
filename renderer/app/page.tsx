'use client'
import { useCallback, useEffect } from "react";
import { PodcastsGrid } from "../components/PodcastsGrid";
import { Main } from "../components/Main";
import { stateManager } from "../stateManager";
import { IRssItem } from "../../services/rss-to-json";

export default function Page() {
    const [podcastRecently, setPodcastRecently] = stateManager.useRecentlyAddedPodcasts((state) => [state.items, state.setItems])
    const setSelectedPodcast = stateManager.useSelectedPodcastPlay((state) => state.setItem)
    const [volume, setVolume] = stateManager.useVolumeStore((state) => [state.volume, state.setVolume])
    const setIsplay = stateManager.useIsPlay((state) => state.setIsPlay)
    const audioControl = stateManager.useAudioControl((state) => state.control)

    const ifNotVolumeStorage = useCallback(() => {
        const isVolumeStorage = localStorage.getItem('volume-storage')

        if(!isVolumeStorage) setVolume(.5)
    }, [])

    const handleSelectedPodcast = useCallback((podcast: IRssItem) => {
        setSelectedPodcast(podcast)
        if(audioControl) {
            audioControl.volume = volume
            audioControl.autoplay = true
            setIsplay(true)
        }
    },[audioControl])


    useEffect(() => {
        let isMounted = true;
        ifNotVolumeStorage()

        if (isMounted) {
            (async () => {
                await setPodcastRecently(1, 4);
            })();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        podcastRecently.length !== 0 ? (

            <Main.Root>
                <Main.Title title="Últimos Episódios" />

                <PodcastsGrid.Root>
                    {podcastRecently.map((item) => (
                        <PodcastsGrid.Content key={item.id + '_recently'} onClick={() => handleSelectedPodcast(item)}>
                            <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                        </PodcastsGrid.Content>
                    ))}
                </PodcastsGrid.Root>
            </ Main.Root>

        ) : 'Carregando...'
    )
}
