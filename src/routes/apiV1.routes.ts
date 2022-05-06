import { Request, Response, Router } from 'express';

import Product from '../models/product.model';
import authRouter from './apiV1.routes/auth.routes';
import categoriesRouter from './apiV1.routes/categories.routes';
import productsRouter from './apiV1.routes/products.routes';
import refreshRouter from './apiV1.routes/refreshToken.routes';
import userRouter from './apiV1.routes/user.routes';

const apiV1 = Router();

apiV1.use('/users', userRouter);
apiV1.use('/auth', authRouter);
apiV1.use('/refresh', refreshRouter);
apiV1.use('/categories', categoriesRouter);
apiV1.use('/products', productsRouter);
apiV1.get('/', (req: Request, res: Response) => {
  res.send('Hello api v1');
});
export default apiV1;
