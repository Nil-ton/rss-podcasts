'use client'
import { ChangeEvent, FormEvent, LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import { IRssItem } from '../../services/rss-to-json'
import { PodcastsGrid } from "../components/PodcastsGrid";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Siderbar";

export default function Page() {
    const [rssItems, setRssItems] = useState<IRssItem[] | null>(null)
    const [selectedRssItem, setSelectedRssItem] = useState<IRssItem | null>(null)
    

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const latestEpisodes = rssItems?.slice(0, 4)
    const otherEpisodes = rssItems?.slice(4)

    const setRessCallback = useCallback(async (offset: number, limit: number) => {
        const rssRes = await window.ipc.handle<IRssItem[]>('rss-get-items', [offset, limit])
        setRssItems(rssRes)
    }, [])

    const setSelectRssItemCallback = useCallback((item: IRssItem) => {
        setSelectedRssItem(item)
        localStorage.setItem('selectedRssItem', JSON.stringify(item))
        audioRef.current.autoplay = true
        console.log(audioRef.current)
    }, [])


    useEffect(() => {
        (async () => {
            await setRessCallback(1, 12)
        })();

        const selectedRssItemStorage = JSON.parse(localStorage.getItem('selectedRssItem'))
        if(selectedRssItemStorage) {
            setSelectedRssItem(selectedRssItemStorage)
        }
    }, [setRessCallback])

    return (
        <div className='flex gap-1 fixed'>
            {rssItems ? (
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
                            {latestEpisodes.map((item) => (
                                <PodcastsGrid.Content key={item.id + '_last'} onClick={() => setSelectRssItemCallback(item)}>
                                    <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                                </PodcastsGrid.Content>
                            ))}
                        </PodcastsGrid.Root>

                        <Main.Title title="Episódios" />

                        <PodcastsGrid.Root>
                            {otherEpisodes.map((item) => (
                                <PodcastsGrid.Content key={item.id + '_episodes'} onClick={() => setSelectRssItemCallback(item)}>
                                    <PodcastsGrid.Card image={item.itunes_image.href} author={item.author} title={item.title} published={item.published} durationate={item['itunes_duration']} />
                                </PodcastsGrid.Content>
                            ))}
                        </PodcastsGrid.Root>
                    </ Main.Root>

                    <audio src={selectedRssItem?.enclosures[0].url} ref={audioRef}></audio>
                    {selectedRssItem && audioRef.current &&(
                        <Footer.Root>
                            <Player.Root>
                                <Player.Info author={selectedRssItem?.author} image={selectedRssItem?.itunes_image.href} title={selectedRssItem?.title} />
                                <Player.Progress audioRef={audioRef.current}/>
                                <Player.Control audioRef={audioRef.current} selectedRssItem={selectedRssItem} />
                            </Player.Root>
                        </Footer.Root>
                    )}
                </>
            ) : 'Carregando...'}

        </div>
    )
}
