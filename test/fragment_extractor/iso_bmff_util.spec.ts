import "mocha";
import { expect } from "chai";

import { findBoxByIndex, ISOBMFFUtil, findBoxByOffset } from "../../src/fragment_extractor/iso_bmff_util";
import { readTestSegment, FRAGMENTED_MP4, UNFRAGMENTED_MP4 } from "../helper.spec";

describe("ISOBMFFUtil", () => {

    describe("findBoxByIndex", () => {

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

    describe("findBoxByOffset", () => {
        it("should find moof in a unfragment mp4", (done) => {
            readTestSegment(FRAGMENTED_MP4)
            .then((data: ArrayBuffer) => {
                const moof = findBoxByOffset(data, 842);
                expect(moof).to.not.be.null;
                expect(moof.type).to.eql("moof");
                done();
            })
            .catch(err => console.log(err));
        });
    });

    it("should find ith fragment using sidx", (done) => {
        readTestSegment(FRAGMENTED_MP4)
            .then((data: ArrayBuffer) => {
                new ISOBMFFUtil(data)
                    .extractByType("sidx")
                    .parseBox();
                done();
            })
            .catch(err => console.log(err));
    });
});