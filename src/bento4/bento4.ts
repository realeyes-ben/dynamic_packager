import { Commands, command, generateOptions } from "../command/command";
import { FragmentCommandOptionsMap, IMp4FragmentOptions, mp4fragmentOptionsMap, mp4dashOptionsMap, IMp4DashOptions, DashCommandOptionsMap } from "./bento4_util";

// TODO (ben.toofer@realeyes.com): Verify that command binary path is set
export class Bento4 {
    private static generateMP4FragmentOptions = generateOptions<mp4fragmentOptionsMap, IMp4FragmentOptions>(FragmentCommandOptionsMap);
    private static generateMP4DashOptions = generateOptions<mp4dashOptionsMap, IMp4DashOptions>(DashCommandOptionsMap);

    public static mp4dash(inputMediaPaths: string[], options: IMp4DashOptions): Promise<ArrayBuffer> {
        const generatedOptions = Bento4.generateMP4DashOptions(options);
        console.warn([...generatedOptions, inputMediaPaths]);
        return command(Commands.mp4dash, [...generatedOptions, ...inputMediaPaths]);
    }

    public static mp4fragment(
        inputPath: string,
        outputPath: string,
        options: IMp4FragmentOptions
    ): Promise<ArrayBuffer> {
        const generatedOptions = Bento4.generateMP4FragmentOptions(options);
        return command(Commands.mp4fragment, [...generatedOptions, inputPath, outputPath]);
    }
}

//mp4dash --encryption-cenc-scheme=cenc --encryption-key=$(hexdump -e '"%x"' enc.key) -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash --encryption-cenc-scheme=cenc --encryption-key=7cc7f0470019ac10d06bca13a580a9ff:5fa05f94e8cd09fc0747c7c5ac215b3b -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash -o ./test_asset/dash_unenc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4

// mp4fragment --timescale 90000 --track 'video' --fragment-duration 2002 --index inputPath outputPath

// mp42ts ./test_asset/video/avc1/seg-1.m4s ./test_asset/ts/seg-1.ts
