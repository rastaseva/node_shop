import { NextFunction, Request, Response } from 'express';

import { CATEGORY_SOMETHING_WENT_WRONG } from '../../../consts/category.const';
import categoriesController from '../../categories.controller';

const findCategoryMock = jest.fn();

jest.mock('../../../services/category.service', () => ({
  getCategory: () => findCategoryMock(),
}));

let mockResponse: Partial<Response>;
const next: NextFunction = jest
  .fn()
  .mockImplementation((...args) => args.length);

beforeEach(() => {
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
});

describe('controller works', () => {
  const message = 'message';
  const params = '2';

  test('should handle request without parameter', async () => {
    const req = {};

    await categoriesController.getCategory(
      req as Request,
      mockResponse as Response,
      next
    );

    expect(next).toReturnWith(1);
  });

  test('should handle invalid parameter', async () => {
    findCategoryMock.mockReturnValueOnce(null);
    const req = { params: {} };
    await categoriesController.getCategory(
      req as any,
      mockResponse as Response,
      next
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'No such category',
    });
  });

  test('should handle valid parameter', async () => {
    findCategoryMock.mockReturnValueOnce({ message });
    const req = { params: { params } };
    const jsonCall = {
      message,
    };
    await categoriesController.getCategory(
      req as any,
      mockResponse as Response,
      next
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
  });
});
