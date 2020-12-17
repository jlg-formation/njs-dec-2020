import express from 'express';
import http from 'http';
import serveIndex from 'serve-index';
import cors from 'cors';
import {ws} from './ws-pg';
import {Client} from 'pg';
import {db1} from '../database.json';

export class Server {
  client = new Client(db1);
  server!: http.Server;
  app: express.Express;
  constructor(public port = 3000) {
    const app = express();
    const www = 'public';

    app.use(cors() as never);

    app.use((req, rep, next) => {
      //   console.log('req.url: ', req.url);
      next();
    });

    app.use('/ws', ws(this.client));

    app.use(express.static(www));
    app.use(serveIndex(www));
    this.app = app;
  }

  start() {
    this.client.connect();
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(this.port, () => {
        resolve();
      });
      this.server.on('error', err => {
        reject(err);
      });
    });
  }

  stop() {
    this.client.end();
    return new Promise<void>(resolve => {
      this.server.close(() => {
        resolve();
      });
    });
  }
}
