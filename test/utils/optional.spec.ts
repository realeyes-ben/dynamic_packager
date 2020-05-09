
import "mocha";
import { expect, assert } from "chai";

import { Optional } from "../../src/utils/optional";

describe("Optional", () => {
  it("should map values", (done) => {
    Optional.of(5)
    .map(val => val * 2)
    .map(val => `${val}`)
    .unwrap()
    .then(
      (val) => {
        expect(val).to.eql("10");
        done();
      },
      () => {
        assert.fail("should not have thrown an error");
      });
  });

  it("should throw an error", (done) => {
    Optional.of<number>(undefined)
      .map(val => val * 2)
      .map(val => `${val}`)
      .unwrap()
      .then(
        () => {
          assert.fail("should not have returned a value");
        },
        (err) => {
          expect(err).to.be.instanceOf(Error);
          done();
        });
  });
});