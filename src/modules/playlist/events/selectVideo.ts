import type { DefaultEventProps } from '../../../types/DefaultEventProps';
import { sendPlaylistUpdate } from '../playlistManager';

const selectVideo = (props: DefaultEventProps, index: number): void => {
    if (props.room === null) return;

    const playlist = props.room.playlist;

    const lastVideoIndex = playlist.currentVideoIndex;
    playlist.currentVideoIndex = Math.min(Math.max(index, 0), playlist.videos.length - 1);

    if (lastVideoIndex !== playlist.currentVideoIndex) {
        playlist.isVideoPlaying = true;
        playlist.currentVideoTime = 0;
    }

    sendPlaylistUpdate(props);
};

export default selectVideo;
