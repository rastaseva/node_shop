import { NextFunction, Request, Response } from 'express';

import {
  AUTH_NOT_AUTHORIZED,
  AUTH_NOT_PERMITED,
  AUTH_NOT_VALID_TOKEN,
} from '../../../consts/auth.const';
import {
  PRODUCT_CONTENT_IS_EMPTY,
  PRODUCT_SOMETHING_WENT_WRONG,
  PRODUCT_SUCCESS,
} from '../../../consts/product.const';
import createProductController from '../createProduct.controller';

const createProductMock = jest.fn();

jest.mock('../../../services/product.service', () => ({
  createProduct: () => createProductMock(),
}));

const validateAccessTokenMock = jest.fn();

jest.mock('../../../services/token.services/token.service', () => ({
  validateAccessToken: () => validateAccessTokenMock(),
}));
const next: NextFunction = jest
  .fn()
  .mockImplementation((...args) => args.length);

describe('product controller verify request and responce', () => {
  test('throw RequestRejection with correct status and message if request is empty', async () => {
    const correctStatus = 401;
    const correctMessage = AUTH_NOT_AUTHORIZED;
    const mockRequest: Partial<Request> = {
      headers: {
        authorization: '',
      },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await createProductController(
      mockRequest as Request,
      mockResponse as Response,
      next
    );
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });
  test('throw RequestRejection with correct status and message if request header is invalid', async () => {
    const correctStatus = 403;
    const correctMessage = AUTH_NOT_PERMITED;
    const mockRequest: Partial<Request> = {
      headers: {
        authorization: ' ',
      },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await createProductController(
      mockRequest as Request,
      mockResponse as Response,
      next
    );
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });
  test('throw RequestRejection with correct status and message if accessToken is invalid', async () => {
    validateAccessTokenMock.mockImplementationOnce(() => null);
    const correctStatus = 403;
    const correctMessage = AUTH_NOT_VALID_TOKEN;
    const mockRequest: Partial<Request> = {
      headers: {
        authorization: 'Bearer accessToken',
      },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await createProductController(
      mockRequest as Request,
      mockResponse as Response,
      next
    );
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('Should return status 400 if request is empty', async () => {
    const correctStatus = 400;
    const correctMessage = PRODUCT_CONTENT_IS_EMPTY;
    validateAccessTokenMock.mockImplementationOnce(() => 'accessToken');
    const mockRequest: Partial<Request> = {
      headers: {
        authorization: 'Bearer accessToken',
      },
      body: null,
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await createProductController(
      mockRequest as Request,
      mockResponse as Response,
      next
    );
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('Should create a product', async () => {
    const product = {
      name: 'Notebook',
      slug: 'Asus_Notebook',
      price: '120$',
      description: 'Asus Notebook Company',
      image: ' ',
      author: ' ',
    };
    validateAccessTokenMock.mockImplementationOnce(() => 'accessToken');
    createProductMock.mockImplementationOnce(() => product);
    const mockRequest = (body: any) => ({
      headers: {
        authorization: 'Bearer accessToken',
      },
      body,
    });
    const req = mockRequest(product);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await createProductController(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  test('Should call next if error occurs', async () => {
    const category = {
      name: 'Notebook',
      slug: 'Asus_Notebook',
      price: '120$',
      description: 'Asus Notebook Company',
      image: ' ',
      author: ' ',
    };
    const mockRequest = (body: any) => ({
      body,
    });
    const req = mockRequest(category);
    const res: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
      json: jest.fn().mockReturnThis(),
    };

    await createProductController(req as Request, res as Response, next);

    expect(next).toReturnWith(1);
  });
});
