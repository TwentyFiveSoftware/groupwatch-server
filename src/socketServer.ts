import { Server } from 'socket.io';
import registerRoomEvents from './events/RoomEvents';

const socketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log(`[+] ${socket.id}`);

        registerRoomEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`[-] ${socket.id}`);
        });
    });

    return io;
};

export default socketServer;
