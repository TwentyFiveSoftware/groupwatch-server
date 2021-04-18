import { Server, Socket } from 'socket.io';
import { RoomManager } from '../controller/RoomManager';
import type { IRoom } from '../types/Room';
import { getVideoData, getVideoIdFromUrl } from '../controller/YouTubeManager';

const roomManager = new RoomManager();

const registerRoomEvents = (io: Server, socket: Socket) => {
    let userRoom: IRoom = null;

    const sendRoomUpdate = (): void => {
        io.to(userRoom.id).emit('roomUpdate', userRoom);
    };

    socket.on('join', (roomId: string | null) => {
        if (userRoom === null) {
            userRoom = roomManager.joinRoom(roomId);
            socket.join(userRoom.id);
        }

        socket.emit('joinResponse', userRoom);
    });

    socket.on('addVideoToPlaylist', async (url: string) => {
        if (userRoom === null) return;

        const data = await getVideoData(getVideoIdFromUrl(url));
        if (data === null) return;

        userRoom.playlist.videos.push({ url, ...data });
        sendRoomUpdate();
    });

    socket.on('selectVideoIndex', (index: number) => {
        if (userRoom === null) return;

        const lastVideoIndex = userRoom.playlist.currentVideoIndex;
        userRoom.playlist.currentVideoIndex = Math.min(Math.max(index, 0), userRoom.playlist.videos.length - 1);

        if (lastVideoIndex !== userRoom.playlist.currentVideoIndex) {
            userRoom.playlist.isVideoPlaying = true;
            userRoom.playlist.currentVideoTime = 0;
        }

        sendRoomUpdate();
    });

    socket.on('setVideoPlaying', (playing: boolean, seconds?: number) => {
        if (userRoom === null) return;
        if (userRoom.playlist.isVideoPlaying === playing) return;

        userRoom.playlist.isVideoPlaying = playing;
        if (seconds) userRoom.playlist.currentVideoTime = seconds;
        sendRoomUpdate();
    });

    socket.on('requestVideoTimeSync', () => {
        if (userRoom === null) return;
        io.to(userRoom.id).emit('videoTimeSync');
    });

    socket.on('videoTimeSyncResponse', (seconds: number) => {
        if (seconds === 0) return;
        userRoom.playlist.currentVideoTime = seconds;
        sendRoomUpdate();
    });
};

export default registerRoomEvents;
