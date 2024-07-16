import express from "express"
import mongoose, { mongo } from "mongoose"
import cors from "cors"
import routes from "./routes"
require('dotenv').config();

class App {
    constructor() {
        this.server = express()
        this.database()
        this.cors()
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json())
        this.server.use(routes)

    }
    database() {
        try {
            mongoose.connect(process.env.MONGOOSE_CONNECT)
        } catch (error) {
            console.log(error)
        }

    }
    cors() {
        const corsOptions = {
            origin: '*',
            credentials: true
        }
        this.server.use(cors(corsOptions))
    }
}
export default new App().server