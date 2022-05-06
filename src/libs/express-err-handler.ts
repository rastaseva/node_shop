import { NextFunction, Request, Response } from 'express';

export default (fn: { (): void | any; (arg1: any, arg2: any): void | any }) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn).catch(next);
