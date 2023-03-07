"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const route_1 = __importDefault(require("./routes/route"));
const cors_1 = __importDefault(require("cors"));
var corOptions = {
    origin: 'https://localhost:3000'
};
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI || "localhost:27017/Football_Table";
mongoose_1.default.connect(DB_URI);
const db = mongoose_1.default.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database!'));
// middlewares
app.use((0, cors_1.default)(corOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static("logos"));
app.use(express_1.default.static("uploads"));
app.use((0, express_session_1.default)({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}));
// set template engine
app.set('view engine', 'ejs');
// route prefix
app.use("", route_1.default);
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=main.js.map