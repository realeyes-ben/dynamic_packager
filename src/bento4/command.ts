import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export enum Commands {
    mp4dash = 'mp4dash',
    mp4fragment = 'mp4fragment',
}

export const command = (command: string, options?: string[]): Promise<ArrayBuffer> => {
    const spawnedProcess: ChildProcessWithoutNullStreams = spawn(command, options);

    return new Promise((resolve, reject) => {
        spawnedProcess.stdout.on('data', (data: ArrayBuffer) => {
            console.warn('Will resolve');
            console.log(JSON.stringify(data.toString()));
            resolve(data);
        });

        spawnedProcess.stderr.on('data', (data: ArrayBuffer) => {
            reject(data);
        });

        spawnedProcess.on('error', (err: Error) => {
            reject(err);
        });

        spawnedProcess.on('close', (code: number) => {
            console.log(`child process exited with code ${code}`);
        });
    });
};
