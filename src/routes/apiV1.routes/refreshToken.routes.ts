import { Router } from 'express';
import refreshTokenController from '../../controllers/refreshToken.cotroller';

const refreshRouter = Router();

refreshRouter.get('/token', refreshTokenController);

export default refreshRouter;
