import Answers from "../schemas/Answers"
 
class AnswersController {
    constructor(){}
    async create(req, res) {
        const answersData = req.body
        await Answers.create(answersData)
        return res.json(answersData)
    }
    async read(req, res) {
        const answers = await Answers.find()
        return res.json(answers)
    }
    
}
export default new AnswersController