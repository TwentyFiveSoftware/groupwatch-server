import { Server, Socket } from 'socket.io';
import { RoomManager } from '../controller/RoomManager';
import type { IRoom } from '../types/Room';

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

    socket.on('addVideoToPlaylist', (url: string) => {
        if (userRoom === null) return;

        userRoom.playlist.videos.push({ url, title: url, channel: '', duration: 25 });
        sendRoomUpdate();
    });

    socket.on('selectVideoIndex', (index: number) => {
        if (userRoom === null) return;

        userRoom.playlist.currentVideoIndex = Math.min(Math.max(index, 0), userRoom.playlist.videos.length - 1);
        sendRoomUpdate();
    });

    socket.on('setVideoPlaying', (playing: boolean, seconds?: number) => {
        if (userRoom === null) return;
        if (userRoom.playlist.isVideoPlaying === playing) return;

        userRoom.playlist.isVideoPlaying = playing;
        if (seconds) userRoom.playlist.currentVideoTime = seconds;
        sendRoomUpdate();
    });
};

export default registerRoomEvents;
