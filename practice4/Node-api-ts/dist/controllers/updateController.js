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
const express_1 = require("express");
const models_1 = __importDefault(require("../models"));
class updateController {
    constructor() {
        this.Book = models_1.default.books;
        this.path = '/:id';
        this.router = (0, express_1.Router)();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const book = yield this.Book.update(req.body, { where: { id: id } });
            res.status(200).send(book);
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.put(`${this.path}`, this.create);
    }
}
exports.default = updateController;
