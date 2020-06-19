import { Model, DataTypes } from 'sequelize';
import { Database } from '../config/database';
const sequelize = Database.getInstance().connect();

export interface ICinema {
  name: string;
  address: string;
}

export class Cinema extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
}

Cinema.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(100),
    },
    address: {
      type: new DataTypes.STRING(100),
    },
  },
  { sequelize, tableName: 'cinemas' }
);
