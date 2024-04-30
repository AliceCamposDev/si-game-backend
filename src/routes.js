import { Router } from "express"
import QuestionsController from "./controllers/QuestionsController"
import AnswersController from "./controllers/AnswersController"

const routes = new Router()

routes.post("/Questions",QuestionsController.create)
routes.get("/Questions", QuestionsController.read)
routes.get("/Questions/:day", QuestionsController.readByDay)

routes.post("/Answers",AnswersController.create)
routes.get("/Answers", AnswersController.read)
routes.get("/Answers/:day", AnswersController.readByDay)

export default routes