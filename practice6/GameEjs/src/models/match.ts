import mongoose from "mongoose"

const matchSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
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
})

export default mongoose.model("Match", matchSchema)