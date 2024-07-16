import Players from "../schemas/Players"
const { OAuth2Client } = require('google-auth-library');
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
require('dotenv').config();

class PlayersController {

  async verify(req, res) {
    const token = req.body.token
    const client = new OAuth2Client();
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.AUDIENCE
      });
      const payload = ticket.getPayload();
      const player = await Players.find({ "email": payload.email }, { "_id": 1 })
      if (player[0]) {
        const user = { email: payload.email }
        const accessToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '72h' })
        return (res.json({ accessToken: accessToken }))
      } else {
        const newPlayer = { email: payload.email, name: payload.name }
        try {
          await Players.create(newPlayer)
          const user = { email: payload.email }
          const accessToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '72h' })
          return (res.json({ accessToken: accessToken }))
        } catch (error) {
          return (error)
        }
      }

    }
    verify().catch(console.error);
  }

  async create(req, res) {
    const playerData = req.body
    await Players.create(playerData)
    return res.json(playerData)
  }
  async read(req, res) {
    const player = await Players.find({})
    return res.json(player)
  }
  async readById(req, res) {
    const { id } = req.params
    const player = await Players.find({ "_id": id })
    return res.json(player)
  }
  async readByToken(req, res) {
    const token = req?.headers.authorization || null
    const decoded = jwtDecode(token)
    const email = decoded.email
    const player = await Players.find({ "email": email }, { "_id": 1, "name": 1 })
    return (res.json(player[0]))
  }

}
export default new PlayersController