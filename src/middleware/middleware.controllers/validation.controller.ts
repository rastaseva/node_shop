import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import RequestRejection from '../../models/RequestRejection.model';

import { FORM_INVALID_FIELDS } from '../../consts/form.const';

const validationController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const details = errors.array({ onlyFirstError: true }).map((u) => u.msg);

      const errorMessage = FORM_INVALID_FIELDS;
      const status = 400;

      throw new RequestRejection(status, errorMessage, {
        details,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validationController;
