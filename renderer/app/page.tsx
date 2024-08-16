'use client'
import { FormEvent, useCallback, useEffect, useState } from "react";
import { IRssItem } from '../../services/rss-to-json'
import { PodcastsGrid } from "../components/PodcastsGrid";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Siderbar";

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
        <div className='flex gap-1 fixed'>
            {rss ? (
                <>

                    <Sidebar.Root>
                        <Sidebar.Content>
                            <Sidebar.Header />
                            <Sidebar.Actions icon='https://cdn-icons-png.flaticon.com/512/992/992651.png' text='Adicionar' />
                        </Sidebar.Content>
                        <Sidebar.Content>
                            <p className='text-xl font-semibold p-2'>Sua Biblioteca</p>
                        </Sidebar.Content>
                    </Sidebar.Root>

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

                    <Footer.Root>
                        <Player.Root>
                            <Player.Info author={'Jovem nerd'} image="https://i.scdn.co/image/ab67656300005f1f1a3579d894141338e90b87d6" title="Affonso Solano, Beto Estrada e Didi " />
                            <Player.Progress />
                            <Player.Control />
                        </Player.Root>
                    </Footer.Root>
                </>
            ) : 'Carregando...'}

        </div>
    )
}
