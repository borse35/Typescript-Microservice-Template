import { Request, Response, NextFunction } from "express-serve-static-core";

export type Err = any;
export type Req = Request;

export class Res extends Response {
  sendResponse(data: object, status?: number) {
    // @ts-ignore TODO: debug
    return this.status(status || 200).json({ data });
  }
}

export type Next = NextFunction;

export type ReqHandler = (req: Req, res: Res, next: Next) => any;

