"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port || 5000;
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
    }
    initialiseMiddleware() {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api/books', controller.router);
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = App;
