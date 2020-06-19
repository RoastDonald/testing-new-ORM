require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import { Database } from './config/database';

import SessionController from './routes/Session';
import MovieController from './routes/Movie';
import CinemaController from './routes/Cinema';

export class Server {
  public static PORT = 8080;
  private static instance: Server | null = null;
  private static db = Database.getInstance();
  private app: express.Application;

  public static getInstance(): Server {
    if (this.instance) {
      return this.instance;
    } else {
      return new Server();
    }
  }

  public start(): void {
    this.middlewares();
    this.routes();
    this.handleEvents();
    this.app.listen(Server.PORT, () => {
      console.log(`server is up on ${Server.PORT}`);
    });
  }

  private constructor() {
    this.app = express();
    Server.db.connect();
    this.handleEvents();
  }

  private handleEvents(): void {
    process.on('exit', () => {
      Server.db.disconnect();
    });
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const database = Server.db;
      req.con = database.con;
      next();
    });
  }
  private routes(): void {
    this.app.use('/api/sessions', new SessionController().router);
    this.app.use('/api/movies', new MovieController().router);
    this.app.use('/api/cinemas', new CinemaController().router);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ status: 'fail', msg: 'no such endpoint' });
    });
    Server.db.con.sync();
  }
}
