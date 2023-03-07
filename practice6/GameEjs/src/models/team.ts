import mongoose from "mongoose"

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
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
})

export default mongoose.model("Team", teamSchema)