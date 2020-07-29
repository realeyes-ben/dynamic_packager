import * as fs from "fs";
import { resolve } from "path";
import * as rimraf from "rimraf";

const TEMP_DIRECTORY = "./tmp";
const UNFRAGMENTED_PATH = "unfragmented_mp4";
const FRAGMENTED_PATH = "fragmented_mp4";
const ASSET_1 = "tears_of_steel_teaser.mp4";
const VIDEO_ASSET_2 = "video_mp4fragment.mp4";
const AUDIO_ASSET_2 = "audio_mp4fragment.mp4";

export const WRITE_TO_PATH = resolve(__dirname, TEMP_DIRECTORY);
export const TEST_ASSETS_PATH = resolve(__dirname, "../test_assets");
export const UNFRAGMENTED_MP4 = resolve(TEST_ASSETS_PATH, UNFRAGMENTED_PATH, ASSET_1);
export const VIDEO_FRAGMENTED_MP4 = resolve(TEST_ASSETS_PATH, FRAGMENTED_PATH, VIDEO_ASSET_2);
export const AUDIO_FRAGMENTED_MP4 = resolve(TEST_ASSETS_PATH, FRAGMENTED_PATH, AUDIO_ASSET_2);

const doesExist = (path: string): Promise<boolean> => {
    return new Promise<boolean>((res, rej) => {
        fs.exists(path, (exists: boolean) => {
            if (exists) {
                res();
            } else {
                rej();
            }
        });
    });
};

const removeTemporaryDirectory = (path: string): Promise<void> => {
    return new Promise((res, rej) => {
        rimraf(path, (err) => {
            if (err){
                rej(err);
            } else {
                res();
            }
        });
    });
};

const createTemporaryDirectory = (path: string): Promise<void> => {
    return new Promise((res, rej) => {
        doesExist(path)
        .then(() => {
            console.warn(`Directory: ${path} already exists. Removing`);
            return removeTemporaryDirectory(path);
        })
        .catch(() => null)
        .finally(() => {
            fs.mkdir(path, (err) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    });
};

export const readTestSegment = (path: string): Promise<ArrayBuffer> => {
    return  new Promise ((res, rej) => {
        doesExist(path)
        .then(() => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    return rej(err);
                }
                return res(data.buffer);
            });
        })
        .catch(() => rej(`${path} does not exist`));
    });
};

before(() => {
    return createTemporaryDirectory(WRITE_TO_PATH);
});

after(() => {
    // return removeTemporaryDirectory(WRITE_TO_PATH);
});
