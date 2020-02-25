import "mocha";
import { expect, assert } from "chai";
import { resolve } from "path";

import { WRITE_TO_PATH, UNFRAGMENTED_MP4 } from "../helper.spec";
import { Bento4 } from "../../src/bento4/bento4";
import { IMp4FragmentOptions, TrackType } from "../../src/bento4/bento4_util";

describe("Bento4", () => {
    describe("mp4fragment", () => {

        const VIDEO_WRITE_DESTINATION = resolve(WRITE_TO_PATH, "video_mp4fragment.mp4");
        const AUDIO_WRITE_DESTINATION = resolve(WRITE_TO_PATH, "audio_mp4fragment.mp4");
        const baseMp4FragmentOptions: IMp4FragmentOptions = {
            debug: false,
            quiet: false,
            index: true,
            trim: false,
            noTFDT: false,
            track: TrackType.VIDEO,
        };
        it("should successfully fragment an mp4 asset into video and audio", (done) => {
            const promises = [
                Bento4.mp4fragment(UNFRAGMENTED_MP4, VIDEO_WRITE_DESTINATION, baseMp4FragmentOptions),
                Bento4.mp4fragment(UNFRAGMENTED_MP4, AUDIO_WRITE_DESTINATION, {...baseMp4FragmentOptions, track: TrackType.AUDIO})
            ];
            Promise.all(promises)
                .then(() => done())
                .catch(err => {
                    console.log(err);
                    return assert.fail(err);
                });
        });

        it("should catch when wrong input is specified", (done) => {
            Bento4.mp4fragment("./wrong", VIDEO_WRITE_DESTINATION, baseMp4FragmentOptions)
                .then(() => {
                    assert.fail("Successfully fragmented. Should have failed");
                })
                .catch(() => done());
        });
    });
});

//mp4fragment --track 'video' /Users/bentoofer/Developer/dynamic_packager/test_assets/unfragmented_mp4/tears_of_steel_teaser.mp4 /Users/bentoofer/Developer/dynamic_packager/test/tmp/mp4fragment.mp4
