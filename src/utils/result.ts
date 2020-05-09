
export class Result<T, E extends Error = Error> {

  public static of<U, E extends Error = Error>(val: U | E): Result<U, E> {
    return new Result<U,E>(val);
  }
  constructor(private val: T | E) {

  }

  public then<U, V>(thenHandler: ((val: T) => U ), errorHandler: ((err: E) => V)): U | V {

    if (!(this.val instanceof Error)) {
        return thenHandler(this.val);
    } else {
        return errorHandler(this.val);
    }
  }
}