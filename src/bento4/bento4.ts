import { Commands, command } from './command';
import { TrackType, FragmentCommandOptionsMap } from './bento4_util';

const createOptionString = (key: string, value?: string): string => {
    if (value === undefined) {
        return '';
    }
    return `--${key} ${value}`;
};

const generateOptions = (optionStuff: string[]) => (options: IFragmentOptions): string[] => {
    const optionsString = Object.keys(options).reduceRight(
        (prevValue: string[], optionKey: string) => [...prevValue, createOptionString()],
        [],
    );
    return optionsString;
};

export class Bento4 {
    private static generatemp4FragmentOptions = generateOptions([]);

    public static mp4dash(): Promise<ArrayBuffer> {
        return command(Commands.mp4dash);
    }

    public static mp4fragment(
        inputPath: string,
        outputPath: string,
        debug = false,
        index = true,
        track?: TrackType,
        timescale?: number,
        duration?: number,
    ): Promise<ArrayBuffer> {
        const options = Bento4.generatemp4FragmentOptions({
            inputPath,
            outputPath,
            debug,
            index,
            track,
            timescale,
            duration,
        });
        return command(Commands.mp4fragment, options);
    }
}

//mp4dash --encryption-cenc-scheme=cenc --encryption-key=$(hexdump -e '"%x"' enc.key) -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash --encryption-cenc-scheme=cenc --encryption-key=7cc7f0470019ac10d06bca13a580a9ff:5fa05f94e8cd09fc0747c7c5ac215b3b -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash -o ./test_asset/dash_unenc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4

// mp4fragment --timescale 90000 --track 'video' --fragment-duration 2002 --index inputPath outputPath

// mp42ts ./test_asset/video/avc1/seg-1.m4s ./test_asset/ts/seg-1.ts
