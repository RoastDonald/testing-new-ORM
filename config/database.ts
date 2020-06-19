import { Sequelize } from 'sequelize';

import config from './sql-conf';
console.log(config);

abstract class AbstractDatabase {
  abstract connect(): void | never;
  abstract disconnect(): void | never;
}

export class Database extends AbstractDatabase {
  public static instance: Database;
  public con!: Sequelize;

  public static getInstance(): Database {
    if (this.instance) {
      return this.instance;
    } else {
      return new Database();
    }
  }

  public connect = (): Sequelize => {
    if (this.con) return this.con;
    try {
      this.con = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        {
          dialect: 'mysql',
          host: config.db.host,
          define: {
            timestamps: false,
          },
          dialectOptions: {
            multipleStatements: true,
          },
        }
      );
      this.con
        .authenticate()
        .then(() => console.log('db connected'))
        .catch((e) => console.error(e));

      return this.con;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  };

  public disconnect = (): void | never => {
    this.con.close();
  };
}
