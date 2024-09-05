import { useCallback, useEffect } from "react"
import { stateManager } from "./stateManager"
import { IRssItem } from "../services/rss-to-json"
import { Main } from "./components/Main"
import { PodcastsGrid } from "./components/PodcastsGrid"

export default function App() {
    const [podcastRecently, setPodcastRecently, isLoadingPodcastRecently] = stateManager.useRecentlyAddedPodcasts((state) => [state.items, state.setItems, state.isLoading])
    const [podcasts, setPodcasts] = stateManager.usePodcasts((state) => [state.items, state.setItems])
    const setSelectedPodcast = stateManager.useSelectedPodcastPlay((state) => state.setItem)
    const [volume, setVolume] = stateManager.useVolumeStore((state) => [state.volume, state.setVolume])
    const setIsplay = stateManager.useIsPlay((state) => state.setIsPlay)
    const audioControl = stateManager.useAudioControl((state) => state.control)

    const ifNotVolumeStorage = useCallback(() => {
        const isVolumeStorage = JSON.parse(localStorage.getItem('volume-storage'))
        if (!isVolumeStorage) {
            setVolume(.5)
        }
    }, [])

    const handleSelectedPodcast = useCallback((podcast: IRssItem) => {
        setSelectedPodcast(podcast)
        if (audioControl) {
            audioControl.volume = volume
            if (audioControl.autoplay) {
                audioControl.play()
            }

            if (!audioControl.autoplay) {
                audioControl.autoplay = true
            }
            setIsplay(true)
        }
    }, [audioControl])

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            ifNotVolumeStorage();
            (async () => {
                await setPodcastRecently(1, 4);
                await setPodcasts()
            })();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (

        isLoadingPodcastRecently ? <p>Carregando</p> : podcastRecently?.length !== 0 ? (
            <>
                <Main.Title title="Últimos Episódios" />
                <PodcastsGrid.Root>
                    {podcastRecently.map((item, i) => (
                        <PodcastsGrid.Content key={i + '_recently'} onClick={() => handleSelectedPodcast(item)}>
                            <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                        </PodcastsGrid.Content>
                    ))}
                </PodcastsGrid.Root>
                {
                    podcasts.map((podcast, i) => (
                        <div key={i + 'podcasts'}>
                            <Main.Title title={podcast.title} />
                            <PodcastsGrid.Root>
                                {podcast.items.map((item, i) => (item &&
                                    <PodcastsGrid.Content key={i + 'podcast'} onClick={() => handleSelectedPodcast(item)}>
                                        <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                                    </PodcastsGrid.Content>
                                ))}
                            </PodcastsGrid.Root>
                        </div>
                    ))
                }
            </>

        ) : <p data-test="rss-empty">Adicione RSS</p>
    )
}