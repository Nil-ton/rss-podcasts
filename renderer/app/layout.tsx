import { Footer } from '../components/Footer'
import { HeaderSystem } from '../components/HeaderSystem'
import { Main } from '../components/Main'
import { Dialog } from '../components/Modal'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Siderbar'
import '../styles/globals.css'
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='pt-br'>
            <body className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] grid-areas-layout max-h-screen h-screen fixed z-0">
                <HeaderSystem.Root>
                    <HeaderSystem.Minimize />
                    <HeaderSystem.Maximize />
                    <HeaderSystem.Close />
                </HeaderSystem.Root>

                <Sidebar.Root>
                    <Sidebar.Content height='h-1/3' overflow='none'>
                        <Sidebar.Header />
                        <Sidebar.ActionsAdd />
                    </Sidebar.Content>
                    <Sidebar.Content height='h-full'>
                        <Sidebar.Library />
                    </Sidebar.Content>
                </Sidebar.Root>

                <Main.Root>
                    {children}
                </Main.Root>

                <Footer.Root>
                    <Player.Root>
                        <Player.Info />
                        <Player.Progress />
                        <Player.Control />
                    </Player.Root>
                </Footer.Root>

                <Dialog.Root>
                    <Dialog.Content>
                        <Dialog.Title text='Adicionar' />
                        <Dialog.Subtitle text='Insira o URL RSS do podcast que você deseja adicionar à lista. Você pode encontrar RSS de podcasts em https://chartable.com/.' />
                        <Dialog.Form />
                    </Dialog.Content>
                </Dialog.Root>
                
            </body>
        </html>
    )
}