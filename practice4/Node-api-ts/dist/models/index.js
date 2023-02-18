"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("../Config/dbConfig"));
const sequelize_1 = require("sequelize");
const bookModel_1 = __importDefault(require("./bookModel"));
const sequelize = new sequelize_1.Sequelize(dbConfig_1.default.DB, dbConfig_1.default.USER, dbConfig_1.default.PASSWORD, {
    host: dbConfig_1.default.HOST,
    dialect: dbConfig_1.default.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig_1.default.pool.max,
        min: dbConfig_1.default.pool.min,
        acquire: dbConfig_1.default.pool.acquire,
        idle: dbConfig_1.default.pool.idle
    }
});
sequelize.authenticate()
    .then(() => {
    console.log('connected..');
})
    .catch(err => {
    console.log('Error' + err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.books = (0, bookModel_1.default)(sequelize, sequelize_1.DataTypes);
db.sequelize.sync({ force: false })
    .then(() => {
    console.log('yes re-sync done!');
});
exports.default = db;
