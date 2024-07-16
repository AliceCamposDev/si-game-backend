import mongoose, { Schema } from 'mongoose'

const AnswersSchema = new Schema({
	day: Number,
	answerText: String,
	score: Number
})

export default mongoose.model("Answers", AnswersSchema)