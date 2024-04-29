import Questions from "../schemas/Questions"
 
class QuestionsController {
    constructor(){}

    async create(req, res) {
        const questionsData = req.body
        await Questions.create(questionsData)
        return res.json(questionsData)
    }
    async read(req, res) {
        const questions = await Questions.find()
        return res.json(questions)
    }
    async readByDay(req, res) {
        const { day } = req.params
        const questions = await Questions.find({ "day": day})
        return res.json(questions)
    }
}
export default new QuestionsController