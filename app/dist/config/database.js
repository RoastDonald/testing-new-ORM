"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
const sql_conf_1 = __importDefault(require("./sql-conf"));
console.log(sql_conf_1.default);
class AbstractDatabase {
}
class Database extends AbstractDatabase {
    constructor() {
        super(...arguments);
        this.connect = () => {
            if (this.con)
                return this.con;
            try {
                this.con = new sequelize_1.Sequelize(sql_conf_1.default.db.database, sql_conf_1.default.db.username, sql_conf_1.default.db.password, {
                    dialect: 'mysql',
                    host: sql_conf_1.default.db.host,
                    define: {
                        timestamps: false,
                    },
                    dialectOptions: {
                        multipleStatements: true,
                    },
                });
                this.con
                    .authenticate()
                    .then(() => console.log('db connected'))
                    .catch((e) => console.error(e));
                return this.con;
            }
            catch (e) {
                console.error(e);
                process.exit(1);
            }
        };
        this.disconnect = () => {
            this.con.close();
        };
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            return new Database();
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map