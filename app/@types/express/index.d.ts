import { Sequelize } from 'sequelize/types';

declare global {
  namespace Express {
    interface Request {
      /**
       * Sequlize con
       */
      con: Sequelize | null;
    }
  }
}
