"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teamSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    players: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    score: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("Team", teamSchema);
//# sourceMappingURL=team.js.map