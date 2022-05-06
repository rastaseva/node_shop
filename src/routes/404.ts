import { NextFunction, Request, Response, Router } from 'express';

const notFoundRouter = Router();

notFoundRouter.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

export default notFoundRouter;
