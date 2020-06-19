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
const Cinema_1 = require("../models/Cinema");
const Helper_1 = __importDefault(require("../utils/Helper"));
class CinemaController {
    constructor() {
        this.route = '/';
        this.router = express_1.default.Router();
        this.modelKeys = ["name", "address"];
        this.getDocs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cinemas = yield Cinema_1.Cinema.findAll({
                    attributes: this.modelKeys,
                });
                res.status(200).json({ status: 'success', data: cinemas });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ status: 'error', msg: 'Server error' });
            }
        });
        this.postDocs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const props = req.body;
            const emptyFields = Helper_1.default.validateProps(props, this.modelKeys);
            if (emptyFields.length) {
                return res
                    .status(422)
                    .json({ status: 'fail', msg: 'incorrect data', fields: emptyFields });
            }
            try {
                yield Cinema_1.Cinema.create(Object.assign({}, props));
                return res.status(201).json({ status: 'success', data: [Object.assign({}, props)] });
            }
            catch (e) {
                if (e.original.code === 'ER_DUP_ENTRY') {
                    res.status(422).json({ status: 'fail', msg: 'address is occupied' });
                }
                else {
                    res.status(500).json({ status: 'error', msg: 'Server error' });
                }
            }
        });
        this.router.get(this.route, this.getDocs);
        this.router.post(this.route, this.postDocs);
    }
}
exports.default = CinemaController;
//# sourceMappingURL=Cinema.js.map