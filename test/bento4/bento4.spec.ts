import "mocha";
import { expect, assert } from "chai";
import { resolve } from "path";

import { TEST_ASSETS_PATH, WRITE_TO_PATH } from "../helper.spec";
import { Bento4 } from "../../src/bento4/bento4";
import { IMp4FragmentOptions } from "../../src/bento4/bento4_util";

describe("Bento4", () => {
    describe("mp4fragment", () => {
        const MP4FRAGMENT_OUTPUT = "mp4_fragment";
        const ASSET = "tears_of_steel_teaser.mp4";

        const ASSET_FRAGMENTED = resolve(WRITE_TO_PATH, ASSET);
        const tearsOfSteelMp4 = resolve(TEST_ASSETS_PATH, "unfragmented_mp4", ASSET);
        const baseMp4FragmentOptions: IMp4FragmentOptions = {
            debug: false,
            quiet: false,
            index: false,
            trim: false,
            noTFDT: false,
        };
        it("should successfully fragment an mp4 asset", (done) => {
            Bento4.mp4fragment(tearsOfSteelMp4, ASSET_FRAGMENTED, baseMp4FragmentOptions)
                .then(() => done())
                .catch(err => assert.fail(err));
        });

        it("should catch when wrong input is specified", (done) => {
            Bento4.mp4fragment("./wrong", ASSET_FRAGMENTED, baseMp4FragmentOptions)
                .then(() => {
                    assert.fail("Successfully fragmented. Should have failed");
                })
                .catch(() => done());
        });
    });
});
