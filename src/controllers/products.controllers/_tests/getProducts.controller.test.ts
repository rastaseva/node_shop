import { Request, Response } from 'express';

import {
  PRODUCT_NOT_FOUND,
  PRODUCT_SOMETHING_WENT_WRONG,
} from '../../../consts/product.const';
import productController from '../../products.controller';

const findProductMock = jest.fn();

jest.mock('../../../services/product.service', () => ({
  getProducts: () => findProductMock(),
}));

let mockResponse: Partial<Response>;

beforeEach(() => {
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
});

describe('getProducts controller works correctly', () => {
  const message = 'kek';
  const params = 'Jack';
  describe('should handle request without parameter', () => {
    const req = {};
    const jsonCall = {
      message,
    };
    test('should get response with statusCode 200', async () => {
      findProductMock.mockReturnValueOnce({ message });

      await productController.getProducts(
        req as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
    test('should get correct response', async () => {
      findProductMock.mockReturnValueOnce({ message });

      await productController.getProducts(
        req as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });
  describe('should handle parameter and return response correctly', () => {
    const req = { params: { params } };
    const jsonCall = {
      PRODUCT_SOMETHING_WENT_WRONG,
    };
    test('should get response with statusCode 200', async () => {
      findProductMock.mockReturnValueOnce({ PRODUCT_SOMETHING_WENT_WRONG });
      await productController.getProducts(req as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
    test('should get correct response', async () => {
      findProductMock.mockReturnValueOnce({ PRODUCT_SOMETHING_WENT_WRONG });
      await productController.getProducts(req as any, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });
  describe('should handle error correctly', () => {
    const req = { params: { params } };
    const jsonCall = {
      message: PRODUCT_NOT_FOUND,
    };
    test('should get response with statusCode 400', async () => {
      findProductMock.mockRejectedValueOnce(PRODUCT_SOMETHING_WENT_WRONG);
      await productController.getProducts(req as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
    test('should get correct response', async () => {
      findProductMock.mockRejectedValueOnce(PRODUCT_SOMETHING_WENT_WRONG);
      await productController.getProducts(req as any, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });
});
