import mongoose,{Schema} from 'mongoose'

const PlayersSchema = new Schema({
    email: String,
    name: String,
    hashPassword: String,
})

export default mongoose.model("Payers", PlayersSchema)