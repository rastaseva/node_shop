import { NextFunction, Request, Response, Router } from 'express';

const logoutRouter = Router();

logoutRouter.post(
  '/:userId/logout',
  (req: Request, res: Response, next: NextFunction) => {
    res.send(`Bye bye ${req.params.userId}`);
  }
);

export default logoutRouter;
