import * as fs from 'fs';
import { resolve } from 'path';

const TEMP_DIRECTORY = './tmp';

const doesExist = (path: string): Promise<boolean> => {
    return new Promise<boolean>(res => {
        fs.exists(path, (exists: boolean) => {
            res(exists);
        });
    });
};

const removeTemporaryDirectory = (path: string): Promise<void> => {
    return new Promise(res => {
        fs.rmdir(path, () => {
            res();
        });
    });
};

const createTemporaryDirectory = (path: string): Promise<void> => {
    return new Promise((res) => {
        doesExist(path)
        .then(exists => {
            if (exists) {
                console.warn(`Direcotry: ${resolve(__dirname, path)} already exists. Removing`);
                return removeTemporaryDirectory(path);
            }
            return Promise.resolve();
        })
        .then(() => {
            fs.mkdir(path, () => res());
        });
    });
};

before(() => {
    return createTemporaryDirectory(TEMP_DIRECTORY);
});

after(() => {
    return removeTemporaryDirectory(TEMP_DIRECTORY);
});
