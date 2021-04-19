import type { Server, Socket } from 'socket.io';
import type { DefaultEventProps } from './types/DefaultEventProps';
import selectVideo from './modules/playlist/events/selectVideo';
import addVideo from './modules/playlist/events/addVideo';
import joinRoom from './modules/room/events/joinRoom';
import setVideoPlaying from './modules/playlist/events/setVideoPlaying';
import requestVideoTimeSync from './modules/playlist/events/requestVideoTimeSync';
import videoTimeSyncResponse from './modules/playlist/events/videoTimeSyncResponse';

const registerSocketEvents = (io: Server, socket: Socket) => {
    const props: DefaultEventProps = { io, socket, room: null };

    socket.on('join', (roomId: string | null) => {
        props.room = joinRoom(props, roomId);
    });

    socket.on('addVideoToPlaylist', async (url: string) => await addVideo(props, url));

    socket.on('selectVideoIndex', (index: number) => selectVideo(props, index));

    socket.on('setVideoPlaying', (playing: boolean, seconds?: number) => setVideoPlaying(props, playing, seconds));

    socket.on('requestVideoTimeSync', () => requestVideoTimeSync(props));

    socket.on('videoTimeSyncResponse', (seconds: number) => videoTimeSyncResponse(props, seconds));
};

export default registerSocketEvents;
