import Answers from "../schemas/Answers"
import HistoryController from "./HistoryController";
 
class AnswersController {
    async create(req, res) {
        const answersData = req.body
        await Answers.create(answersData)
        return res.json(answersData)
    }
    async readByDay(req, res) {
        const { day } = req.params
        const answers = await Answers.find({ "day": day }, { "_id": 1, "answerText": 1 })
        const randomizedAnswers = answers.sort(() => Math.random() - 0.5)
        return res.json(randomizedAnswers)
    }
    async chooseAnswer(req, res) {
        const answerId = req.body.answerId
        const historyId = req.body.historyId
        const day = req.body.day
        const score = await Answers.find({"_id": answerId},{"_id": 0, "score": 1})
        await HistoryController.setChoice(historyId, score[0].score, answerId, day)
        return (res.json(score[0])) 
    }

    async scoreById (req, res){
        const { id } = req.params
        const score = await Answers.find({ "_id": id }, { "_id": 0, "score": 1 })
        return (res.json(score[0]))
    }
}
export default new AnswersController