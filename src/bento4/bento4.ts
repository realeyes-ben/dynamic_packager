import { Commands, command } from './command';

export class Bento4 {
    public static mp4dash(): Promise<ArrayBuffer> {
        return command(Commands.mp4dash);
    }

    public static mp4fragment(): Promise<ArrayBuffer> {
        return command(Commands.mp4fragment);
    }
}

//mp4dash --encryption-cenc-scheme=cenc --encryption-key=$(hexdump -e '"%x"' enc.key) -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash --encryption-cenc-scheme=cenc --encryption-key=7cc7f0470019ac10d06bca13a580a9ff:5fa05f94e8cd09fc0747c7c5ac215b3b -o ./test_asset/dash_enc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4
//mp4dash -o ./test_asset/dash_unenc/ ~/Documents/test_asset/tears-of-steel/segments/temp.mp4

// mp42ts ./test_asset/video/avc1/seg-1.m4s ./test_asset/ts/seg-1.ts
