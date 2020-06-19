"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Session_1 = require("../models/Session");
const Helper_1 = __importDefault(require("../utils/Helper"));
class SessionController {
    constructor() {
        this.route = '/';
        this.router = express_1.default.Router();
        this.modelKeys = ["movie_id", "cinema_id", "price", "date"];
        this.editDoc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (typeof +id !== 'number')
                    return res
                        .status(422)
                        .json({ status: 'fail', msg: "id wasn't defined" });
                const [updated] = yield Session_1.Session.update(req.body, {
                    where: { id },
                });
                if (updated) {
                    const updatedEntry = yield Session_1.Session.findOne({ where: { id } });
                    return res
                        .status(200)
                        .json({ status: 'success', data: [{ updatedEntry }] });
                }
                throw new Error('Incorrect data');
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ status: 'error', msg: e.message });
            }
        });
        this.deleteDoc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (typeof +id !== 'number')
                    return res
                        .status(422)
                        .json({ status: 'fail', msg: "id wasn't defined" });
                const deleted = yield Session_1.Session.destroy({
                    where: { id },
                });
                if (deleted) {
                    return res
                        .status(200)
                        .json({ status: 'success', msg: 'successfuly deleted' });
                }
                throw new Error('There is no entry with such id');
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ status: 'error', msg: e.message });
            }
        });
        this.getDocs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sessions = yield Session_1.Session.findAll({ attributes: this.modelKeys });
                res.status(200).json({ status: 'success', data: sessions });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ status: 'error', msg: 'Server error' });
            }
        });
        this.postDocs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const props = req.body;
            const emptyFields = Helper_1.default.validateProps(props, this.modelKeys);
            if (emptyFields.length) {
                return res
                    .status(422)
                    .json({ status: 'fail', msg: 'incorrect data', fields: emptyFields });
            }
            try {
                const { movie_id, cinema_id, date, price } = props;
                const status = yield ((_a = req.con) === null || _a === void 0 ? void 0 : _a.query('CALL add_session(:movie_id,:cinema_id,:date,:price,@status);' +
                    'SELECT @status;', {
                    replacements: {
                        movie_id,
                        cinema_id,
                        date,
                        price,
                    },
                    type: 'SELECT',
                }).then((res) => {
                    const level1 = res[1];
                    return level1[0]['@status'];
                }));
                if (!status)
                    return res
                        .status(201)
                        .json({ status: 'success', data: [Object.assign({}, props)] });
                else
                    return res
                        .status(422)
                        .json({ status: 'fail', msg: 'incorrect id on movie or cinema' });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ status: 'error', msg: 'Server error' });
            }
        });
        this.router.get(this.route, this.getDocs);
        this.router.post(this.route, this.postDocs);
        this.router.delete(this.route.concat(':id?'), this.deleteDoc);
        this.router.put(this.route.concat(':id?'), this.editDoc);
    }
}
exports.default = SessionController;
//# sourceMappingURL=Session.js.map