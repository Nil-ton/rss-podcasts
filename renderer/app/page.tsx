'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import { IRssItem } from '../../services/rss-to-json'
import { PodcastsGrid } from "../components/PodcastsGrid";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { stateManager } from "../stateManager";

export default function Page() {
    const [podcastRecently, setPodcastRecently] = stateManager.useRecentlyAddedPodcasts((state) => [state.items, state.setItems])
    const setSelectedPodcast = stateManager.useSelectedPodcastPlay((state) => state.setItem)
    

    useEffect(() => {
        (async () => {
            await setPodcastRecently(1, 4)
        })();
    }, [])

    return (
       podcastRecently.length !== 0 ? (

                    <Main.Root>
                        <Main.Title title="Últimos Episódios" />

                        <PodcastsGrid.Root>
                            {podcastRecently.map((item) => (
                                <PodcastsGrid.Content key={item.id + '_recently'} onClick={() => setSelectedPodcast(item)}>
                                    <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                                </PodcastsGrid.Content>
                            ))}
                        </PodcastsGrid.Root>
                    </ Main.Root>

            ) : 'Carregando...'
    )
}
