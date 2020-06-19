"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Movie_1 = require("./Movie");
const Cinema_1 = require("./Cinema");
const sequelize = database_1.Database.getInstance().connect();
class Session extends sequelize_1.Model {
}
exports.Session = Session;
Session.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cinema_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
    },
}, { sequelize, tableName: 'sessions' });
Movie_1.Movie.belongsTo(Session, { targetKey: 'id', onDelete: 'CASCADE' });
Cinema_1.Cinema.belongsTo(Session, { targetKey: 'id', onDelete: 'CASCADE' });
Session.hasOne(Movie_1.Movie, { sourceKey: 'movie_id', foreignKey: 'movie_id_fk' });
Session.hasOne(Cinema_1.Cinema, { sourceKey: 'cinema_id', foreignKey: 'cinema_id_fk' });
//# sourceMappingURL=Session.js.map