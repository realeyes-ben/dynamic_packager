import * as fs from "fs";
import { resolve } from "path";

const TEMP_DIRECTORY = "./tmp";

export const WRITE_TO_PATH = resolve(__dirname, TEMP_DIRECTORY);
export const TEST_ASSETS_PATH = resolve(__dirname, "../test_assets");

const doesExist = (path: string): Promise<boolean> => {
    return new Promise<boolean>(res => {
        fs.exists(path, (exists: boolean) => {
            res(exists);
        });
    });
};

const removeTemporaryDirectory = (path: string): Promise<void> => {
    return new Promise((res, rej) => {
        fs.rmdir(path, (err) => {
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
        .then(exists => {
            if (exists) {
                console.warn(`Direcotry: ${resolve(__dirname, path)} already exists. Removing`);
                return removeTemporaryDirectory(path);
            }
            return Promise.resolve();
        })
        .then(() => {
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

before(() => {
    return createTemporaryDirectory(TEMP_DIRECTORY);
});

after(() => {
    return removeTemporaryDirectory(TEMP_DIRECTORY);
});
