import { Sidebar } from '../components/Siderbar'
import { SidebarContent } from '../components/Siderbar/SidebarContent'
import '../styles/globals.css'
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='pt-br'>
            <body className='flex gap-1 fixed'>
                <Sidebar.Root>
                    <SidebarContent>
                        <Sidebar.Header />
                        <Sidebar.Actions icon='https://cdn-icons-png.flaticon.com/512/992/992651.png' text='Adicionar' />
                    </SidebarContent>
                    <Sidebar.Content>
                        <p className='text-xl font-semibold p-2'>Sua Biblioteca</p>
                    </Sidebar.Content>
                </Sidebar.Root>
                <main className='h-screen overflow-auto'>
                    {children}
                </main>
            </body>
        </html>
    )
}