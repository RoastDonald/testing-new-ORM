"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const Session_1 = __importDefault(require("./routes/Session"));
const Movie_1 = __importDefault(require("./routes/Movie"));
const Cinema_1 = __importDefault(require("./routes/Cinema"));
class Server {
    constructor() {
        this.app = express_1.default();
        Server.db.connect();
        this.handleEvents();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            return new Server();
        }
    }
    start() {
        this.middlewares();
        this.routes();
        this.handleEvents();
        this.app.listen(Server.PORT, () => {
            console.log(`server is up on ${Server.PORT}`);
        });
    }
    handleEvents() {
        process.on('exit', () => {
            Server.db.disconnect();
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((req, res, next) => {
            const database = Server.db;
            req.con = database.con;
            next();
        });
    }
    routes() {
        this.app.use('/api/sessions', new Session_1.default().router);
        this.app.use('/api/movies', new Movie_1.default().router);
        this.app.use('/api/cinemas', new Cinema_1.default().router);
        this.app.use((req, res, next) => {
            res.status(404).json({ status: 'fail', msg: 'no such endpoint' });
        });
        Server.db.con.sync();
    }
}
exports.Server = Server;
Server.PORT = 8080;
Server.instance = null;
Server.db = database_1.Database.getInstance();
//# sourceMappingURL=server.js.map