import { stateManager } from "../../stateManager"

interface IMainRoot {
    children: React.ReactNode
}

export function MainRoot({children}: IMainRoot) {
    const selectedPodcast = stateManager.useSelectedPodcastPlay((state) => state.item)
 
    return (
        <div style={{height: selectedPodcast ? '80vh' : '100vh' }} className="p-2 m-2 rounded-xl bg-background-base shadow-2xl overflow-auto">
            {children}
        </div>
    )
}