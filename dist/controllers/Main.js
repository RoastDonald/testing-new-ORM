"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MainController = /** @class */ (function () {
    function MainController() {
        this.route = '/';
        this.router = express_1.default.Router();
        this.router.get(this.route, this.getDocs);
        this.router.post(this.route, this.postDocs);
    }
    MainController.prototype.getDocs = function (req, res) {
        var db = req.con;
        console.log(db);
        try {
            if (!db)
                throw Error('server errir');
            db === null || db === void 0 ? void 0 : db.query('SELECT * FROM movies', function (err, rows) {
                if (err) {
                    return res
                        .status(403)
                        .json({ status: 'failure', msg: 'access denied' });
                }
                res.status(200).json({ status: 'success', data: rows });
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    MainController.prototype.postDocs = function (req, res) { };
    return MainController;
}());
exports.MainController = MainController;
//# sourceMappingURL=Main.js.map