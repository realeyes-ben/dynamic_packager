import 'mocha';
import { command } from '../../src/bento4/command';

describe('Command', () => {
    it('should successfully execute a command process with no options', done => {
        command('ls').then(() => done());
    });

    it('should successfully execute a command process with options', done => {
        command('ls', ['-la']).then(() => done());
    });

    it('should fail to execute command with wrong options', done => {
        command('ls', ['-j']).catch(() => done());
    });

    it('should fail to execute non existing command', done => {
        command('shouldnt work').catch(() => done());
    });
});
