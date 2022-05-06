import { Request, Response } from 'express';
import { mock } from 'sinon';

import {
  PRODUCT_NOT_FOUND,
  PRODUCT_SOMETHING_WENT_WRONG,
} from '../../../consts/product.const';
import productController from '../../products.controller';

const getFilteredProductMock = jest.fn();

jest.mock('../../../services/product.service', () => ({
  getFilteredProducts: () => getFilteredProductMock(),
}));
let mockResponse: Partial<Response>;

beforeEach(() => {
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
});

describe('getFilteredProducts controller works correctly', () => {
  const message = 'kek';
  describe('should handle valid parameter', () => {
    const req = { params: { productLetter: 'K' } };
    const jsonCall = {
      message,
    };
    test('statusCode should be 200', async () => {
      getFilteredProductMock.mockReturnValueOnce({ message });

      await productController.getFilteredProducts(
        req as any,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    test('response should be valid', async () => {
      getFilteredProductMock.mockReturnValueOnce({ message });

      await productController.getFilteredProducts(
        req as any,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });

  describe('should handle request without parameter and return correct response', () => {
    const req = {};
    const jsonCall = {
      message: PRODUCT_SOMETHING_WENT_WRONG,
    };
    test('should get response with statusCode 400', async () => {
      await productController.getFilteredProducts(
        req as any,
        mockResponse as Response
      );

      getFilteredProductMock
        .mockReturnValueOnce(PRODUCT_SOMETHING_WENT_WRONG)
        .mockReturnValue(PRODUCT_SOMETHING_WENT_WRONG);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
    test('should get correct response', async () => {
      await productController.getFilteredProducts(
        req as any,
        mockResponse as Response
      );

      getFilteredProductMock
        .mockReturnValueOnce(PRODUCT_SOMETHING_WENT_WRONG)
        .mockReturnValue(PRODUCT_SOMETHING_WENT_WRONG);
      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });

  describe('should handle request with invalid parameter', () => {
    const req = { params: { productLetter: '1' } };
    test('should get correct statusCode', async () => {
      await productController.getFilteredProducts(
        req as any,
        mockResponse as Response
      );

      getFilteredProductMock.mockResolvedValueOnce({
        PRODUCT_NOT_FOUND,
      });

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
    test('should get correct response', async () => {
      await productController.getFilteredProducts(
        req as any,
        mockResponse as Response
      );

      getFilteredProductMock.mockResolvedValueOnce({
        PRODUCT_NOT_FOUND,
      });

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'No such product',
      });
    });
  });
});
