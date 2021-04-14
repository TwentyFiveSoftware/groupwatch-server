import { Server, Socket } from 'socket.io';
import { RoomManager } from '../controller/RoomManager';
import type { IRoom } from '../types/Room';

const roomManager = new RoomManager();

const registerRoomEvents = (io: Server, socket: Socket) => {
    let userRoom: IRoom = null;

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
        io.to(userRoom.id).emit('roomUpdate', userRoom);
    });
};

export default registerRoomEvents;
