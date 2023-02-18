"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postController_1 = __importDefault(require("./controllers/postController"));
const getAllController_1 = __importDefault(require("./controllers/getAllController"));
const getOneController_1 = __importDefault(require("./controllers/getOneController"));
const updateController_1 = __importDefault(require("./controllers/updateController"));
const deleteController_1 = __importDefault(require("./controllers/deleteController"));
const app_1 = __importDefault(require("./app"));
const app = new app_1.default([new postController_1.default(), new getAllController_1.default(), new getOneController_1.default(), new updateController_1.default(), new deleteController_1.default()], Number(process.env.PORT));
app.listen();
