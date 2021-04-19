import {google} from 'googleapis';
import {IYouTubeVideoData} from './types/YouTubeVideoData';
import iso8601 from 'iso8601-duration';

const getVideoIdFromUrl = (url: string): string | null => {
    const urlSplit = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return urlSplit[2]?.split(/[^0-9a-z_\-]/i)[0] ?? urlSplit[0] ?? null;
};

interface VideoInfoResponse {
    snippet: {
        title: string,
        channelTitle: string
    };
    contentDetails: {
        duration: string
    };
}

const getVideoData = async (id: string): Promise<IYouTubeVideoData | null> => {
    try {
        const response = await google
            .youtube('v3')
            .videos
            .list({
                part: ['snippet', 'contentDetails'],
                id: [id],
                auth: process.env['YOUTUBE_DATA_API_KEY']
            });

        if (!response?.data?.items || response?.data?.items?.length === 0) return null;
        const {snippet, contentDetails} = response.data.items[0] as VideoInfoResponse;

        return {
            channel: snippet.channelTitle,
            title: snippet.title,
            duration: iso8601.toSeconds(iso8601.parse(contentDetails.duration)),
        };
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export {getVideoIdFromUrl, getVideoData};
