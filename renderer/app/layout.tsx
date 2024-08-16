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
            <body>
                {children}
            </body>
        </html>
    )
}