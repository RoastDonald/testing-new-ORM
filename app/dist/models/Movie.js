"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const sequelize = database_1.Database.getInstance().connect();
class Movie extends sequelize_1.Model {
}
exports.Movie = Movie;
Movie.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(100),
    },
    release_date: {
        type: new sequelize_1.DataTypes.STRING(100),
    },
}, { sequelize, tableName: 'movies' });
//# sourceMappingURL=Movie.js.map