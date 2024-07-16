import mongoose,{Schema} from 'mongoose'

const PlayersSchema = new Schema({
    email: String,
    name: String
})

export default mongoose.model("Players", PlayersSchema)