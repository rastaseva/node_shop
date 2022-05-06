import { NextFunction, Request, Response } from 'express';

import authService from '../../services/auth.service';

async function verifyEmailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.params;
    const verifiedUser = await authService.verifyEmail(token as string);
    if (verifiedUser.success) {
      res.status(200).json({ message: verifiedUser.message });
    } else {
      res.status(400).json({ message: verifiedUser.message });
    }
  } catch (e) {
    next(e);
  }
}

export default verifyEmailController;
