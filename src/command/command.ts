import { spawn, ChildProcessWithoutNullStreams } from "child_process";

export enum Commands {
    mp4dash = "mp4dash",
    mp4fragment = "mp4fragment",
}

type OptionsMap = { [x: string]: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Options = { [x: string]: any };

export const command = (command: string, options?: string[]): Promise<ArrayBuffer> => {
    const spawnedProcess: ChildProcessWithoutNullStreams = spawn(command, options);

    return new Promise((resolve, reject) => {
        spawnedProcess.stdout.on("data", (data: ArrayBuffer) => {
            resolve(data);
        });

        spawnedProcess.stderr.on("data", (data: ArrayBuffer) => {
            reject(data);
        });

        spawnedProcess.on("error", (err: Error) => {
            reject(err);
        });

        spawnedProcess.on("close", (code: number) => {
            console.log(`child process exited with code ${code}`);
        });
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOptionString = (key: string, value: any): string | undefined => {
    if (typeof value === "boolean") {
        if (value) {
            return `--${key}`;
        } else {
            return undefined;
        }
    }
    return `--${key} ${value}`;
};

export const generateOptions = <T extends OptionsMap, O extends Options>(optionsMap: T) => (options: O): string[] => {
    const optionsString = Object.keys(options).reduce(
        (prevValue: string[], optionKey: string) => [...prevValue, createOptionString(optionsMap[optionKey], options[optionKey])],
        [],
    );
    return optionsString.filter(val => val !== undefined);
};
