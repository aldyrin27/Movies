const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req,res,next){
    try {
        let {access_token} = req.headers
        let payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)

        req.user = {id : user.id, email : user.email}
        next()
    } catch (error) {

        if (error.name === 'JsonWebTokenError'){
            res.status(401).json({message : "Invalid token"})
        } else {
            res.status(500).json({message : "Internal server error"})
           }
    }}

module.exports = authentication    