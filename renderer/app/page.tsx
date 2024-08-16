'use client'
import { FormEvent, useCallback, useEffect, useState } from "react";
import { IRssItem } from '../../services/rss-to-json'
import { PodcastsGrid } from "../components/PodcastsGrid";
import { Main } from "../components/Main";

export default function Page() {
    const [form, setForm] = useState('')
    const [rss, setRss] = useState<IRssItem[] | null>(null)

    const setRessCallback = useCallback(async (offset: number, limit: number) => {
        const rssRes = await window.ipc.handle<IRssItem[]>('rss-get-items', [offset, limit])
        setRss(rssRes)
    }, [])

    useEffect(() => {
        (async () => {
            await setRessCallback(1, 12)
        })();
    }, [setRessCallback])

    const lastEp = rss?.slice(0, 4)
    const ep = rss?.slice(4)

    return (
        rss ? (
            <Main.Root>
                <Main.Title title="Últimos Episódios" />

                <PodcastsGrid.Root>
                    {lastEp.map((item) => (
                        <PodcastsGrid.Content key={item.id + '_last'}>
                            <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                        </PodcastsGrid.Content>
                    ))}
                </PodcastsGrid.Root>

                <Main.Title title="Episódios" />

                <PodcastsGrid.Root>
                    {ep.map((item) => (
                        <PodcastsGrid.Content key={item.id + '_ep'}>
                            <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                        </PodcastsGrid.Content>
                    ))}
                </PodcastsGrid.Root>
            </ Main.Root>
        ) : 'Carregando...'
    )
}
