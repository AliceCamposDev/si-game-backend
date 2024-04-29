import mongoose,{Schema} from 'mongoose'

const QuestionsSchema = new Schema({
    day: Number,
    text: String,
    question: String,
    readMore: String,
    correctAnswer: String,
    //themes: [String],
    //idAnswers: [_id: ObjectId()]
})

export default mongoose.model("Questions", QuestionsSchema)