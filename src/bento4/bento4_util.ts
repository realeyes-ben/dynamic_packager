export enum TrackType {
    AUDIO = 'audio',
    VIDEO = 'video',
    SUBTITLES = 'subtitles',
}

export interface IMp4FragmentOptions {
    debug: boolean;
    quiet: boolean;
    index: boolean;
    trim: boolean;
    noTFDT: boolean;
    forceIFrameSync: 'auto' | 'all';
    verbosity: 0 | 1 | 2 | 3;
    track?: TrackType;
    timescale?: number;
    duration?: number;
}

export const FragmentCommandOptionsMap: { [K in keyof IMp4FragmentOptions]: string } = {
    verbosity: 'verbosity',
    debug: 'debug',
    quiet: 'quiet',
    duration: 'fragment-duration',
    timescale: 'timescale',
    track: 'track',
    index: 'index',
    trim: 'trim',
    noTFDT: 'no-tfdt',
    forceIFrameSync: 'force-i-frame-sync',
};
