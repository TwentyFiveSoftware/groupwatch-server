import type { DefaultEventProps } from '../../../types/DefaultEventProps';

const requestVideoTimeSync = ({ room, io }: DefaultEventProps): void => {
    if (room === null) return;
    io.to(room.id).emit('videoTimeSync');
};

export default requestVideoTimeSync;
