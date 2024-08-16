interface IPodcastsGridRoot {
    children: React.ReactNode
}
export function PodcastsGridRoot({children}: IPodcastsGridRoot) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {children}
        </div>
    )
}