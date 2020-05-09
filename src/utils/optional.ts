import { Result } from "./result";

export class Optional<T> {

  public static of<T>(val?: T): Optional<T> {
    return new Optional<T>(val);
  }

  public map<O>(fn: (v: T) => O | undefined ): Optional<O> {
    return this.value === undefined ? Optional.of<O>(undefined) : Optional.of<O>(fn(this.value));
  }

  private constructor(private value: T | undefined) {}

  public unwrap(): Result<T> {
    return this.value === undefined ? Result.of<T>(new Error("value is undefined")) : Result.of<T>(this.value);
  }
}
