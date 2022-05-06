import { NextFunction, Request, Response } from 'express';

import {
  AUTH_NOT_AUTHORIZED,
  AUTH_NOT_PERMITED,
  AUTH_NOT_VALID_TOKEN,
} from '../../consts/auth.const';
import {
  PRODUCT_CONTENT_IS_EMPTY,
  PRODUCT_SUCCESS,
} from '../../consts/product.const';
import productService from '../../services/product.service';
import tokenService from '../../services/token.services/token.service';

import RequestRejection from '../../models/RequestRejection.model';

const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate request
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new RequestRejection(401, AUTH_NOT_AUTHORIZED);
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new RequestRejection(403, AUTH_NOT_PERMITED);
    }
    const userData: any = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw new RequestRejection(403, AUTH_NOT_VALID_TOKEN);
    }
    if (!req.body) {
      throw new RequestRejection(400, PRODUCT_CONTENT_IS_EMPTY);
    }
    await productService.createProduct(
      req.body.name,
      req.body.slug,
      `${req.body.price}$`,
      req.body.description,
      req.file ? req.file.path : '',
      userData.userId
    );
    res.status(200).json({ message: PRODUCT_SUCCESS });
  } catch (e) {
    next(e);
  }
};

export default createProductController;
