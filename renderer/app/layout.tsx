import { Footer } from '../components/Footer'
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
            <body className='flex gap-1 fixed min-h-screen'>
                    <Sidebar.Root>
                        <Sidebar.Content>
                            <Sidebar.Header />
                            <Sidebar.ActionsAdd  />
                        </Sidebar.Content>
                        <Sidebar.Content>
                            <p className='text-xl font-semibold p-2'>Sua Biblioteca</p>
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