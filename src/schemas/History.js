import mongoose, { Schema } from 'mongoose'

const HistorySchema = new Schema({
	survivedDays: Number,
	survived: Boolean,
	finalScore: Number,
	date: Date,
    //results: [_id: ObjectId()],
    //playerId: ObjectId(),
})

export default mongoose.model("History", HistorySchema)