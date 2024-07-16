import jwt from "jsonwebtoken"
require('dotenv').config();

async function Guard(req, res, next) {
    const token = req?.headers.authorization || null
    try {
        if (!token) {
            return res.json({ error: 'No credentials sent!' });
        }else{
            jwt.verify(token, process.env.ACCES_TOKEN_SECRET )
        }
      next()
    } catch (err) {
        console.log(err)
        return(res.json({error: err.message}))
    }
}
export default Guard