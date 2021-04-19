import type { DefaultEventProps } from '../../types/DefaultEventProps';

const sendPlaylistUpdate = ({ io, room }: DefaultEventProps): void => {
    io.to(room.id).emit('roomUpdate', room);
};

export { sendPlaylistUpdate };
