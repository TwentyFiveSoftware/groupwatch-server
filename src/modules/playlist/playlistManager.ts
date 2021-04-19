import type { DefaultEventProps } from '../../types/DefaultEventProps';
import { SocketEventType } from '../../types/SocketEventType';

const sendPlaylistUpdate = ({ io, room }: DefaultEventProps): void => {
    if (room === null) return;
    io.to(room.id).emit(SocketEventType.PLAYLIST_UPDATE, room);
};

export { sendPlaylistUpdate };
