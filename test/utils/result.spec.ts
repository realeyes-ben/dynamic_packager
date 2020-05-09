import "mocha";
import { expect } from "chai";

import { Result } from "../../src/utils/result";

describe("Result", () => {

  it("should return the value", () => {
    const result = Result.of(5)
    .then(
      (val) => {
      return val;
    },
    (err) => {
      return 0;
    });

    expect(result).to.eql(5);
  });

  it("should return the error value", () => {
    const result = Result.of<number>(new Error("ERROR"))
      .then(
        (val) => {
          return val;
        },
        (err) => {
          return 0;
        });

    expect(result).to.eql(0);
  });
});