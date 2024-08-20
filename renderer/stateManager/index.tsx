import { useDialogControl } from "./dialogControl";
import { useRecentlyAddedPodcasts } from "./recentlyAdded";
import { useSelectedPodcastPlay } from "./selectedPodcastPlay";

export const stateManager = {
    useRecentlyAddedPodcasts,
    useSelectedPodcastPlay,
    useDialogControl,
}