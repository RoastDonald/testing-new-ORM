import { Model, DataTypes } from 'sequelize';
import { Database } from '../config/database';
const sequelize = Database.getInstance().connect();

export interface IMovie {
  id: string;
  title: string;
  release_date: Date;
}

export class Movie extends Model {
  public id!: number;
  public title!: string;
  public release_date!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(100),
    },
    release_date: {
      type: new DataTypes.STRING(100),
    },
  },
  { sequelize, tableName: 'movies' }
);
