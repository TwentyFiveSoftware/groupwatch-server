import type { IRoom } from './types/Room';

const ROOM_ID_LENGTH = 5;
const ROOM_ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const rooms: IRoom[] = [];

const generateRoomId = (): string => {
    let id = '';

    for (let i = 0; i < ROOM_ID_LENGTH; i++)
        id += ROOM_ID_ALPHABET[Math.floor(Math.random() * ROOM_ID_ALPHABET.length)];

    return id;
};

const getRoom = (roomId: string | null): IRoom | null => rooms.find((room) => room.id === roomId) ?? null;

const createRoom = (): IRoom => {
    const room: IRoom = {
        id: generateRoomId(),
        playlist: {
            videos: [],
            currentVideoIndex: 0,
            currentVideoTime: 0,
            isVideoPlaying: true,
        },
    };

    rooms.push(room);

    return room;
};

export { getRoom, createRoom };
