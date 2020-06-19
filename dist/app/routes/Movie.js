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
const Movie_1 = require("../models/Movie");
const Helper_1 = __importDefault(require("../utils/Helper"));
const moment_1 = __importDefault(require("moment"));
class MovieController {
    constructor() {
        this.route = '/';
        this.router = express_1.default.Router();
        this.modelKeys = ["id", "title", "release_date"];
        this.getDocs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield Movie_1.Movie.findAll({
                    attributes: this.modelKeys,
                });
                res.status(200).json({ status: 'success', data: movies });
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
            const isDateValid = moment_1.default(props.release_date.toString(), 'YYYY-MM-DD', true).isValid();
            if (!isDateValid)
                return res
                    .status(422)
                    .json({ status: 'fail', msg: 'Incorrect date format' });
            try {
                yield Movie_1.Movie.create(Object.assign({}, props));
                return res.status(201).json({ status: 'success', data: [Object.assign({}, props)] });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ status: 'error', msg: 'Server error' });
            }
        });
        this.router.get(this.route, this.getDocs);
        this.router.post(this.route, this.postDocs);
    }
}
exports.default = MovieController;
//# sourceMappingURL=Movie.js.map