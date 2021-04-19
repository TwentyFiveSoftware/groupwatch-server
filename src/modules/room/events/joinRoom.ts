import type { DefaultEventProps } from '../../../types/DefaultEventProps';
import type { IRoom } from '../types/Room';
import { createRoom, getRoom, roomExists } from '../roomManager';

const joinRoom = ({ socket, room }: DefaultEventProps, roomId: string): IRoom => {
    if (room !== null) return room;

    const joinedRoom = roomExists(roomId) ? getRoom(roomId) : createRoom();
    socket.join(joinedRoom.id);

    socket.emit('joinResponse', joinedRoom);

    return joinedRoom;
};

export default joinRoom;
