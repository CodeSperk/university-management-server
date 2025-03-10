import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (reason) => {
  console.log(`Unhandled Recection is deleted, shutting down..., ${reason}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error('Test unhandled rejection'));

process.on('uncaughtException', (reason) => {
  console.log(`unhandledRejection is detected, shutting down..., ${reason}`);
});
