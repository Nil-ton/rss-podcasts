import { Footer } from '../components/Footer'
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
            <body className='flex gap-1 fixed min-h-screen z-0'>
                <Dialog.Root>
                    <Dialog.Content>
                        <Dialog.Title text='Adicionar' />
                        <Dialog.Subtitle text='Insira o URL RSS do podcast que você deseja adicionar à lista. Você pode encontrar RSS de podcasts em https://chartable.com/.' />
                        <Dialog.Form />
                    </Dialog.Content>
                </Dialog.Root>

                <Sidebar.Root>
                    <Sidebar.Content>
                        <Sidebar.Header />
                        <Sidebar.ActionsAdd />
                    </Sidebar.Content>
                    <Sidebar.Content>
                        <Sidebar.Library />
                    </Sidebar.Content>
                </Sidebar.Root>

                {children}

                <Footer.Root>
                    <Player.Root>
                        <Player.Info />
                        <Player.Progress />
                        <Player.Control />
                    </Player.Root>
                </Footer.Root>
            </body>
        </html>
    )
}