import { useAudioControl } from "./audioControl";
import { useCurrentTimeStore } from "./currentTimeStore";
import { useDialogControl } from "./dialogControl";
import { useDurationStore } from "./durationStore";
import { useIsPlay } from "./isPlay";
import { useMutedStore } from "./mutedStore";
import { usePodcasts } from "./podcasts";
import { useProgressStore } from "./progressStore";
import { useRecentlyAddedPodcasts } from "./recentlyAdded";
import { useSelectedPodcastPlay } from "./selectedPodcastPlay";
import { useVolumeStore } from "./volumeStore";

export const stateManager = {
    useRecentlyAddedPodcasts,
    useSelectedPodcastPlay,
    useDialogControl,
    useDurationStore,
    useMutedStore,
    useProgressStore,
    useVolumeStore,
    useCurrentTimeStore,
    useAudioControl,
    useIsPlay,
    usePodcasts
}