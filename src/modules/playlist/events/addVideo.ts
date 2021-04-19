import type { DefaultEventProps } from '../../../types/DefaultEventProps';
import { getVideoData, getVideoIdFromUrl } from '../../youTube/youTubeManager';
import { sendPlaylistUpdate } from '../playlistManager';

const addVideo = async (props: DefaultEventProps, url: string): Promise<void> => {
    if (props.room === null) return;

    const videoId = getVideoIdFromUrl(url);
    if (videoId === null) return;

    const data = await getVideoData(videoId);
    if (data === null) return;

    props.room.playlist.videos.push({ url, ...data });
    sendPlaylistUpdate(props);
};

export default addVideo;
