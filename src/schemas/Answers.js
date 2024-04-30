import mongoose, { Schema } from 'mongoose'

const AnswersSchema = new Schema({
	day: Number,
	answer_text: String,
	score: Number
})

export default mongoose.model("Answers", AnswersSchema)