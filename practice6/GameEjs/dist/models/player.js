"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const playerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    team: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team'
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("Player", playerSchema);
//# sourceMappingURL=player.js.map