import { NextFunction, Request, Response } from 'express';

import RequestRejection from '../../models/RequestRejection.model';

import { SOMETHING_WENT_WRONG } from '../../consts/general.const';
import logger from '../../libs/logger';

export default (
  trigger: Error | RequestRejection,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultMessage = SOMETHING_WENT_WRONG;
  const defaultStatus = 500;

  if (trigger instanceof RequestRejection) {
    logger.warn(trigger.message, trigger);
  } else {
    logger.error(trigger.message, trigger);
  }

  const requestRejection =
    trigger instanceof RequestRejection
      ? trigger
      : new RequestRejection(defaultStatus, defaultMessage);

  const { status, message, statusText, details } = requestRejection;

  const responseJSON = {
    statusText,
    message,
    details,
  };

  res.status(status).json(responseJSON);
};
