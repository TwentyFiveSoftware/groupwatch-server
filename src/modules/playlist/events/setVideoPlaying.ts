import type { DefaultEventProps } from '../../../types/DefaultEventProps';
import { sendPlaylistUpdate } from '../playlistManager';

const setVideoPlaying = (props: DefaultEventProps, playing: boolean, seconds?: number): void => {
    if (props.room === null) return;

    const playlist = props.room.playlist;

    if (playlist.isVideoPlaying === playing) return;

    playlist.isVideoPlaying = playing;
    if (seconds) playlist.currentVideoTime = seconds;

    sendPlaylistUpdate(props);
};

export default setVideoPlaying;
