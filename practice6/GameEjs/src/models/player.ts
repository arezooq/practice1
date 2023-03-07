import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
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
    team:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model("Player", playerSchema)