import History from "../schemas/History"
import Players from "../schemas/Players"
import { jwtDecode } from "jwt-decode";

class HistoryController {

    async create(req, res) {
        const historyData = req.body
        const newHistory = await History.create(historyData)
        console.log(newHistory)
        console.log(historyData)
        return res.json(newHistory[0]._id)
    }

    async readByPlayerId(req, res) {
        const { id } = req.params
        const history = await History.find({ "playerId": id })
        return res.json(history)
    }

    async readById(req, res) {
        const { id } = req.params
        const history = await History.find({ "_id": id })
        return res.json(history)
    }

    // async update(req, res) {
    //     const { id } = req.params
    //     const historyData = req.body
    //     const history = await History.updateOne({ "_id": id }, { finished: historyData.finished, playerId: historyData.playerId, date: historyData.date, survived: historyData.survived, survivedDays: historyData.survivedDays, finalScore: historyData.finalScore, results: historyData.results })
    //     return res.json(history)
    // }

    async readByToken(req, res) {
        const token = req?.headers.authorization || null
        const decoded = jwtDecode(token)
        const email = decoded.email
        const player = await Players.find({ "email": email }, { "_id": 1 })
        const history = await History.find({ "playerId": player })
        return res.json(history)
    }

    async setChoice(historyId, score, answerId, day) {
        const historyData = await History.find({ "_id": historyId })
        const uptdScore = historyData[0].finalScore + score
        const relativeScore = historyData[0].relativeScore
        let updtRelativeScore
        if (relativeScore + score <= 0 || relativeScore == 0){
            updtRelativeScore = 0
        }else if (relativeScore + score >= 35){
            updtRelativeScore = 35
        }else{
            updtRelativeScore = relativeScore + score
        }
        console.log(updtRelativeScore, relativeScore, score)
        let results
        if (historyData[0].results) {
            results = historyData[0].results.slice()
        } else {
            results = []
        }
        results.push(answerId)
        await History.updateOne({ "_id": historyId }, { survivedDays: day, finalScore: uptdScore, results: results, relativeScore: updtRelativeScore })
        //await History.updateOne({ "_id": historyId }, { finished: historyData.finished, playerId: historyData.playerId, date: historyData.date, survived: historyData.survived, survivedDays: day, finalScore: uptdScore, results: results })

    }

    async getTotalScore(req, res) {
        const { id } = req.params
        const totalScore = await History.find({ "playerId": id }, { "_id": 0, "finalScore": 1 })
        return (res.json(totalScore[0]))
    }

    async getLastHistory(req, res) {
        const token = req?.headers.authorization || null
        const decoded = jwtDecode(token)
        const email = decoded.email
        const player = await Players.find({ "email": email }, { "_id": 1 })
        const history = await History.find({ "playerId": player })
        if (history.length > 0) {
            return res.json(history[history.length - 1])
        } else {
            return res.json(history)
        }
    }

    async setFinished(req, res) {
        const { id } = req.params
        const historyData = await History.find({ "_id": id })
        await History.updateOne({ "_id": id }, { finished: true, playerId: historyData.playerId, date: historyData.date, survived: historyData.survived, survivedDays: historyData.survivedDays, finalScore: historyData.finalScore, results: historyData.results })
        return res.json("game finished")
    }

    async getRelativeScore (req, res){
        const token = req?.headers.authorization || null
        const decoded = jwtDecode(token)
        const email = decoded.email
        const player = await Players.find({ "email": email }, { "_id": 1 })
        const relativeScore = await History.find({ "playerId": player },{"_id": 0 , "relativeScore": 1})
        if (relativeScore.length > 0) {
            return res.json(relativeScore[relativeScore.length - 1])
        } else {
            return res.json("Histórico não encontrado")
        }
    }

    // async setRelativeScore (req, res){
    //     const { id } = req.params
    //     const relativeScore = req.body.relativeScore
    //     console.log ("relativeScore", relativeScore)
    //     const historyData = await History.find({ "_id": id })
    //     await History.updateOne({ "_id": historyData._id }, { relativeScore: relativeScore})
    // }

}
export default new HistoryController