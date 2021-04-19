import type { DefaultEventProps } from '../../../types/DefaultEventProps';
import type { IRoom } from '../types/Room';
import { SocketEventType } from '../../../types/SocketEventType';
import { createRoom, getRoom } from '../roomManager';

const joinRoom = ({ socket, room }: DefaultEventProps, roomId: string | null): IRoom => {
    const joinedRoom = room ?? getRoom(roomId) ?? createRoom();
    socket.join(joinedRoom.id);

    socket.emit(SocketEventType.ROOM_JOIN_RESPONSE, joinedRoom);

    return joinedRoom;
};

export default joinRoom;
