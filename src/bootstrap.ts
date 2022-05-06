import config from 'config';

import app from './app';

const PORT = Number(config.get('PORT')) || 3000;

process.on('SIGINT', () => {
  // Gracefully stop all the services
  app.stop();
  process.exit(0);
});
process.on('SIGTERM', () => {
  // Gracefully stop all the services
  app.stop();
  process.exit(0);
});

process.on('unhandledRejection', (error, p) => {
  console.error(error, 'Unhandled Rejection at Promise', p);
});
process.on('uncaughtException', (error) => {
  console.error(error);
  app.stop();
  process.exit(1);
});

// await untill all the staff started (db connection) and run
app.start(PORT);
