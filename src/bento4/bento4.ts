import { Commands, command, generateOptions } from "./command";
import { TrackType, FragmentCommandOptionsMap, IMp4FragmentOptions, mp4fragmentOptionsMap } from "./bento4_util";

export class Bento4 {
    private static generateMP4FragmentOptions = generateOptions<mp4fragmentOptionsMap, IMp4FragmentOptions>(FragmentCommandOptionsMap);
    private static generateMP4DashOptions = generateOptions<any, any>();

    public static mp4dash(inputPath: string, outputPath: string): Promise<ArrayBuffer> {
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
        const options = Bento4.generateMP4FragmentOptions({
            debug,
            index,
            track,
            timescale,
            duration,
        });
        return command(Commands.mp4fragment, [...options, inputPath, outputPath]);
    }
}

//mp4dash --encryption-cenc-scheme=cenc --encryption-key=$(hexdump -e '"%x"' enc.key) -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash --encryption-cenc-scheme=cenc --encryption-key=7cc7f0470019ac10d06bca13a580a9ff:5fa05f94e8cd09fc0747c7c5ac215b3b -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash -o ./test_asset/dash_unenc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4

// mp4fragment --timescale 90000 --track 'video' --fragment-duration 2002 --index inputPath outputPath

// mp42ts ./test_asset/video/avc1/seg-1.m4s ./test_asset/ts/seg-1.ts
