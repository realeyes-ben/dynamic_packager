import "mocha";
import { expect } from "chai";

import { command, generateOptions } from "../../src/command/command";
import { FragmentCommandOptionsMap, mp4fragmentOptionsMap, IMp4FragmentOptions, TrackType } from "../../src/bento4/bento4_util";

describe("Command Module", () => {

    describe("command", () => {
        it("should successfully execute a command process with no options", done => {
            command("ls").then(() => done());
        });

        it("should successfully execute a command process with options", done => {
            command("ls", ["-la"]).then(() => done());
        });

        it("should fail to execute command with wrong options", done => {
            command("ls", ["-j"]).catch(() => done());
        });

        it("should fail to execute non existing command", done => {
            command("shouldnt work").catch(() => done());
        });
    });

    describe("generateOptions", () => {
        const fragmentCommandOptionGenerator = generateOptions<mp4fragmentOptionsMap, IMp4FragmentOptions>(FragmentCommandOptionsMap);

        it("should generate base options", () => {
            const baseOptions: IMp4FragmentOptions = {
                debug: true,
                quiet: true,
                index: true,
                trim: true,
                noTFDT: true,
                forceIFrameSync: "auto",
                verbosity: 0,
            };
            expect(fragmentCommandOptionGenerator(baseOptions)).to.eql([
                "--debug",
                "--quiet",
                "--index",
                "--trim",
                "--no-tfdt",
                "--force-i-frame-sync auto",
                "--verbosity 0"
            ]);
        });

        it("should generate custom options", () => {
            const extraOptions: IMp4FragmentOptions = {
                debug: false,
                quiet: false,
                index: false,
                trim: false,
                noTFDT: false,
                forceIFrameSync: "auto",
                verbosity: 0,
                track: TrackType.VIDEO,
                timescale: 90000,
                duration: 2002,
            };
            expect(fragmentCommandOptionGenerator(extraOptions)).to.eql([
                "--force-i-frame-sync auto",
                "--verbosity 0",
                "--track video",
                "--timescale 90000",
                "--fragment-duration 2002"
            ]);
        });

        it("should generate no options", () => {
            const extraOptions: IMp4FragmentOptions = {
                debug: false,
                quiet: false,
                index: false,
                trim: false,
                noTFDT: false,
            };
            expect(fragmentCommandOptionGenerator(extraOptions)).to.eql([]);
        });
    });
});
