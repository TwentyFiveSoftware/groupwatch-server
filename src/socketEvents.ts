import type { Server, Socket } from 'socket.io';
import type { DefaultEventProps } from './types/DefaultEventProps';
import { SocketEventType } from './types/SocketEventType';
import selectVideo from './modules/playlist/events/selectVideo';
import addVideo from './modules/playlist/events/addVideo';
import joinRoom from './modules/room/events/joinRoom';
import setVideoPlaying from './modules/playlist/events/setVideoPlaying';
import requestVideoTimeSync from './modules/playlist/events/requestVideoTimeSync';
import videoTimeSyncResponse from './modules/playlist/events/videoTimeSyncResponse';

const registerSocketEvents = (io: Server, socket: Socket): void => {
    const props: DefaultEventProps = { io, socket, room: null };

    socket.on(SocketEventType.ROOM_JOIN, (roomId: string | null) => {
        props.room = joinRoom(props, roomId);
    });

    socket.on(SocketEventType.PLAYLIST_ADD_VIDEO, async (url: string) => await addVideo(props, url));

    socket.on(SocketEventType.PLAYLIST_SELECT_VIDEO, (index: number) => selectVideo(props, index));

    socket.on(SocketEventType.PLAYLIST_SET_VIDEO_PLAYING, (playing: boolean, seconds?: number) =>
        setVideoPlaying(props, playing, seconds),
    );

    socket.on(SocketEventType.PLAYLIST_VIDEO_TIME_SYNC_REQUEST, () => requestVideoTimeSync(props));

    socket.on(SocketEventType.PLAYLIST_VIDEO_TIME_SYNC_RESPONSE, (seconds: number) =>
        videoTimeSyncResponse(props, seconds),
    );
};

export default registerSocketEvents;
