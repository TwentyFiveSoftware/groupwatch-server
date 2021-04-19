import type { Socket, Server } from 'socket.io';
import type { IRoom } from '../modules/room/types/Room';

export interface DefaultEventProps {
    io: Server;
    socket: Socket;
    room: IRoom;
}
