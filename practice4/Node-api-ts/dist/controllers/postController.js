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
class PostController {
    constructor() {
        this.Book = models_1.default.books;
        this.path = '/addBook';
        this.router = (0, express_1.Router)();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let info = {
                title: req.body.title,
                price: req.body.price,
                subtitle: req.body.subtitle,
                author: req.body.author,
                published: req.body.published,
                publisher: req.body.publisher,
                pages: req.body.pages,
                description: req.body.description,
            };
            const post = yield this.Book.create(info);
            res.status(200).send(post);
            console.log(post);
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, this.create);
    }
}
exports.default = PostController;
