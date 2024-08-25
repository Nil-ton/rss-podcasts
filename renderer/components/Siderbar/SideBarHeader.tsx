import Image from 'next/image'
import icon from '../../public/images/logo.png'


export function SideBarHeader() {
    return (
        <div className="p-3 flex items-center gap-3">
            <Image className="shrink-0 w-8 filter invert" alt="logo" src={icon}></Image>
            <h2 className="text-xl font-semibold">Podcasts</h2>
        </div>
    )
}