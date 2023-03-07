"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const matchSchema = new mongoose_1.default.Schema({
    team1: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    team2: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    scoreTeam1: {
        type: String,
        required: true
    },
    scoreTeam2: {
        type: String,
        required: true
    },
    logoTeam1: {
        type: String,
        required: true
    },
    logoTeam2: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("Match", matchSchema);
//# sourceMappingURL=match.js.map