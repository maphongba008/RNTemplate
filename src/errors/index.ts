export class BaseError extends Error {
  code = -1;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
