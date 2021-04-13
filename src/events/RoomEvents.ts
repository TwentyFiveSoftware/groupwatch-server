import { Socket } from 'socket.io';
import { RoomManager } from '../controller/RoomManager';
import type { IRoom } from '../types/Room';

const roomManager = new RoomManager();

const registerRoomEvents = (socket: Socket) => {
    let userRoom: IRoom = null;

    socket.on('join', (roomId: string | null) => {
        if (userRoom === null) {
            userRoom = roomManager.joinRoom(roomId);
            socket.join(userRoom.id);
        }

        socket.emit('joinResponse', userRoom);
    });
};

export default registerRoomEvents;
