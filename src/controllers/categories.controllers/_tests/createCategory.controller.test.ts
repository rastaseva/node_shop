import { NextFunction, Request, Response } from 'express';

import createCategoryController from '../createCategory.controller';

jest.mock('../../../services/category.service', () => ({
  createCategory: () => ({
    name: 'NoteBook',
    slug: 'Asus-NoteBook',
  }),
}));

const next: NextFunction = jest
  .fn()
  .mockImplementation((...args) => args.length);

describe('category controller verify request and responce', () => {
  test('should get 400 if request is empty', async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await createCategoryController(
      mockRequest as Request,
      mockResponse as Response,
      next
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  test('Should create a category', async () => {
    const category = {
      name: 'NoteBook',
      slug: 'Asus-NoteBook',
    };
    const mockRequest = (body: any) => ({
      body,
    });
    const req = mockRequest(category);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await createCategoryController(req as Request, res as Response, next);
    expect(req.body).toEqual({
      name: 'NoteBook',
      slug: 'Asus-NoteBook',
    });
  });
  test('Should call next if error occurs', async () => {
    const category = {
      name: 'NoteBook',
      slug: 'Asus-NoteBook',
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

    await createCategoryController(req as Request, res as Response, next);

    expect(next).toReturnWith(1);
  });
});
