import mongoose, { Schema } from 'mongoose'

const AnswersSchema = new Schema({
	answer_text: String,
	score: Number
})

export default mongoose.model("Answers", AnswersSchema)