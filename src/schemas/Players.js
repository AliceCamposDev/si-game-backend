import mongoose,{Schema} from 'mongoose'

const PlayersSchema = new Schema({
    email: String
})

export default mongoose.model("Payers", PlayersSchema)