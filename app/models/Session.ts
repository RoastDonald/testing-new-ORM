import { Model, DataTypes } from 'sequelize';
import { Database } from '../config/database';
import { Movie } from './Movie';
import { Cinema } from './Cinema';

const sequelize = Database.getInstance().connect();

export interface ISession {
  movie_id: number;
  cinema_id: number;
  price: number;
  date: Date;
}

export class Session extends Model {
  public id!: number;
  public movie_id!: number;
  public cinema_id!: number;
  public price!: number;
  public date!: Date;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
    },
    cinema_id: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: 'sessions' }
);

Movie.belongsTo(Session, { targetKey: 'id', onDelete: 'CASCADE' });
Cinema.belongsTo(Session, { targetKey: 'id', onDelete: 'CASCADE' });

Session.hasOne(Movie, { sourceKey: 'movie_id', foreignKey: 'movie_id_fk' });
Session.hasOne(Cinema, { sourceKey: 'cinema_id', foreignKey: 'cinema_id_fk' });
