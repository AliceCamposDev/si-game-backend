import { Router } from "express"
import QuestionsController from "./controllers/QuestionsController"
import AnswersController from "./controllers/AnswersController"
import PlayersController from "./controllers/PlayersController"
import HistoryController from "./controllers/HistoryController"
import Guard from "./middlewares/Guard"

const routes = new Router()

routes.post("/questions", QuestionsController.create)
routes.get("/questions/:day", QuestionsController.readByDay)
routes.get("/question-answer/:day", QuestionsController.readAnswer)

routes.post("/answers", AnswersController.create)
routes.get("/answers/:day", AnswersController.readByDay)
routes.get("/answer-score/:id", AnswersController.scoreById)
routes.post("/chosen-answer", Guard, AnswersController.chooseAnswer)

routes.post("/players", Guard, PlayersController.create)
routes.post("/player-token", PlayersController.verify)
routes.get("/players/:id", PlayersController.readById)
routes.get("/player-id", Guard, PlayersController.readByToken)

routes.post("/history", HistoryController.create)
routes.get("/total-score/:id", HistoryController.getTotalScore)
routes.get("/history/:id", HistoryController.readByPlayerId)
routes.get("/history-by-id/:id", HistoryController.readById)
routes.get("/history-by-token", Guard, HistoryController.readByToken)
//routes.post("/history/:id", Guard, HistoryController.update)
routes.get("/last-history", Guard, HistoryController.getLastHistory)
routes.post("/set-history-finished/:id", Guard, HistoryController.setFinished)
routes.get("/get-relative-score", Guard, HistoryController.getRelativeScore)
//routes.post("/set-relative-score/:id", Guard, HistoryController.setRelativeScore)

export default routes