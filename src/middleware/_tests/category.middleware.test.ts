import { NextFunction, Request, Response } from 'express';
import categoryMiddleware from '../category.middleware';

const slug = 'Slug_name';
const name = 'Name';

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

let next: NextFunction;

beforeEach(() => {
  next = jest.fn();
});

const runValidatorsChain = async (
  request: Request,
  chainArray: ((req: Request, res: Response, next: NextFunction) => void)[]
) => {
  await chainArray.reduce(async (promise, u) => {
    await promise;
    await u(request as Request, res as Response, next as NextFunction);
  }, Promise.resolve());
};

describe('category validator', () => {
  test('should pass valid request', async () => {
    const body = { name, slug };

    await runValidatorsChain({ body } as Request, categoryMiddleware.category);

    expect(next).toHaveBeenCalledTimes(categoryMiddleware.category.length);
  });
});
