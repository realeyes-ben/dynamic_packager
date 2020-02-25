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
        const ASSET_FRAGMENTED = resolve(WRITE_TO_PATH, MP4FRAGMENT_OUTPUT, ASSET);
        const tearsOfSteelMp4 = resolve(TEST_ASSETS_PATH, "unfragmented_mp4", ASSET);
        const baseMp4FragmentOptions: IMp4FragmentOptions = {
            debug: false,
            quiet: false,
            index: false,
            trim: false,
            noTFDT: false,
        };
        it.only("should successfully fragment an mp4 asset", (done) => {
            Bento4.mp4fragment(tearsOfSteelMp4, ASSET_FRAGMENTED, baseMp4FragmentOptions)
                .then((data) => {
                    console.log(data);
                    done();
                })
                .catch(err => {
                    console.log("ERROR");
                    console.log(err);
                    assert.fail(err);
                });
        });

        it("should reject fragmenting if it does not have an mp4 extension", () => {
            // Bento4.mp4fragment()
        });
    });
});
