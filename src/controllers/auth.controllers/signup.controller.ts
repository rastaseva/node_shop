import { NextFunction, Request, Response } from 'express';
import config from 'config';

import authService from '../../services/auth.service';
import emailerService from '../../services/emailer.service';

import {
  AUTH_SIGNUP_EMAIL_USED,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNUP_SUCCESS,
} from '../../consts/auth.const';
import { EMAILER_INVALID_EMAIL } from '../../consts/emailer.const';
import { SOMETHING_WENT_WRONG } from '../../consts/general.const';
import RequestRejection from '../../models/RequestRejection.model';

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const name = req.body.name || 'Stranger';

    const isEmailValid = await emailerService.validateEmail(email);

    if (!isEmailValid) {
      throw isEmailValid === null
        ? new RequestRejection(500, SOMETHING_WENT_WRONG)
        : new RequestRejection(422, EMAILER_INVALID_EMAIL);
    }

    const newUser = await authService.signup(name, email, password);

    if (!newUser) {
      throw new RequestRejection(409, AUTH_SIGNUP_EMAIL_USED);
    }

    // emailer start
    const emailSubject = 'There is your account verification link';

    const verifyLink = `http://localhost:${config.get(
      'PORT'
    )}/api/v1/auth/verify/${newUser.verifyToken}`;

    const emailText = `Visit ${verifyLink} to verify your account`;
    const emailHtml = `
    <p>Visit <a href=${verifyLink}>${verifyLink}</a> to verify your account</p>
    `;
    const emailerResponse = await emailerService.sendEmail(
      email,
      emailSubject,
      emailText,
      emailHtml
    );

    if (emailerResponse.accepted.includes(email)) {
      res.status(201).json({ message: AUTH_SIGNUP_SUCCESS });
      return;
    }
    // emailer end
    throw new RequestRejection(500, AUTH_SIGNUP_FAILURE);
  } catch (e) {
    // handling error or reject
    next(e);
  }
};

export default signupController;
