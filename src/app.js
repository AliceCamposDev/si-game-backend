import express from "express"
import mongoose, { mongo } from "mongoose"
import cors from "cors"
import routes from "./routes"

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
        mongoose.connect('mongodb+srv://gabrielfcampos2017:Jf5m8XyLH2UwbAp1@cluster0.mfcidsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("conectado no mongao")
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