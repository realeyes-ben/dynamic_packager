export enum TrackType {
    AUDIO = "audio",
    VIDEO = "video",
    SUBTITLES = "subtitles",
}

export enum EncryptionSchemes {
    CENC = "cenc",
    CBC1 = "cbc1",
    CENS = "cens",
    cbcs = "cbcs"
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
    verbose: boolean;
    debug: boolean;
    outputDir?: string;
    force: boolean;
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
    /**
     *  Minimum buffer time (in seconds)
     */
    minBufferTime?: number;
    maxPlayoutRate?: number // Stategy. Look this up
    languageMap?: string[];
    alwaysOutputLang: boolean;
    subtitles: boolean;
    // TODO (ben.toofer@realeyes.com): Finish all options
    encryptionCENCScheme?: EncryptionSchemes;
}

export type mp4dashOptionsMap = { [K in keyof IMp4DashOptions]: string };

export const DashCommandOptionsMap: mp4dashOptionsMap = {
    verbose: "verbose",
    debug: "debug",
    outputDir: "output-dir",
    force: "force",
    mpdName: "mpd-name",
    profiles: "profiles",
    noMedia: "no-media",
    renameMedia: "rename-media",
    mediaPrefix: "media-prefix",
    initSegment: "init-segment",
    noSpilt: "no-split",
    useSegmentList: "use-segment-list",
    useSegmentTempalte: "use-segment-template-number-padding",
    useSegmentTimeline: "use-segment-timeline",
    minBufferTime: "min-buffer-time",
    maxPlayoutRate: "max-playout-rate",
    languageMap: "language-map",
    alwaysOutputLang: "always-output-lang",
    subtitles: "subtitles",
    encryptionCENCScheme: "encryption-cenc-scheme"
};