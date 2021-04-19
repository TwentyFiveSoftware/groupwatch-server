import { Server } from 'socket.io';
import registerSocketEvents from './socketEvents';
import * as http from 'http';

const socketServer = (server: http.Server): Server => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log(`[+] ${socket.id}`);

        registerSocketEvents(io, socket);

        socket.on('disconnect', () => console.log(`[-] ${socket.id}`));
    });

    return io;
};

export default socketServer;
