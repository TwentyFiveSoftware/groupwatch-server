import type { IRoom } from '../types/Room';

const ROOM_ID_LENGTH = 5;
const ROOM_ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export class RoomManager {
    private rooms: IRoom[] = [];

    private static generateRoomId(): string {
        let id = '';

        for (let i = 0; i < ROOM_ID_LENGTH; i++)
            id += ROOM_ID_ALPHABET[Math.floor(Math.random() * ROOM_ID_ALPHABET.length)];

        return id;
    }

    public joinRoom(roomId: string | null): IRoom {
        // join room
        if (roomId !== null && this.roomExists(roomId)) {
            return this.getRoom(roomId);
        }

        roomId = RoomManager.generateRoomId();

        // create room
        const room: IRoom = {
            id: roomId,
            playlist: {
                videos: [],
                currentVideoIndex: 0,
                currentVideoTime: 0,
                isVideoPlaying: false,
            },
        };
        this.rooms.push(room);
        return room;
    }

    private roomExists(roomId: string): boolean {
        return this.getRoom(roomId) !== null;
    }

    private getRoom(roomId: string): IRoom | null {
        return this.rooms.find((room) => room.id === roomId) ?? null;
    }
}
