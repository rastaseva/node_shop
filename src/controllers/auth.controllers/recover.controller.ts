import { NextFunction, Request, Response } from 'express';
import config from 'config';

import {
  AUTH_RECOVERY_FAILURE,
  AUTH_RECOVERY_SUCCESS,
} from '../../consts/auth.const';
import { USER_NOT_FOUND } from '../../consts/user.const';
import RequestRejection from '../../models/RequestRejection.model';
import User from '../../models/user.model';
import authService from '../../services/auth.service';
import emailerService from '../../services/emailer.service';

const recoverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.isActive) {
      throw new RequestRejection(400, USER_NOT_FOUND);
    }

    const recoverToken = await authService.getRecoverToken();
    user.recoverToken = recoverToken;
    await user.save();

    const emailSubject = 'There is your account recovery link';

    const verifyLink = `http://localhost:${config.get(
      'PORT'
    )}/api/v1/auth/recover/${recoverToken}`;

    const emailText = `Visit ${verifyLink} to recover your account`;
    const emailHtml = `
    <p>Visit <a href=${verifyLink}>${verifyLink}</a> to recover your account</p>
    `;
    const emailerResponse = await emailerService.sendEmail(
      email,
      emailSubject,
      emailText,
      emailHtml
    );

    if (emailerResponse.accepted.includes(email)) {
      res.status(200).json({ message: AUTH_RECOVERY_SUCCESS });
      return;
    }

    throw new RequestRejection(500, AUTH_RECOVERY_FAILURE);
  } catch (e) {
    // handling error or reject
    next(e);
  }
};

export default recoverController;
