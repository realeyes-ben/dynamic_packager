export enum TrackType {
    AUDIO = "audio",
    VIDEO = "video",
    SUBTITLES = "subtitles",
}

/**
 * mp4fragment
 */
export interface IMp4FragmentOptions {
    debug: boolean;
    quiet: boolean;
    index: boolean;
    trim: boolean;
    noTFDT: boolean;
    forceIFrameSync: "auto" | "all";
    verbosity: 0 | 1 | 2 | 3;
    track?: TrackType;
    timescale?: number;
    duration?: number;
}

export type mp4fragmentOptionsMap = { [K in keyof IMp4FragmentOptions]: string };

export const FragmentCommandOptionsMap: mp4fragmentOptionsMap = {
    verbosity: "verbosity",
    debug: "debug",
    quiet: "quiet",
    duration: "fragment-duration",
    timescale: "timescale",
    track: "track",
    index: "index",
    trim: "trim",
    noTFDT: "no-tfdt",
    forceIFrameSync: "force-i-frame-sync",
};

/**
 * mp4dash
 */
export interface IMp4DashOptions {
    mpdName?: string;
    profiles: "live" | "on-demand" | "hbbtv-1.5";
    noMedia: boolean;
    renameMedia?: string;
    mediaPrefix?: string;
    initSegment?: string;
    noSpilt: boolean;
    useSegmentList: boolean;
    useSegmentTempalte: boolean;
    useSegmentTimeline: boolean;
}