import { NextFunction, Request, Response } from 'express';

import {
  APP_STATUSCHECK_FAILURE_MESSAGE,
  APP_STATUSCHECK_SUCCESS_MESSAGE,
} from '../../consts/general.const';

import emailerService from '../../services/emailer.service';
import logger from '../../libs/logger';
import sequelize from '../../db/db.config';

const statusCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailerCheck = await emailerService.statusCheck();

    let dbCheck;

    try {
      await sequelize.authenticate();
      dbCheck = true;
    } catch (e) {
      logger.error('DataBase connection failed', e);
      dbCheck = false;
    }

    console.log('=======================================');

    console.log(emailerCheck);
    console.log(dbCheck);

    if (emailerCheck && dbCheck) {
      res.status(200).json({ message: APP_STATUSCHECK_SUCCESS_MESSAGE });
      return;
    }

    res.status(200).json({ message: APP_STATUSCHECK_FAILURE_MESSAGE });
  } catch (e) {
    logger.error('Statuscheck failed', e);
    next(e);
  }
};

export default statusCheck;
