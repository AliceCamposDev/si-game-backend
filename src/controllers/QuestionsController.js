import Questions from "../schemas/Questions"
 
class QuestionsController {

    async create(req, res) {
        const questionsData = req.body
        await Questions.create(questionsData)
        return res.json(questionsData)
    }
    async readByDay(req, res) {
        const { day } = req.params
        const questions = await Questions.find({"day": day},{"_id": 1, "day": 1, "text": 1, "question": 1, "readMore": 1})
        return res.json(questions)
    }
    async readAnswer(req, res) {
        const { day } = req.params
        const questions = await Questions.find({"day": day},{"_id": 0, "correctAnswer": 1})
        return res.json(questions)
    }
    
}
export default new QuestionsController