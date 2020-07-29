import "mocha";
import { expect, assert } from "chai";

import { findBoxByIndex, findByOffset, ISOBMFFContainer, ISOBMFFUtil } from "../../src/isobmff/iso_bmff_util";
import { readTestSegment, VIDEO_FRAGMENTED_MP4, UNFRAGMENTED_MP4 } from "../helper.spec";
import { ISIDX } from "../../src/isobmff/boxes/sidx";
import { IBox } from "../../src/isobmff/boxes/box";
import { Optional } from "../../src/utils/optional";

const validateFragment = (fragment: IBox): void => {
  let fragmentSize = 0;
  // Look for moof
  Optional.of(
    findBoxByIndex("moof", fragment.dv.buffer, 0)
  ).unwrap()
  .then(
    (moof) => {
      expect(moof.type).to.eql("moof");
      expect(moof.getAbsoluteOffset()).to.eql(fragment.dv.byteOffset);
      fragmentSize += moof.size;
    },
    (err) => {
      console.warn(err);
    }
  );

  // Look for mdat
  Optional.of(
    findBoxByIndex("mdat", fragment.dv.buffer, 0)
  ).unwrap()
  .then(
    (mdat) => {
      fragmentSize += mdat.size;
    },
    (err) => {
      console.warn(err);
    }
  );
  console.warn(`FS: ${fragmentSize}`);
  console.warn(`${fragment.size}`);
};

describe("ISOBMFFUtil", () => {

    describe("findBoxByIndex", () => {

        it("should find sidx in a fragmented mp4", (done) => {
            readTestSegment(VIDEO_FRAGMENTED_MP4)
            .then((data: ArrayBuffer) => {
                const sidx = findBoxByIndex("sidx", data);
                expect(sidx).to.not.be.undefined;
                expect(sidx?.type).to.eql("sidx");
                done();
            })
            .catch(err => console.log(err));
        });

        it("should not find sidx in a unfragment mp4", (done) => {
            readTestSegment(UNFRAGMENTED_MP4)
            .then((data: ArrayBuffer) => {
                const sidx = findBoxByIndex("sidx", data);
                expect(sidx).to.be.undefined;
                done();
            })
            .catch(err => console.log(err));
        });
    });

    describe("findByOffset", () => {
        it("should find moof in a unfragment mp4", (done) => {
            readTestSegment(VIDEO_FRAGMENTED_MP4)
            .then((data: ArrayBuffer) => {
                const moof = findByOffset(data, 842);
                expect(moof).to.not.be.undefined;
                expect(moof?.type).to.eql("moof");
                done();
            })
            .catch(err => console.log(err));
        });
    });

    it("should parse the sidx", (done) => {
      readTestSegment(VIDEO_FRAGMENTED_MP4)
          .then((data: ArrayBuffer) => {
            Optional.of(
              ISOBMFFContainer
              .fromBuffer(data)
              .getValue()
              )
              .map(ISOBMFFUtil.extractSIDX)
              .map<ISIDX>((box: IBox) => ISOBMFFUtil.parseBox<ISIDX>(box))
              .unwrap()
              .then(
                (sidx) =>{
                  expect(sidx.type).to.eql("sidx");
                  expect(sidx.references.length).to.eql(8);
                  expect(sidx.timescale).to.eql(24);
                  expect(sidx.version).to.eql(0);
                  expect(sidx.earliestPresentationTime).to.eql(0);
                  done();
                },
                (err) => {
                  assert.fail(err);
                }
              );
          })
          .catch(err => console.log(err));
    });

    it("should find ith fragment using sidx", (done) => {
      readTestSegment(VIDEO_FRAGMENTED_MP4)
        .then((data: ArrayBuffer) => {
          const mediaFile = ISOBMFFContainer.fromBuffer(data).getValue();
          Optional.of(mediaFile)
              .map(ISOBMFFUtil.extractSIDX)
              .map((box: IBox) => ISOBMFFUtil.parseBox<ISIDX>(box))
              .unwrap()
              .then(
                (sidx) => {
                  const offset = sidx.getAbsoluteOffset() + sidx.size + sidx.firstOffset;
                  const numOfReferences = sidx.references.length;
                  for (let i = 0; i < numOfReferences; i++) {
                    const reference = sidx.references[i];
                    Optional.of(mediaFile)
                    .map((box) => ISOBMFFUtil.extractByOffset(box, offset, reference.referenceSize))
                    .unwrap()
                    .then(
                      (fragment) => {
                        validateFragment(fragment);
                      },
                      (err) => {
                        assert.fail(err);
                      }
                    );
                  }
                  done();
                },
                (err) => {
                  assert.fail(err);
                }
              );
        })
        .catch(err => console.log(err));
    });
});