import { IPlaylist } from '../../playlist/types/Playlist';

export interface IRoom {
    id: string;
    playlist: IPlaylist;
}
