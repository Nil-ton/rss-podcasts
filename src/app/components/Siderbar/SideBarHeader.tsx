

export function SideBarHeader() {
    return (
        <div className="p-3 flex items-center gap-3">
            <img className="shrink-0 w-8 filter invert" alt="logo" src={require('../../public/images/logo.png')} />
            <h2 className="text-xl font-semibold">Podcasts</h2>
        </div>
    )
}