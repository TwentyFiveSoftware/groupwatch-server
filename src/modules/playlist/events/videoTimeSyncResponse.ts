import type { DefaultEventProps } from '../../../types/DefaultEventProps';
import { sendPlaylistUpdate } from '../playlistManager';

const videoTimeSyncResponse = (props: DefaultEventProps, seconds: number): void => {
    if (props.room === null || seconds === 0) return;

    props.room.playlist.currentVideoTime = seconds;

    sendPlaylistUpdate(props);
};

export default videoTimeSyncResponse;
