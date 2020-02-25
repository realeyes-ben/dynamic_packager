import "mocha";
import { expect } from "chai";

import { findBoxByIndex, ISOBMFFUtil } from "../../src/fragment_extractor/iso_bmff_util";
import { readTestSegment, FRAGMENTED_MP4, UNFRAGMENTED_MP4 } from "../helper.spec";

describe("ISOBMFFUtil", () => {

    describe("findBox", () => {

        it("should find sidx in a fragmented mp4", (done) => {
            readTestSegment(FRAGMENTED_MP4)
            .then((data: ArrayBuffer) => {
                const sidx = findBoxByIndex("sidx", data);
                expect(sidx).to.not.be.null;
                expect(sidx.type).to.eql("sidx");
                done();
            })
            .catch(err => console.log(err));

        });

        it("should not find sidx in a unfragment mp4", (done) => {
            readTestSegment(UNFRAGMENTED_MP4)
                .then((data: ArrayBuffer) => {
                    const sidx = findBoxByIndex("sidx", data);
                    expect(sidx).to.be.null;
                    done();
                })
                .catch(err => console.log(err));

        });
    });
});