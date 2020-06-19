"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cinema = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const sequelize = database_1.Database.getInstance().connect();
class Cinema extends sequelize_1.Model {
}
exports.Cinema = Cinema;
Cinema.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(100),
    },
    address: {
        type: new sequelize_1.DataTypes.STRING(100),
    },
}, { sequelize, tableName: 'cinemas' });
//# sourceMappingURL=Cinema.js.map