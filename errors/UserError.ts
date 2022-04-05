class ReqHandlerError extends Error {
  resCode: number = 200
}

export class UserError extends ReqHandlerError {
  constructor(msg: string, resCode = 500) {
    super(msg);
    this.resCode = resCode;

    return this;
  }
};