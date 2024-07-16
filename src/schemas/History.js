import mongoose, { Schema } from 'mongoose'

const HistorySchema = new Schema({
	survivedDays: Number,
	survived: Boolean,
	finalScore: Number,
	date: Date,
	finished: Boolean,
	relativeScore: Number,
	playerId: {type: Schema.Types.ObjectId, ref: 'Players'},
    results: [{type: Schema.Types.ObjectId, ref:'Answers' }]
})

export default mongoose.model("History", HistorySchema)