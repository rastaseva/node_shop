import { Server } from 'http';
import express, { Application } from 'express';

import morgan from 'morgan';

import cookieParser from 'cookie-parser';

import apiV1 from './routes/apiV1.routes';
import appController from './controllers/app.controller';
import logger from './libs/logger';
import notFoundRouter from './routes/404';
import requestController from './controllers/request.controller';
import sequelize from './db/db.config';

const app: Application = express();
let server: Server;

// middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('common'));
app.use(cookieParser());

// routes
app.get('/healthcheck', appController.statusCheck);
app.use('/api/v1', apiV1);
app.use(requestController.reject);
app.use(notFoundRouter);

export default {
  start(port: number) {
    server = app.listen(port, async () => {
      try {
        await sequelize.sync();
      } catch (error) {
        logger.error('Unable to connect to the database:', error);
      }
      logger.info(`Server is listening on ${port} port`);
    });
    return server;
  },
  stop(cb?: (err?: Error) => void): Server {
    logger.info(`\nTrying to close the server..\n`);
    return server.close(cb);
  },
};
